"use server"
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongo";
import { createDog, updateDog } from "@/queries/dogs";
import { auth } from "@/auth"
import { User} from "@/model/user-model";
import { Dog } from "@/model/dog-model";

export const POST = async(request : NextRequest) => {

    
    const {
        name,
        age,
        breed,
        bio,
        rank,
        likes,
        completed
    } = await request.json();

    console.log("completed", completed);

    await dbConnect();

    const session = await auth();
    const user = await User.findOne({
        email: session?.user?.email,
    });

    // Check if the user exists
    if (!user) {
        return new NextResponse("User not found", { status: 404 });
    }

    if (!completed) {
        const dogs = await Dog.find({ user: user._id, completed: false});
        if (dogs.length > 0) {
            return new NextResponse("Blank dog already exist(expected behavior)",
                {status: 409},
            );
        } else {

            const newDog = {
                name,
                age,
                breed,
                bio,
                rank,
                likes,
                imageUrls : [],
                hasJudged : [user], // [prod] set back to this when not testing
                // haveJudged : [],
                completed,
                user
            }

            try {
                await createDog(newDog);
            } catch (error) {
                if(error instanceof Error) {
                    return new NextResponse(error.message,
                        {status: 500},
                    );
                }
            }
        
            return new NextResponse("Dog has been created",
                {status: 201},
            );
        }
    }

    
    
}


export const PATCH = async(request : NextRequest) => {

    await dbConnect();

    const session = await auth();
    const user = await User.findOne({
        email: session?.user?.email,
    });

    // Check if the user exists
    if (!user) {
        return new NextResponse("User not found", { status: 404 });
    }


    const {
        dogId,
        name,
        age,
        breed,
        bio,
        rank,
        likes,
    } = await request.json();

    const updatedDog = {
        name,
        age,
        breed,
        bio,
        rank,
        likes,
        completed: true,
        user
    }

    try {
        await updateDog(dogId, user._id, updatedDog);
    } catch (error) {
        if(error instanceof Error) {
            return new NextResponse(error.message,
                {status: 500},
            );
        }
    }

    return new NextResponse("Dog has been updated",
        {status: 201},
    );


}
