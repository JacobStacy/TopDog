import { dbConnect } from "@/lib/mongo";
import { auth } from "@/auth";
import { User } from "@/model/user-model";
import { NextResponse } from "next/server";

export async function POST() {
    await dbConnect();
    const session = await auth();
    // console.log(session)
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findOne({ email: session?.user?.email });

    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    user.doneTut = true;
    await user.save();

    return NextResponse.json({ success: true });
}
