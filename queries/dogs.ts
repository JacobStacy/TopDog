import { Dog } from "@/model/dog-model";
import mongoose, { Schema } from "mongoose";
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongo";


export async function createDog(dog: { 
    name: string,
    age: number,
    bio: string,
    rank: number,
    likes: number,
    imageUrls: string[],
    completed: boolean,
    user: Schema.Types.ObjectId,
}){

    try{
        console.log("dogs.ts dog", dog)
        await Dog.create(dog);

    } catch(error) {
        if (error instanceof Error) {
            throw(error);
        }
    }
}

export async function updateDog(
    dogId: Schema.Types.ObjectId,
    userId: Schema.Types.ObjectId,
    updates: { 
        name?: string;
        age?: number;
        bio?: string;
        rank?: number;
        likes?: number;
        imageUrls?: string[];
        completed?: boolean;
    }
) {
    try {


        // Find the dog by ID to check if it belongs to the user
        const dog = await Dog.findById(dogId);
        if (!dog) {
            throw new Error("Dog not found");
        }

        // Check if the dog belongs to the user
        if (!dog.user.equals(userId)) {
            throw new Error("You do not have permission to update this dog");
        }


        // Update the dog with the given ID using Mongoose's findByIdAndUpdate
        const updatedDog = await Dog.findByIdAndUpdate(
            dogId,
            { $set: updates },  // Use $set to only update the fields provided
            { new: true, runValidators: true } // Options to return the updated document and run validators
        );

        // If no dog was found, throw an error
        if (!updatedDog) {
            throw new Error("Dog not found");
        }

        return updatedDog;
    } catch (error) {
        if (error instanceof Error) {
            throw error;  // Rethrow the error for handling at a higher level
        }
    }
}

export async function addImage(
    dogId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId,
    imageFile: File,
) {
    try {
        // Find the dog by ID to check if it belongs to the user
        const dog = await Dog.findById(dogId);
        if (!dog) {
            throw new Error("Dog not found");
        }

        // Check if the dog belongs to the user
        if (!dog.user.equals(userId)) {
            throw new Error("You do not have permission to update this dog");
        }

        const imageUrl = await uploadImageToS3(imageFile);
        
        await Dog.findByIdAndUpdate(
            dogId,
            { $push: { imageUrls: imageUrl } },  // Use $push to add new image URL
            { new: true, runValidators: true } 
        );

        if (!imageUrl) {
            throw new Error("Dog not found or failed to update");
        }

        return imageUrl;
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
    }
}

export async function deleteImage(
    dogId: mongoose.Types.ObjectId,
    imageUrl: string,
) {
    try {
        

        // Remove the image URL from the imageUrls array
        const updatedDog = await Dog.findByIdAndUpdate(
            dogId,
            { $pull: { imageUrls: imageUrl } },
            { new: true, runValidators: true } 
        );


            // Delete the image from S3
            await deleteImageFromS3(imageUrl);

        if (!updatedDog) {
            throw new Error("Dog not found or failed to update");
        }

        return updatedDog;
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
    }
}

async function uploadImageToS3(imageFile: File): Promise<string> {
    const s3 = new S3Client({
        // Configure your S3 credentials and region
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
        },
        region: process.env.AWS_REGION as string,
    });

    const buffer = await imageFile.arrayBuffer()

    const webpBuffer = await sharp(buffer)
        .webp({ quality: 50 })
        .resize({
            width: 405,
            height: 540,
            fit: sharp.fit.cover,
            // position: sharp.strategy.attention,
            position: sharp.strategy.entropy,
            withoutEnlargement: true
        })
        .toBuffer();

    const outFileName = `${Date.now()}-${imageFile.name.replace(/\.[^.]+$/, '.webp')}`; // Generate a unique filename
    // console.log(outFileName)
    const uploadParams = {
        Bucket: process.env.S3_BUCKET_NAME as string, // Replace with your S3 bucket name
        Key: outFileName,
        Body: webpBuffer,
    };


    try {
        await s3.send(new PutObjectCommand(uploadParams));
        return outFileName; // Construct the image URL
    } catch (error) {
        throw error; // Rethrow the error for proper handling
    }
}

async function deleteImageFromS3(imageUrl: string): Promise<void> {
    const s3 = new S3Client({
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
        },
        region: process.env.AWS_REGION as string,
    });

    const imageKey = imageUrl; // Assuming imageUrl is the S3 key (or extract the key if URL contains bucket name)

    const deleteParams = {
        Bucket: process.env.S3_BUCKET_NAME as string, // Replace with your S3 bucket name
        Key: imageKey,
    };

    try {
        await s3.send(new DeleteObjectCommand(deleteParams));
    } catch (error) {
        throw error; // Rethrow the error for proper handling
    }
}


export async function resetHaveJudged() {
    await Dog.updateMany(
        {
            $set: {haveJudged: []},
        }
    )
}

const updateDogRanks = async () => {
    try {
        // Fetch all dogs sorted by likes in descending order
        const dogs = await Dog.find().sort({ likes: -1 });

        // Iterate over the dogs and update their rank based on their position
        for (let i = 0; i < dogs.length; i++) {
            dogs[i].rank = i + 1; // Rank starts from 1
            await dogs[i].save(); // Save the dog with the updated rank
        }

        console.log('Ranks updated successfully!');
    } catch (error) {
        console.error('Error updating ranks:', error);
    }
};

export async function interact(
    dogId:mongoose.Types.ObjectId, 
    userId:mongoose.Types.ObjectId, 
    swipe: "left" | "right"
) {
    try {

        const change = swipe == "right" ? 1 : -1;

        
        const updatedDog = await Dog.findByIdAndUpdate(
            dogId,
            { 
                $push: { haveJudged: userId },
                $inc: { likes: change }
            },
            { new: true, runValidators: true } 
        );

        updateDogRanks();
        console.log("updatedDog ------------ ", updatedDog);
        if (!updatedDog) {
            throw new Error("Dog not found or failed to update");
        }

        return updatedDog;
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
    }
}

export async function deleteDog(dogId: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId) {
    console.log("deleteDog");
    
    try {
        // Find the dog by ID to check if it belongs to the user
        const dog = await Dog.findById(dogId);
        if (!dog) {
            throw new Error("Dog not found");
        }

        // Check if the dog belongs to the user
        if (!dog.user.equals(userId)) {
            throw new Error("You do not have permission to delete this dog");
        }

        for (let imageUrl of dog.imageUrls) {
            await deleteImage(dogId, imageUrl);
        }

        // Delete the dog
        const result = await Dog.findByIdAndDelete(dogId);
        
        // If the dog was not deleted, throw an error
        if (!result) {
            throw new Error("Failed to delete the dog in dog.ts");
        }

        return { message: "Dog deleted successfully" };
    } catch (error) {
        if (error instanceof Error) {
            console.error(error); // Log the error for debugging
            throw error;  // Rethrow the error for handling at a higher level
        }
    }
}


export async function weeklyReset() {
    try {
        dbConnect();

        const result = await Dog.updateMany(
            {}, // Empty filter to update all documents
            {
                $set: {
                    havedJudged: [],
                    likes: 0,
                    rank: 999,
                }
            }
        );

        console.log(`${result.modifiedCount} documents updated.`);
        
    } catch (error) {
        console.error(error);
        throw error;
    }
}