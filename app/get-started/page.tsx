import Link from "next/link";
import styles from "./page.module.scss";
import { montserrat } from '@/app/ui/fonts';
import { SignInForm } from "../ui/sign-in-form";


export default function GetStarted() {
    return (
        <main>
            <div className={`${styles.lets_get_it_started_in_here} ${montserrat.className}`}>
                Let's Get You Started!
                <SignInForm/>
            </div>
        </main>
    )
}

