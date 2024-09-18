import RegisterForm from "@/app/ui/get-started/create-account/register-form"
import styles from "./page.module.scss";
import { montserrat } from '@/app/ui/fonts';
import Link from "next/link";

export default function Register() {
    return(
        <main>
            <div className={`${styles.register} ${montserrat.className}`}>
                Create an Account
                <RegisterForm/>
            </div>
            <div className={styles.already_have}>
                <Link 
                    className={`${montserrat.className}`}
                    href="/get-started"
                >
                    Already have an account?
                </Link>
            </div>
        </main>
    )
}