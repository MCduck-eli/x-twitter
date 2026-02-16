import { ReactElement } from "react";

interface IUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    username: string;
    image: string;
    coverImage: string;
    bio: string;
    followers: string;
    following: string;
    location: string;
    createdAt: string;
    profileimage: string;
    notification: [];
    hasNewNotification: boolean;
}

interface IButtons {
    id: string;
    path: string;
    label: string;
    icon: ReactElement;
}

interface IUserItem {
    _id: string;
    body: string;
    username: string;
    email: string;
    name: string;
    createdAt: string;
    updateAt: string;
    user: IUser;
    likes: number;
    comments: number;
    userId: [];
    hasLikes: boolean;
}

export type { IUser, IButtons, IUserItem };
