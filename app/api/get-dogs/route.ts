"use server"
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongo";
import { auth } from "@/auth";
import { User } from "@/model/user-model";
import { Dog } from "@/model/dog-model";

export const GET = async (request: NextRequest) => {
  const isFrontPage = request.nextUrl.searchParams.get("isFrontPage") === "true";
  const isLeaderboard = request.nextUrl.searchParams.get("isLeaderboard") === "true";


  await dbConnect();



  try {
    // Authenticate the user
    const session = await auth();

    // Find the user by their email
    if (!isLeaderboard && session) {

      if (session) {
        const user = await User.findOne({
          email: session?.user?.email,
        });

        if (isFrontPage) {
          const dogs = await Dog.find({
            "imageUrls.0": { "$exists": true },
            "completed": true,
            "haveJudged": { "$nin": [user?._id] },
          }).limit(5);

          return NextResponse.json(dogs, { status: 200 });
        }

        // Find all dogs associated with the user
        const dogs = await Dog.find({ user: user._id });

        return NextResponse.json(dogs, { status: 200 });
      } else {
        return new NextResponse("Unauthorized", { status: 401 });
      }
    }

    if (isFrontPage) {
      const dogs = await Dog.find({
        "imageUrls.0": { "$exists": true },
        "completed": true,
      }).limit(5);

      return NextResponse.json(dogs, { status: 200 });
    }

    if (isLeaderboard) {
      const dogs = await Dog.find({
        "imageUrls.0": { "$exists": true },
        "completed": true,
      }
      ).sort({ likes: -1, rank: 1 }).limit(10);

      return NextResponse.json(dogs, { status: 200 });
    }

  } catch (error) {
    return new NextResponse(
      error instanceof Error ? error.message : "An error occurred",
      { status: 500 }
    );
  }
};
