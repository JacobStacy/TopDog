
import {signIn, signOut} from "@/auth"

export async function socialLogin(formData: FormData) {
    const action = formData.get("action")?.toString() ?? "";
    if (action) {
        await signIn(action, {redirectTo: "/home"});
    } else {
        throw new Error("Invalid action");
    }
}

export async function credentialLogin(formData : FormData) {
    try {
        const response = await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: false
        });
        return response;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}

export async function logout() {
    await signOut({redirectTo: "/"});
}