import { IButtons } from "@/types/user-type";
import Button from "@/ui/button";

export default function Sidebutton({ user }: { user: IButtons }) {
    return (
        <>
            {/* DESKTOP VERSION */}
            <div className=" hidden border-0 md:flex flex-row ">
                <span className="flex items-center text-3xl text-white">
                    {user.icon}
                </span>
                <Button label={user.label} outline />
            </div>

            {/* MOBILE VERSION */}

            <div className="md:hidden block text-white">
                <button className="text-3xl cursor-pointer">{user.icon}</button>
            </div>
        </>
    );
}
