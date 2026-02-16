"use client";

import { IUser } from "@/types/user-type";
import Button from "@/ui/button";
import { formatDistanceToNow } from "date-fns";
import useEdit from "@/lib/edit-modal";
import { FiMapPin } from "react-icons/fi";
import EditProfile from "./edit-profile";

export default function Bio({ user }: { user: IUser }) {
    const useEditModal = useEdit();
    return (
        <>
            <EditProfile user={JSON.parse(JSON.stringify(user))} />
            <div className="flex justify-between px-8 w-full h-auto py-8">
                <div className=" flex flex-col">
                    <span className="font-bold text-3xl text-white  ">
                        {user.name}
                    </span>
                    <div className="text-muted-foreground mb-2">
                        <span className="mr-2">
                            {user.username || user.email}
                        </span>
                        <span>
                            {formatDistanceToNow(new Date(user.createdAt))} ago
                        </span>
                    </div>
                    {user.location ? (
                        <span className="text-sky-500 flex flex-row gap-1">
                            <div className="flex items-center">
                                <FiMapPin />
                            </div>
                            {user.location}
                        </span>
                    ) : (
                        <div className="hidden"></div>
                    )}

                    <span>{user.bio}</span>
                </div>
                <Button
                    onClick={useEditModal.isOpen}
                    label={"Edit profile"}
                    secondary
                    classNames="h-14"
                />
            </div>
        </>
    );
}
