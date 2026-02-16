import connectedToDatabase from "@/ui/mongoose";
import { NextResponse } from "next/server";
import User from "@/database/user-schema";
import Notification from "@/database/notification";
import Post from "@/database/post-schema";

export async function PUT(req: Request) {
    try {
        await connectedToDatabase();

        const { postId, userId } = await req.json();

        const post = await Post.findByIdAndUpdate(
            postId,
            {
                $push: { likes: userId },
            },
            { new: true },
        );

        await Notification.create(
            { user: String(post.user) },
            { body: "Someone liked your post" },
        );

        await User.findOneAndUpdate(
            { _id: String(post.user) },
            { $set: { hasNewNotification: true } },
        );

        return NextResponse.json({ message: "Post edit successfully" });
    } catch (error) {
        const result = error as Error;
        return NextResponse.json({ error: result.message }, { status: 400 });
    }
}

export async function DELETE(req: Request) {
    try {
        await connectedToDatabase();

        const { postId, userId } = await req.json();

        await Post.findByIdAndUpdate(
            postId,
            {
                $pull: { likes: userId },
            },
            { new: true },
        );

        return NextResponse.json({ message: "Post delete successfully" });
    } catch (error) {
        const result = error as Error;
        return NextResponse.json({ error: result.message }, { status: 400 });
    }
}
