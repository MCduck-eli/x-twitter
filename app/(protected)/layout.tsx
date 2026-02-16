import Auth from "@/components/auth/auth";
import { getServerSession } from "next-auth";
import React from "react";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";
import authOption from "@/ui/auth-option";
import Followbar from "@/components/followbar/followbar";
import Sidebar from "@/components/sidebar/sidebar";
import { ThemeProvider } from "@/components/provider";

interface LayoutProps {
    children: React.ReactNode;
}

export default async function IndexLayout({ children }: LayoutProps) {
    const session: any = await getServerSession(authOption);

    if (!session?.currentUser) {
        return <Auth />;
    }

    return (
        <div className="container max-w-342.5 2xl:max-w-460 mx-auto">
            <div className="flex">
                <ThemeProvider>
                    <Sidebar user={session?.user} />
                    <div className="flex flex-1 border-x h-screen border-neutral-600">
                        <NextTopLoader
                            color="#0ea5e9"
                            shadow="0 0 10px #0ea5e9, 0 0 5px #0ea5e9"
                            height={3}
                            showSpinner={false}
                        />
                        {children}
                        <Toaster />
                    </div>
                    <Followbar />
                </ThemeProvider>
            </div>
        </div>
    );
}
