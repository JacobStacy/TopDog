"use server"
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongo";
import { auth } from "@/auth";
import { User } from "@/model/user-model";
import { Dog } from "@/model/dog-model";

export const GET = async () => {
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

    // Find all dogs associated with the user
    const dogs = await Dog.find({ user: user._id });

    return NextResponse.json(dogs, { status: 200 });
  } catch (error) {
    return new NextResponse(
      error instanceof Error ? error.message : "An error occurred",
      { status: 500 }
    );
  }
};
