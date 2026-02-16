import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function sliceText(text: string, limit: number) {
    if (text.length < limit) return text;
    return text.slice(0, limit) + "...";
}
