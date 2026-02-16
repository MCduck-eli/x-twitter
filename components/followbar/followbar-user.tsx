import { IUser } from "@/types/user-type";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { sliceText } from "@/lib/utils";

export default function FallowUser({ user }: { user: IUser }) {
    return (
        <>
            <div className="flex flex-row gap-1 mb-1 cursor-pointer hover:bg-neutral-700 py-1 px-4 rounded-[10px] transition-all ease-in-out duration-300 ">
                <Avatar>
                    <AvatarImage src={user.image} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <span className="flex items-center font-semibold text-white">
                    {sliceText(user.username || user.email, 16)}
                </span>
            </div>
        </>
    );
}
