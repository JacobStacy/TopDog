import styles from "./page.module.scss";
import { montserrat } from '@/app/ui/fonts';
import SignInForm from "@/app/ui/get-started/sign-in-form";
import { auth } from "@/auth";
import { dbConnect } from "@/lib/mongo";
import { User } from "@/model/user-model";
import { redirect } from "next/navigation";


export default async function GetStarted() {


    // Replace with middleware
    await dbConnect();
    const session = await auth();
    if (session){
        const user = await User.findOne({
            email: session?.user?.email,
        });
        // Check if the user exists
        if (user) {
            redirect("/home/tutorial")
        }
    }
    
    
    return (
        <main>
            <div className={`${styles.lets_get_it_started_in_here} ${montserrat.className}`}>
                Let's Get You Started!
                <SignInForm/>
            </div>
        </main>
    )
}

