"use client";

import Image from "next/image";
import Link from "next/link";
import { FiHome } from "react-icons/fi";
import { FiBell } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { IButtons, IUser } from "@/types/user-type";
import Button from "@/ui/button";
import { signOut } from "next-auth/react";
import { FiEdit } from "react-icons/fi";
import Sidebutton from "./side-button";
import SideAccount from "./sidebar-account";

export default function Sidebar({ user }: { user: IUser }) {
    console.log(user);

    const userIteams = [
        {
            id: "1",
            path: "/",
            label: "Home",
            icon: <FiHome />,
        },
        {
            id: "2",
            path: "/notification",
            label: "Notification",
            icon: <FiBell />,
        },
        {
            id: "3",
            path: "/profile",
            label: "Profile",
            icon: <FiUser />,
        },
    ];
    return (
        <div className="w-auto md:w-80 md:pr-8  px-2 md:px-0 py-10 h-screen relative">
            <div className="flex flex-col">
                <div className="relative md:flex hidden justify-center mb-10 ">
                    <Image
                        src={"/x-logo.png"}
                        alt="logo"
                        width={50}
                        height={50}
                    />
                </div>

                <div className="relative md:hidden flex justify-center mb-10 ">
                    <Image
                        src={"/x-logo.png"}
                        alt="logo"
                        width={30}
                        height={30}
                    />
                </div>

                <div className="flex flex-col md:ml-10 gap-10 ">
                    {userIteams.map((user: IButtons) => (
                        <Link href={user.path} key={user.id}>
                            <Sidebutton user={user} />
                        </Link>
                    ))}
                </div>

                <div className="md:block hidden mt-10">
                    <Button label={"POST"} fullWidth />
                </div>
            </div>
            <div className="absolute bottom-70 md:hidden block">
                <button className="bg-sky-400 p-1 rounded-full text-3xl cursor-pointer">
                    <FiEdit />
                </button>
            </div>
            <div className="absolute bottom-5 md:hidden block">
                <button className="cursor-pointer" onClick={() => signOut()}>
                    <Image
                        src={"/logout.png"}
                        alt="logout"
                        width={40}
                        height={40}
                    />
                </button>
            </div>
            <div className="absolute bottom-5 md:block hidden w-full pr-8">
                <SideAccount user={user} />
            </div>
        </div>
    );
}
