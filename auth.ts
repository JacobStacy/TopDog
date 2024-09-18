import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInSchema } from "@/utils/zod";

import { User, UserType } from "@/model/user-model";
import bcrypt from "bcryptjs";

export const {
    // handlers: {GET, POST},
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
            async authorize(credentials) : Promise<UserType | null> {
                console.log("credentials", credentials);
                if (credentials === null) return null;

                try {
                    const { email, password } = await signInSchema.parseAsync(credentials)

                    const user = await User.findOne({
                        email: email,
                    });

                    if (user) {
                        const isMatch = await bcrypt.compare(
                            password,
                            user?.password
                        );
                        
                        if (isMatch) {
                            return user;
                        } else {
                            throw new Error("Username or Password is incorrect")
                        }

                    } else {
                        throw new Error("Username or Password is incorrect")
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