import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
    trustHost: true,
    providers: [
        Credentials({
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                // Simple internal authentication against ENV vars
                const envUser = process.env.ADMIN_USERNAME || "admin";
                const envPass = process.env.ADMIN_PASSWORD || "admin123";

                if (
                    credentials.username === envUser &&
                    credentials.password === envPass
                ) {
                    return { id: "admin", name: "Admin Dashboard User" };
                }
                return null;
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
});
