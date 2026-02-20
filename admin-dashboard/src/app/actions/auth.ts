"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export async function authenticate(formData: FormData) {
    try {
        await signIn("credentials", formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "بيانات الاعتماد غير صحيحة." };
                default:
                    return { error: "حدث خطأ غير معروف." };
            }
        }
        throw error;
    }
}

export async function logOut() {
    await signOut();
}
