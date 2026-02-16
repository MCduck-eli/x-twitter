import User from "@/database/user-schema";
import connectedToDatabase from "@/ui/mongoose";
import { compare } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        await connectedToDatabase();
        const { email, password } = await req.json();
        const emailExist = await User.findOne({ email });
        if (!emailExist) {
            return NextResponse.json(
                { message: "Email does not" },
                { status: 400 },
            );
        }

        const isPass = await compare(password, emailExist.password);

        if (!isPass) {
            return NextResponse.json(
                { message: "Password incorred" },
                { status: 4000 },
            );
        }

        return NextResponse.json(
            { success: true, emailExist },
            { status: 201 },
        );
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
