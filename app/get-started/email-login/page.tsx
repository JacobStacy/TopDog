import EmailSignIn from "@/app/ui/email-login/email-sign-in";
import styles from "./page.module.scss";
import { montserrat } from '@/app/ui/fonts';


export default function GetStarted() {
    return (
        <main>
            <div className={`${styles.email_login} ${montserrat.className}`}>
                Login with Email
                <EmailSignIn/>
            </div>
        </main>
    )
}

