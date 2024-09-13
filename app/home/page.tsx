import { auth } from "@/auth";
import { Session } from "next-auth";
import { redirect } from "next/navigation";
import Logout from "@/app/ui/logout-form";
import PhotoCard from "@/app/ui/home/photo-card";

export default async function Home() {
    
    // const session: Session | null = await auth();
    // if (!session?.user) redirect("/");

    

    return (
        <>
            <PhotoCard/>
        </>
    )
}