"use server"
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongo";
import { createDog } from "@/queries/dogs";
import { auth } from "@/auth"
import { User} from "@/model/user-model";

export const POST = async(request : NextRequest) => {
    const {
        name,
        age,
        breed,
        bio,
        rank,
        likes,
        imageUrls
    } = await request.json();

    await dbConnect();

    const session = await auth();
    const user = await User.findOne({
        email: session?.user?.name,
    });

    const newDog = {
        name,
        age,
        breed,
        bio,
        rank,
        likes,
        imageUrls,
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

    return new NextResponse("User has been created",
        {status: 201},
    );
}

