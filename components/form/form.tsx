"use client";

import { IUser, IUserItem } from "@/types/user-type";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Dispatch, SetStateAction, useState } from "react";

import axios from "axios";
import { toast } from "sonner";
import { Input } from "../ui/input";
import Button from "@/ui/button";

interface IForm {
    placeholder: string;
    user: IUser;
    setData: Dispatch<SetStateAction<IUserItem[]>>;
}

export default function Form({ placeholder, user, setData }: IForm) {
    const [body, setBody] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.post("/api/post", {
                body,
                user,
            });
            const setPost = {
                ...data,
                user,
                likes: 0,
                hasLikes: false,
                comments: 0,
            };
            setData((prev) => [setPost, ...prev]);
            setIsLoading(false);
            setBody("");
        } catch (error: any) {
            setIsLoading(false);
            toast(error.response.data.error || error.response.data.message);
        }
    };
    return (
        <div className=" border-b border-neutral-500 py-6 px-8 flex flex-col ">
            <div className="flex flex-row gap-2 ">
                <Avatar>
                    <AvatarImage src={user.image || undefined} />
                    <AvatarFallback>{user.name}</AvatarFallback>
                </Avatar>
                <div className="w-full border-b border-transparent focus-within:border-neutral-500 transition-colors duration-200">
                    <Input
                        className="disabled:opacity-80 peer resize-none w-full bg-black ring-0 outline-none text-[20px] placeholder-neutral-500 text-white h-12.5"
                        disabled={isLoading}
                        value={body}
                        placeholder={placeholder}
                        onChange={(e) => setBody(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && onSubmit()}
                    />
                </div>
            </div>
            <div className="flex justify-end mt-4">
                <Button
                    label={"submit"}
                    type={"submit"}
                    onClick={() => onSubmit()}
                />
            </div>
        </div>
    );
}
