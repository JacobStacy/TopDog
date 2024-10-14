"use client"
// import { dbConnect } from "@/lib/mongo";
import s from "./page.module.scss"
// import { auth } from "@/auth";
// import { User } from "@/model/user-model";
import { redirect } from "next/navigation";
import { montserrat } from '@/app/ui/fonts';
import Link from "next/link";
import { useEffect } from "react";


export default function Tutorial() {


    useEffect(() => {
        const hasDone = localStorage.getItem("did-tutorial");
        if (hasDone && hasDone == "true") {
            redirect("/home");
        }
    }, []);

    // // Replace with middleware
    // await dbConnect();
    // const session = await auth();
    // if (!session) {
    //     redirect("/get-started");
    // }

    // const user = await User.findOne({
    //     email: session?.user?.email,
    // });

    // if (!user) {
    //     redirect("/get-started");
    // }

    // if (user.doneTut) {
    //     redirect("/home");
    // }

    const handleClick = () => {
        localStorage.setItem("did-tutorial", "true")
    }

    return (
        <>
            <div className={`${s.tutorial_holder} ${montserrat.className}`}>
                <div className={s.tutorial}>
                    <div className={s.overlay}>
                        <div className={s.btns}>
                            <button
                                aria-label="Go back an image"
                                className={s.btn}
                            >
                                Tap here to go back a picture
                            </button>
                            <button
                                aria-label="Go to next an image"
                                className={s.btn}
                            >
                                Tap here to go forward a picture
                            </button>
                        </div>
                        <div className={`${s.info}`}>
                            Swipe to the right to like a dog<br />
                            Swipe to the left to dislike a dog<br />

                            Click the icon on the bottom right to add your dog!
                        </div>
                    </div>
                </div>
            </div>
            <Link 
            className={`${s.got_it} ${montserrat.className}`} 
            href={"/home"}
            onClick={handleClick}
            >
                <div className={s.inner}>
                    Got it!
                </div>
            </Link>
        </>
    )
}