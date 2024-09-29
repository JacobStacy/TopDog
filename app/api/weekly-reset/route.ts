import { weeklyReset } from "@/queries/dogs";
import { NextResponse } from "next/server";




export async function GET(req:Request) {
    try {
        const authHeader = req.headers.get("Authorization");

        console.log(authHeader, "=========================")
        if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
            return new NextResponse("INVAILD CRON_SECRET", {status: 403});
        }

        weeklyReset();
        return new NextResponse("Sucessfully completed weekly rest", {status: 200})
    } catch(e) {
        return new NextResponse("Failed to complete weekly reset", {status: 500})
    }
}