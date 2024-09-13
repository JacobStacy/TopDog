import styles from "./sign-in-form.module.scss"
import { socialLogin } from "@/app/actions";
import Image from "next/image";

export function SignInForm() {
    return (
        <form action={socialLogin}>
            <div className={styles.social_buttons}>
                <button type="submit" name="action" value="google">
                    Sign in With Google
                    <Image
                        src="/google-social-icon.png"
                        alt="Google Icon"
                        width="32"
                        height="32"
                    />
                </button>

                <button type="submit" name="action" value="github">
                    Sign In With GitHub
                    <Image
                        src="/github-social-icon.png"
                        alt="Github Icon"
                        width="32"
                        height="32"
                    />
                </button> 
            </div>
        </form>


    )
}