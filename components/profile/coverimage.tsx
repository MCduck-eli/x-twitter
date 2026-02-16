"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface Props {
    coverImage: string;
    onChange: (coverImage: string) => void;
}

export default function Coverimage({ coverImage, onChange }: Props) {
    const [image, setImage] = useState<string>(coverImage || "");

    const onHandlerChange = useCallback(
        (newImage: string) => {
            onChange(newImage);
        },
        [onChange],
    );

    const onHandlerDrop = useCallback(
        (files: File[]) => {
            const file = files[0];
            const reader = new FileReader();

            reader.onload = (evt) => {
                const result = evt.target?.result as string;
                setImage(result);
                onHandlerChange(result);
            };

            reader.readAsDataURL(file);
        },
        [onHandlerChange],
    );

    const { getRootProps, getInputProps } = useDropzone({
        maxFiles: 1,
        onDrop: onHandlerDrop,
        accept: {
            "image/jpeg": [],
            "image/png": [],
        },
    });

    return (
        <div {...getRootProps()} className="cursor-pointer w-full">
            <input {...getInputProps()} />
            <div className="relative w-full h-50 rounded-[10px] overflow-hidden">
                <Image
                    src={image || "/coverImage.jpg"}
                    alt="cover image"
                    fill
                    className="object-cover"
                />
            </div>
        </div>
    );
}
