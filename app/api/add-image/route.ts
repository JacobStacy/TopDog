"use server"
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongo";
import { addImage } from "@/queries/dogs";
import { auth } from "@/auth"
import { User } from "@/model/user-model";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import mongoose from "mongoose";



export const PATCH = async (request: NextRequest) => {

    await dbConnect();

    const session = await auth();
    const user = await User.findOne({
        email: session?.user?.email,
    });

    // Check if the user exists
    if (!user) {
        return new NextResponse("User not found", { status: 404 });
    }


    const formData = await request.formData(); // Parse FormData

    const dogIdParam = formData.get("dogId");
    let dogId: mongoose.Types.ObjectId | null = null; // Initialize as null
    if (dogIdParam) {
        dogId = new mongoose.Types.ObjectId(dogIdParam.toString()); // Use Types.ObjectId
    }

    const imageFile = formData.get("imageFile") as File; // Get the File object


    const imageUrl = await uploadImageToS3(imageFile);


    try {
        if (dogId){
            await addImage(dogId, user._id, imageUrl);
        }
    } catch (error) {
        if (error instanceof Error) {
            return new NextResponse(error.message,
                { status: 500 },
            );
        }
    }

    // Return response with imageUrl that was added
    return NextResponse.json({
        message: "Dog has been updated",
        imageUrl: imageUrl,
    }, { status: 201 });


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

    const buffer = await imageFile.arrayBuffer();
    const outFileName = `${Date.now()}-${imageFile.name}`; // Generate a unique filename
    // console.log(outFileName)
    const uploadParams = {
        Bucket: process.env.S3_BUCKET_NAME as string, // Replace with your S3 bucket name
        Key: outFileName,
        Body: Buffer.from(buffer),
    };


    try {
        await s3.send(new PutObjectCommand(uploadParams));
        return outFileName; // Construct the image URL
    } catch (error) {
        throw error; // Rethrow the error for proper handling
    }
}
