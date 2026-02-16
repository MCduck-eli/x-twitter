"use client";

import Button from "@/ui/button";

import { IUser } from "@/types/user-type";
import { Loader2 } from "lucide-react";
import useUsers from "@/hooks/use-users";
import FallowUser from "./followbar-user";

export default function Followbar() {
    const { user, isLoading } = useUsers(5);

    return (
        <div className=" py-4 pl-8 md:flex hidden flex-col">
            <div className="bg-neutral-800/90 rounded-[10px] py-2 px-4">
                <div className="flex flex-row  gap-4">
                    <span className="text-2xl font-semibold text-white">
                        Follow to
                    </span>
                    <Button label={"See all"} secondary classNames="py-1 " />
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center">
                        <Loader2 className="animate-spin" />
                    </div>
                ) : (
                    <div className="flex flex-col mt-2 gap-1 ">
                        {user?.map((users: IUser) => (
                            <div key={users._id}>
                                <FallowUser user={users} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
