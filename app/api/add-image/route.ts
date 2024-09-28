"use server"
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongo";
import { addImage, deleteImage } from "@/queries/dogs";
import { auth } from "@/auth"
import { User } from "@/model/user-model";
import mongoose from "mongoose";
import { Dog } from "@/model/dog-model";



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

    const imageFile = await formData.get("imageFile") as File; // Get the File object



    

    let imageUrl:string | undefined = ""
    try {
        if (dogId) {
            imageUrl = await addImage(dogId, user._id, imageFile);
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




export const DELETE = async (request: NextRequest) => {
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
    let dogId: mongoose.Types.ObjectId | null = null;
    if (dogIdParam) {
        dogId = new mongoose.Types.ObjectId(dogIdParam.toString());
    }

    // Find the dog by ID to check if it belongs to the user
    const dog = await Dog.findById(dogId);
    if (!dog) {
        throw new Error("Dog not found");
    }

    // Check if the dog belongs to the user
    if (!dog.user.equals(user._id)) {
        throw new Error("You do not have permission to update this dog");
    }

    const imageUrl = formData.get("imageUrl") as string; // Get the image URL to be deleted

    try {
        if (dogId) {
            // Delete the image from the database
            await deleteImage(dogId, imageUrl);

        }
    } catch (error) {
        if (error instanceof Error) {
            return new NextResponse(
                error.message,
                { status: 500 }
            );
        }
    }

    // Return response
    return NextResponse.json(
        {
            message: "Dog image has been deleted",
        },
        { status: 200 }
    );
};

