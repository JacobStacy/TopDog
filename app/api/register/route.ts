"use server"
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/utils/mongo";
import { createUser } from "@/queries/users";

export const POST = async(request : NextRequest) => {
    const {name, email, password} = await request.json();

    await dbConnect();

    const hashedPassword = await bcrypt.hash(password, 5)

    const newUser = {
        name,
        password: hashedPassword,
        email
    }

    try {
        await createUser(newUser);
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