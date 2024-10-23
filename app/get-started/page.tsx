"use client"
import styles from "./page.module.scss";
import { montserrat } from '@/app/ui/fonts';
import SignInForm from "@/app/ui/get-started/sign-in-form";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";


export default function GetStarted() {

    const session = useSession();
    if (session?.data?.user?.email) {
        redirect("/home"); // Redirect if session exists
    }

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText("https://top-dog-nine.vercel.app/get-started");
            alert('URL copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    }

    return (
        <main>
            <div className={`${styles.lets_get_it_started_in_here} ${montserrat.className}`}>
                Let's Get You Started!
                <SignInForm />
                <div className={styles.warning}>
                    Warning: For security reasons sign in will not work in the Snapchat or Instagram browser
                    <br/>
                    <br/>
                    <span onClick={handleCopy}>
                        Click here to copy link ⎘
                    </span>
                </div>
            </div>
        </main>
    )
}

