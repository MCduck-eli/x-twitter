"use client";

import Header from "@/components/home/home";
import UserItem from "@/components/user-item/user-item";
import { IUserItem } from "@/types/user-type";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import Form from "@/components/form/form";

export default function IndexPage() {
    const { data: session, status } = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<IUserItem[]>([]);

    useEffect(() => {
        async function getPosts() {
            setIsLoading(true);
            try {
                const { data } = await axios.get("/api/post?limit=3");
                setData(data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        }
        getPosts();
    }, []);

    return (
        <>
            <div className="w-full h-screen flex flex-col">
                <div>
                    <Header label="Home" />
                </div>
                {isLoading || status === "loading" ? (
                    <div className="flex justify-center items-center mt-10">
                        <Loader2 className="animate-spin" />
                    </div>
                ) : (
                    <Form
                        placeholder="Write whatever you want."
                        user={JSON.parse(JSON.stringify(session?.user))}
                        setData={setData}
                    />
                )}
                {data.map((post) => (
                    <UserItem key={post._id} post={post} setData={setData} />
                ))}
            </div>
        </>
    );
}
