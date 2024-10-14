"use server"
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongo";
import { auth } from "@/auth";
import { User } from "@/model/user-model";
import { Dog } from "@/model/dog-model";
import mongoose, { Schema } from "mongoose";
import { interact } from "@/queries/dogs";

export const PATCH = async (request: NextRequest) => {
    

    // console.log(request.formData());

    const formData = await request.formData(); // Parse FormData
    // console.log(formData);

    const swipe = formData.get("swipe")?.toString();
    const dogIdParam = formData.get("dogId");
    let dogId: mongoose.Types.ObjectId | null = null; // Initialize as null
    if (dogIdParam) {
        dogId = new mongoose.Types.ObjectId(dogIdParam.toString()); // Use Types.ObjectId
    }



    await dbConnect();

    // Authenticate the user
    const session = await auth();
    if (!session) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        // Find the user by their email
        const user = await User.findOne({
            email: session?.user?.email,
        });

        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }

        if (dogId && (swipe == "right" || swipe == "left")) {
            const response = await interact(dogId._id, user._id, swipe);
            return new NextResponse(response, {status: 202});
        } else {
            return new NextResponse("Dog not found or swipe is invalid", { status: 404 });
        }
    } catch (error) {
        return new NextResponse(
            error instanceof Error ? error.message : "An error occurred",
            { status: 500 }
        );
    }
};


