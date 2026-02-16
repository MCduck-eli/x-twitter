import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface Props {
    profileimage: string;
    onChange: (profileimage: string) => void;
}

export default function Profileimage({ profileimage, onChange }: Props) {
    const [image, setImage] = useState(profileimage);

    const onHendlerChange = useCallback(
        (profileimage: string) => {
            onChange(profileimage);
        },
        [onchange],
    );

    const onHendlerDrop = useCallback(
        (files: any) => {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (evt: any) => {
                setImage(evt.target.result);
                onHendlerChange(evt.target.result);
            };
            reader.readAsDataURL(file);
        },
        [onHendlerChange],
    );

    const { getInputProps, getRootProps } = useDropzone({
        maxFiles: 1,
        onDrop: onHendlerDrop,
        accept: {
            "image/jpeg": [],
            "image/png": [],
        },
    });

    return (
        <>
            <div
                {...getRootProps({
                    className: "text-white",
                })}
            >
                <input {...getInputProps()} />
                <div className="relative w-full h-50 rounded-[10px] cursor-pointer">
                    {image ? (
                        <div className="w-full flex justify-between items-start p-8 gap-4 z-50 relative bottom-10">
                            <img
                                src={image}
                                alt="Avatar"
                                className="w-30 h-30 rounded-full border-4 border-white -mt-10 object-cover"
                            />
                        </div>
                    ) : (
                        <div className="w-full flex justify-between items-start p-8 gap-4 z-50 relative bottom-10">
                            <img
                                src="/user-placeholder.png"
                                alt="Avatar"
                                className="w-30 h-30 rounded-full border-4 border-white -mt-10 object-cover"
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
