import { Dog } from "@/model/dog-model";
import mongoose, { Schema } from "mongoose";


export async function createDog(dog: { 
    name: string,
    age: number,
    breed: string,
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
        breed?: string;
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
    imageUrl: string,
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

        
        const updatedDog = await Dog.findByIdAndUpdate(
            dogId,
            { $push: { imageUrls: imageUrl } },  // Use $push to add new image URL
            { new: true, runValidators: true } 
        );

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

export async function deleteImage(
    dogId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId,
    imageUrl: string,
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

        // Remove the image URL from the imageUrls array
        const updatedDog = await Dog.findByIdAndUpdate(
            dogId,
            { $pull: { imageUrls: imageUrl } },
            { new: true, runValidators: true } 
        );

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

        console.log("dogId: ", dogId)
        console.log("userId: ", userId)
        console.log("swipe: ", swipe)
        
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

export async function deleteDog(dogId: Schema.Types.ObjectId, userId: Schema.Types.ObjectId) {
    console.log("deleteDog");
    
    // Check if the dogId is a valid ObjectId
    // if (!Schema.Types.ObjectId.isValid(dogId)) {
    //     throw new Error("Invalid Dog ID");
    // }

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