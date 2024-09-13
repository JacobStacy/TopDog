'use server'

import {signIn, signOut} from "@/auth"

export async function socialLogin(formData: { get: (arg0: string) => any }) {
    const action = formData.get("action");
    await signIn(action, {redirectTo: "/home"});
    // console.log(action)
}

export async function logout() {
    await signOut({redirectTo: "/"});
}