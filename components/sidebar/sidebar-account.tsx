"use client";

import { IUser } from "@/types/user-type";
import { FiMoreHorizontal } from "react-icons/fi";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function SideAccount({ user }: { user: IUser }) {
    return (
        <>
            <Popover>
                <PopoverTrigger asChild>
                    <div className="hover:bg-neutral-800/60  px-4 py-2 cursor-pointer transition-all ease-in-out duration-300 rounded-full flex flex-row gap-2">
                        <Avatar>
                            <AvatarImage src={user.image} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <span className="flex items-center text-white">
                            {user.name}
                        </span>
                        <div className="flex items-center">
                            <FiMoreHorizontal />
                        </div>
                    </div>
                </PopoverTrigger>
                <PopoverContent
                    className="w-50 py-2 cursor-pointer"
                    onClick={() => signOut()}
                >
                    <div className="flex justify-between">
                        <span className="text-red-400 flex items-center font-semibold">
                            LogOut
                        </span>
                        <Image
                            src={"/logout.png"}
                            alt="logo"
                            width={30}
                            height={30}
                        />
                    </div>
                </PopoverContent>
            </Popover>
        </>
    );
}
