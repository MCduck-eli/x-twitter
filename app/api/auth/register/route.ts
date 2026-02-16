import User from "@/database/user-schema";
import connectedToDatabase from "@/ui/mongoose";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";

export async function POST(req: Request) {
    try {
        await connectedToDatabase();
        const { searchParams } = new URL(req.url);

        const step = searchParams.get("step");

        if (step === "1") {
            const { email } = await req.json();
            const emailExist = await User.findOne({ email });

            if (emailExist) {
                return NextResponse.json(
                    { message: "This Email already exists" },
                    { status: 400 },
                );
            }

            return NextResponse.json(
                { success: true, emailExist: false },
                { status: 200 },
            );
        } else if (step === "2") {
            const { email, name, password, username } = await req.json();

            if (!email || !name || !username || !password) {
                return NextResponse.json(
                    {
                        error: "All fields (email, name, username, password) are required",
                    },
                    { status: 400 },
                );
            }

            const userExist = await User.findOne({ username });

            if (userExist) {
                return NextResponse.json(
                    { message: "Username already exists" },
                    { status: 400 },
                );
            }

            const hashedPassword = await hash(password, 10);

            const user = await User.create({
                email,
                password: hashedPassword,
                name,
                username,
            });

            return NextResponse.json({ success: true, user }, { status: 201 });
        } else {
            return NextResponse.json(
                { error: "Step not found" },
                { status: 400 },
            );
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
