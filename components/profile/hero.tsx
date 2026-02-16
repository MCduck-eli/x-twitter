import { IUser } from "@/types/user-type";
import Image from "next/image";

export default function Hero({ user }: { user: IUser }) {
    return (
        <>
            <div className="w-full h-90 relative">
                <Image
                    src="/coverImage.jpg"
                    alt="coverImage"
                    fill
                    className="object-cover"
                />
            </div>
        </>
    );
}
