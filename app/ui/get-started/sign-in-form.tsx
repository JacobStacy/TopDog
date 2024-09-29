"use client"
import styles from "./sign-in-form.module.scss"
import { socialLogin } from "@/app/actions";
import Link from "next/link";
import Image from "next/image";


export default function SignInForm() {
    
    return (
        <>
            <form action={socialLogin}>
                <div className={styles.social_buttons}>
                    <button 
                    className={styles.sign_in_button} 
                    type="submit" 
                    name="action" 
                    value="google"
                    >
                        Sign in with Google
                        <Image
                            src="/google-social-icon.png"
                            alt="Google Icon"
                            width="32"
                            height="32"
                            unoptimized
                        />
                    </button>

                    <button 
                    className={styles.sign_in_button} 
                    type="submit" 
                    name="action" 
                    value="github"
                    >
                        Sign in with GitHub
                        <Image
                            src="/github-social-icon.png"
                            alt="Github Icon"
                            width="32"
                            height="32"
                            unoptimized
                        />
                    </button> 
                </div>
            </form>
            {/* Temp disable until I set up email verification or magic links */}
            {/* <Link href="/get-started/email-login">
                <button
                    className={styles.sign_in_button} 
                    name="email"
                >
                    Sign in with Email
                    <Image
                        unoptimized
                        src="/email-icon.png"
                        alt="Email Icon"
                        width="32"
                        height="32"
                    />
                </button>
            </Link> */}
        </>
    );
}