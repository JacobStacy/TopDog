import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials"
import { signInSchema } from "./lib/zod"

import { getUserByEmail, User } from "@/utils/users";

export const {
    handlers: {GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) : Promise<User | null> {
                if (credentials === null) return null;

                try {


                    const { email, password } = await signInSchema.parseAsync(credentials)

                    const user = getUserByEmail(email);

                    if (user) {
                        const isMatch = user?.password === credentials?.password;
                        
                        if (isMatch) {
                            return user;
                        } else {
                            throw new Error("Username or Password is incorrect")
                        }

                    } else {
                        throw new Error("User not found")
                    }
                } catch (error){   
                    if (error instanceof Error) {
                        throw new Error(error.message);
                    } else {
                        throw new Error('An unknown error occurred');
                    }
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,

            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                }

            }
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,

            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                }

            }
        }),
    ]
})