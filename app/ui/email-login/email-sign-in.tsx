"use client"
import styles from "./email-sign-in.module.scss"
import { credentialLogin} from "@/app/actions";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EmailSignIn() {
    const [error, setError] = useState("");

    const router = useRouter();

    async function handleFormSubmit(event : React.FormEvent<HTMLFormElement>) {
        
        event.preventDefault();

        try {
            const formData = new FormData(event.currentTarget);
            const response = await credentialLogin(formData);

            if (!!response.error) {
                setError(response.error.message);
            } else {
                router.push("/home");
            }
            
        } catch(error) {
            if(error instanceof Error){
                console.error(error);
                setError("Username or Password is Invalid");
            } else{
                throw(Error("Error with login"))
            }
        }
    }
    return (
        <div className={styles.cred_login}>
            <div className={styles.error_msg}>
                {error}
            </div>
            <form onSubmit={handleFormSubmit}>
                <div className={styles.fields}>
                    <div>
                        <label htmlFor="email">Email Address:</label>
                        <input type="email" name="email" id="email"/>
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" id="password"/>
                    </div>
                </div>
                <button type="submit">
                    Login
                </button>
            </form>
        </div> 
    )
}