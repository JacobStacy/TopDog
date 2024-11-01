import EmailSignIn from "@/app/ui/get-started/email-login/email-sign-in";
import styles from "./page.module.scss";
import { montserrat } from '@/app/ui/fonts';
import Link from "next/link";
import { auth } from "@/auth";
import { dbConnect } from "@/lib/mongo";
import { User } from "@/model/user-model";
import { redirect } from "next/navigation";


export default async function EmailLogin() {

    // Replace with middleware
    await dbConnect();
    const session = await auth();
    if (session){
        const user = await User.findOne({
            email: session?.user?.email,
        });
        // Check if the user exists
        if (user) {
            redirect("/tutorial")
        }
    }

    return (
        <main>
            <div className={`${styles.email_login} ${montserrat.className}`}>
                Login with Email
                <EmailSignIn/>
            </div>
            <div className={styles.register}>
                <Link 
                    className={`${montserrat.className}`}
                    href="/get-started/create-account"
                >
                    Don't have an account?
                </Link>
            </div>
        </main>
    )
}

