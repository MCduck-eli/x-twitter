import User from "@/database/user-schema";
import connectedToDatabase from "@/ui/mongoose";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        await connectedToDatabase();
        const { searchParams } = new URL(req.url);
        const limit = searchParams.get("limit");

        const user = await User.find()
            .select("email name username _id image")
            .limit(Number(limit));

        return NextResponse.json(user);
    } catch (error) {
        const result = error as Error;
        return NextResponse.json({ error: result.message }, { status: 400 });
    }
}
