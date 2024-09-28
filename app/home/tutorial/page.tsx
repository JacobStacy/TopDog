import { dbConnect } from "@/lib/mongo";
import s from "./page.module.scss"
import { auth } from "@/auth";
import { User } from "@/model/user-model";
import { redirect } from "next/navigation";
import { montserrat } from '@/app/ui/fonts';
import Link from "next/link";


export default async function Tutorial() {
    // Replace with middleware
    await dbConnect();
    const session = await auth();
    if (!session) {
        redirect("/get-started");
    }

    const user = await User.findOne({
        email: session?.user?.email,
    });

    if (!user) {
        redirect("/get-started");
    }

    if (user.doneTut) {
        redirect("/home");
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
                            Swipe to the left to dislike a dog
                        </div>
                    </div>
                </div>
            </div>
            <Link 
            className={`${s.got_it} ${montserrat.className}`} 
            href={"/home"}
            >
                <div className={s.inner}>
                    Got it!
                </div>
            </Link>
        </>
    )
}