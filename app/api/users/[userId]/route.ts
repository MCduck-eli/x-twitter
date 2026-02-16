import User from "@/database/user-schema";
import authOption from "@/ui/auth-option";
import connectedToDatabase from "@/ui/mongoose";
import { getServerSession } from "next-auth";

import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    try {
        await connectedToDatabase();

        const { currentUser }: any = await getServerSession(authOption);

        const body = await req.json();

        await User.findByIdAndUpdate(currentUser._id, body, { new: true });

        return NextResponse.json({
            message: "User updated successfully",
        });
    } catch (error) {
        const result = error as Error;
        return NextResponse.json({ error: result.message }, { status: 400 });
    }
}
