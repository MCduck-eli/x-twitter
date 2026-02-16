"use client";

import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

interface homeProps {
    label: string;
    back?: boolean;
}

export default function Header({ label, back }: homeProps) {
    const route = useRouter();

    const backHendler = () => {
        route.back();
    };

    return (
        <div className=" w-full flex flex-col">
            <div className="flex flex-row items-center border-b border-neutral-500 gap-1 py-6 px-8">
                <div className="cursor-pointer text-white">
                    {back && <FiArrowLeft size={25} onClick={backHendler} />}
                </div>
                <div className="text-2xl font-semibold text-white">{label}</div>
            </div>
        </div>
    );
}
