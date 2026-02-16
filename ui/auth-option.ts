import { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectedToDatabase from "./mongoose";
import User from "@/database/user-schema";

const authOption: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                await connectedToDatabase();

                const user = await User.findOne({
                    username: credentials.email,
                });

                if (!user) return null;

                return user;
            },
        }),

        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],

    callbacks: {
        async session({ session }: any) {
            if (!session.user?.email) return session;

            await connectedToDatabase();

            const emailExist = await User.findOne({
                email: session.user.email,
            });

            if (!emailExist) {
                const userCreate = await User.create({
                    email: session.user.email,
                    name: session.user.name ?? "No Name",
                    profileimage: session.user.image ?? "",
                });

                session.currentUser = userCreate;
            } else {
                session.currentUser = emailExist;
            }

            return session;
        },
    },

    session: { strategy: "jwt" },

    secret: process.env.NEXTAUTH_SECRET,
};

export default authOption;
