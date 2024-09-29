import { dbConnect } from "@/lib/mongo";
import { weeklyReset } from "@/queries/dogs";
import { NextResponse } from "next/server";


// process.env.CRON_SERCET


export async function PATCH(req:Request) {
    try {
        const authHeader = req.headers.get("Authorization");
        if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
            return new NextResponse("INVAILD CRON_SECRET", {status: 403});
        }

        weeklyReset();
    } catch(e) {
        return new NextResponse("Failed to complete weekly reset", {status: 500})
    }
}