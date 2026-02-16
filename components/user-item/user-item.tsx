import { IUser, IUserItem } from "@/types/user-type";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { sliceText } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { FaComment } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { toast } from "sonner";
import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface PostProps {
    post: IUserItem;
    setData: Dispatch<SetStateAction<IUserItem[]>>;
}

export default function UserItem({ post, setData }: PostProps) {
    const [isLoading, setIsLoading] = useState(false);
    const route = useRouter();

    const onDelete = async (e: any) => {
        e.stopPropagation();
        try {
            setIsLoading(true);
            await axios.delete("/api/post", { data: { userId: post._id } });
            setData((prev) => prev.filter((p) => p._id !== post._id));
            setIsLoading(false);
        } catch (error: any) {
            toast(error.response.data.message || error.response.data.error);
            setIsLoading(false);
        }
    };

    const onLike = async (e: any) => {
        e.stopPropagation();
        try {
            setIsLoading(true);
            if (post.hasLikes) {
                await axios.delete("/api/likes", {
                    data: {
                        postId: post._id,
                        userId: post.user._id,
                    },
                });
                const upadatePost = {
                    ...post,
                    hasLikes: false,
                    likes: post.likes + 1,
                };

                setData((prev) =>
                    prev.map((p) => (p._id === post._id ? upadatePost : p)),
                );
            } else {
                await axios.put("/api/likes", {
                    postId: post._id,
                    userId: post.user._id,
                });

                const updatePost = {
                    ...post,
                    hasLikes: true,
                    likse: post.likes - 1,
                };

                setData((prev) =>
                    prev.map((p) => (p._id === post._id ? updatePost : p)),
                );
            }
            setIsLoading(false);
        } catch (error: any) {
            toast(error.response.data.message || error.response.data.error);
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="relative flex flex-col border-b border-neutral-500 cursor-pointer hover:bg-neutral-500/30">
                {isLoading ? (
                    <div className="absolute inset-0 w-full h-full bg-black/50 z-10">
                        <div className="flex justify-center items-center mt-15">
                            <Loader2 className="animate-spin" />
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-row gap-4 h-full py-8 px-4 relative z-0">
                        <div className="flex items-center">
                            <Avatar>
                                <AvatarImage
                                    src={post.user.image || undefined}
                                />
                                <AvatarFallback>
                                    {post.user.name[0]}
                                </AvatarFallback>
                            </Avatar>
                        </div>

                        <div className="flex flex-col">
                            <div className="flex flex-row gap-1">
                                <span className="font-semibold text-[18px] text-white">
                                    {post.user.name}
                                </span>
                                <span className="flex items-center text-muted-foreground">
                                    {sliceText(post.user.email, 16)}
                                </span>
                                <span className="flex items-center text-muted-foreground">
                                    {formatDistanceToNow(
                                        new Date(post.createdAt),
                                    )}{" "}
                                    ago
                                </span>
                            </div>
                            <span className="text-muted-foreground">
                                {post.body}
                            </span>

                            <div className="flex flex-row md:gap-10 gap-5 mt-2">
                                <span className="flex flex-row gap-1 text-muted-foreground">
                                    <FaComment
                                        size={20}
                                        className="cursor-pointer hover:text-sky-500 transition-all ease-in-out duration-300"
                                    />
                                    {post.comments}
                                </span>

                                <span className="flex flex-row gap-1 text-muted-foreground">
                                    <FaHeart
                                        size={20}
                                        className="cursor-pointer  hover:text-red-400 transition-all ease-in-out duration-300"
                                        color={post.hasLikes ? "red" : ""}
                                        onClick={onLike}
                                    />
                                    {post.likes}
                                </span>

                                <span className="flex flex-row gap-1 text-muted-foreground">
                                    {post.user._id === post.user._id && (
                                        <FaTrash
                                            size={20}
                                            className="cursor-pointer text-muted-foreground hover:text-red-400 transition-all ease-in-out duration-300"
                                            onClick={onDelete}
                                        />
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
