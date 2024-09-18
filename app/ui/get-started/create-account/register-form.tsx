"use client"
import { useRouter } from "next/navigation";
import styles from "./register-form.module.scss"
import { useState } from "react"

export default function RegisterForm() {
    const [error, setError] = useState("");

    const router = useRouter();

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const formData = new FormData(event.currentTarget);

            const name = formData.get('name');
            const email = formData.get('email');
            const password = formData.get('password');

            const response = await fetch('/api/register', {
                method: "POST",
                headers: {
                    "content-type" : "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });


            response.status === 201 && router.push("/get-started");

        } catch (error) {
            if (error instanceof Error){
                setError(error.message);
            } else {
                throw new Error("Error in register submit handler");
            }
        }
    }

    return (
        <div className={styles.register}>
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
                        <label htmlFor="name">Username:</label>
                        <input type="name" name="name" id="name"/>
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" id="password"/>
                    </div>
                </div>
                <button type="submit">
                    Register
                </button>
            </form>
        </div>
    )
}