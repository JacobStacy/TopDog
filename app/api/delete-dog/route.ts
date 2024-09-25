"use server"
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongo";
import { deleteDog } from "@/queries/dogs";
import { auth } from "@/auth"
import { User} from "@/model/user-model";
export const DELETE = async(request : NextRequest) => {
    const {
        dogId
    } = await request.json();


    // Validate dogId
    if (!dogId) {
        return new NextResponse("Dog ID is required", { status: 400 });
    }
    
    
    await dbConnect();
    
    const session = await auth();
    const user = await User.findOne({
        email: session?.user?.email,
    });
    
    // Check if the user exists
    if (!user) {
        return new NextResponse("User not found", { status: 404 });
    }
    
    try {
        await deleteDog(dogId, user._id);
    } catch (error) {
        if(error instanceof Error) {
            return new NextResponse(error.message,
                {status: 500},
            );
        }
    }

    return new NextResponse("Dog has been Deleted",
        {status: 201},
    );

    
    

    
    
}