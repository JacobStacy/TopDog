'use server'

import {signIn, signOut} from "@/auth"

export async function socialLogin(formData: FormData) {
    const action = formData.get("action")?.toString() ?? "";
    if (action) {
        await signIn(action, {redirectTo: "/home"});
    } else {
        throw new Error("Invalid action");
    }
}

export async function logout() {
    await signOut({redirectTo: "/"});
}