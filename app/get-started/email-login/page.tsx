import EmailSignIn from "@/app/ui/get-started/email-login/email-sign-in";
import styles from "./page.module.scss";
import { montserrat } from '@/app/ui/fonts';
import Link from "next/link";


export default function EmailLogin() {
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

