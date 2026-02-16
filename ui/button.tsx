import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface buttonProps {
    label: ReactNode | string;
    fullWidth?: boolean;
    large?: boolean;
    disabled?: boolean;
    outline?: boolean;
    secondary?: boolean;
    classNames?: string;
    onClick?: () => void;
    type?: "submit" | "button";
}

export default function Button({
    label,
    fullWidth,
    large,
    disabled,
    outline,
    secondary,
    classNames,
    type,
    onClick,
}: buttonProps) {
    return (
        <>
            <button
                onClick={onClick}
                disabled={disabled}
                type={type}
                className={cn(
                    "rounded-full cursor-pointer font-bold transition ease-out duration-200",
                    fullWidth ? "w-full" : "w-fit",
                    secondary ? "bg-white text-black" : "bg-sky-400 text-white",
                    outline
                        ? "bg-black  text-white hover:opacity-70 hover:bg-neutral-900/90"
                        : "hover:opacity-70 ",
                    large ? "text-lg py-4 px-5" : "text-md py-3 px-5",
                    disabled ? "bg-neutral-500 hover:opacity-70" : "",
                    classNames,
                )}
            >
                {label}
            </button>
        </>
    );
}
