import Post from "@/database/post-schema";
import connectedToDatabase from "@/ui/mongoose";
import { NextResponse } from "next/server";
import User from "@/database/user-schema";
import { getServerSession } from "next-auth";
import authOption from "@/ui/auth-option";

export async function POST(req: Request) {
    try {
        await connectedToDatabase();

        const { currentUser }: any = await getServerSession(authOption);

        console.log(currentUser);

        const { body } = await req.json();

        const newPost = await Post.create({
            body,
            user: currentUser._id,
        });

        return NextResponse.json(newPost);
    } catch (error) {
        const result = error as Error;
        return NextResponse.json({ error: result.message }, { status: 400 });
    }
}

export async function GET(req: Request) {
    try {
        await connectedToDatabase();

        const { searchParams } = new URL(req.url);
        const limit = searchParams.get("limit");

        const { currentUser }: any = await getServerSession(authOption);

        const getPost = await Post.find()
            .populate({
                path: "user",
                model: User,
                select: "email name username profileimage _id",
            })
            .limit(Number(limit));

        const filterPost = getPost.map((post) => ({
            body: post.body,
            createdAt: post.createdAt,
            user: {
                _id: post.user._id,
                email: post.user.email,
                name: post.user.name,
                username: post.user.username,
                profileimage: post.user.profileimage,
            },
            likes: post.likes.length,
            comments: post.comments.length,
            hasLikes: post.likes.includes(currentUser._id),
            _id: post._id,
        }));

        return NextResponse.json(filterPost);
    } catch (error) {
        const result = error as Error;
        return NextResponse.json({ error: result.message }, { status: 400 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { userId } = await req.json();
        await Post.findByIdAndDelete(userId);

        return NextResponse.json({ message: "Post deleted succesfully" });
    } catch (error) {
        const result = error as Error;
        return NextResponse.json({ error: result.message }, { status: 400 });
    }
}
