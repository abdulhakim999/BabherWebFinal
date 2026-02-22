"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export async function authenticate(formData: FormData) {
    try {
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;

        await signIn("credentials", {
            username,
            password,
            redirectTo: "/dashboard",
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "بيانات الاعتماد غير صحيحة." };
                default:
                    return { error: "حدث خطأ غير معروف." };
            }
        }
        // Rethrow NEXT_REDIRECT error
        throw error;
    }
}

export async function logOut() {
    await signOut({ redirectTo: "/login" });
}
