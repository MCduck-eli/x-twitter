"use client";

import { IUser } from "@/types/user-type";
import { useEffect, useState } from "react";
import Modal from "@/ui/modal-dialog";
import axios from "axios";
import { useRouter } from "next/navigation";
import Profileimage from "./profileimage";
import Coverimage from "./coverimage";
import EditForm from "./edit-form";
import useEdit from "@/lib/edit-modal";

export default function EditProfile({ user }: { user: IUser }) {
    const [profileimage, setProfileimage] = useState("");
    const [coverimage, setCoverimage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const useEditModal = useEdit();
    const router = useRouter();

    useEffect(() => {
        setCoverimage(user.coverImage);
        setProfileimage(user.profileimage);
    }, []);

    const onHendlerImage = async (image: string, isProfileImage: boolean) => {
        try {
            setIsLoading(true);
            await axios.put(`/api/users/${user._id}`, {
                [isProfileImage ? "profileimage" : "coverimage"]: image,
            });
            router.refresh();
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    const onBody = (
        <>
            <Coverimage
                coverImage={coverimage}
                onChange={(image) => onHendlerImage(image, false)}
            />
            <Profileimage
                profileimage={profileimage}
                onChange={(image) => onHendlerImage(image, true)}
            />
            <EditForm user={user} />
        </>
    );

    return (
        <Modal
            body={onBody}
            isOpen={useEditModal.onOpen}
            onClose={useEditModal.isClose}
            isEditing
        />
    );
}
