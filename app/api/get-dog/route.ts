"use server"
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongo";
import { auth } from "@/auth";
import { User } from "@/model/user-model";
import { Dog } from "@/model/dog-model";
import mongoose from "mongoose";

export const GET = async (request: NextRequest) => {
  await dbConnect();

  // Authenticate the user
  const session = await auth();
  console.log("session: ", session)
  console.log("email:", session?.user?.email)
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const getBlank = request.nextUrl.searchParams.get("getBlank") === "true";

    let dogId = null;
    const dogIdParam = request.nextUrl.searchParams.get("dogId");
    if (dogIdParam) {
        dogId = new mongoose.Types.ObjectId(dogIdParam);
    }
    // Find the user by their email
    const user = await User.findOne({
      email: session?.user?.email,
    });

    console.log("user", user);

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    if (getBlank) {
        console.log("user id", user._id)
        const blankDog = await Dog.findOne({ user: user._id, completed: false});

        if (blankDog) {
            return NextResponse.json(blankDog, { status: 200 });
        } else {
            return new NextResponse("Blank dog not found", { status: 404 });
        }
        
    } else if (dogId){
        const dog = await Dog.findOne({ user: user._id, _id: dogId});
        if (dog){
            return NextResponse.json(dog, { status: 200 });
        } else {
            return new NextResponse("Dog not found", { status: 404 });
        }
    } else {
        return new NextResponse("Bad Request must include dogId or getBlank=true", { status: 400 });
    }
    
  } catch (error) {
    return new NextResponse(
      error instanceof Error ? error.message : "An error occurred",
      { status: 500 }
    );
  }
};
