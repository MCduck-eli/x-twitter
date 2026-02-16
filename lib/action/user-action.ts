import User from "@/database/user-schema";
import authOption from "@/ui/auth-option";
import connectedToDatabase from "@/ui/mongoose";
import { getServerSession } from "next-auth";

export async function getByUserId() {
    try {
        await connectedToDatabase();

        const { currentUser }: any = await getServerSession(authOption);

        const user = await User.findById(currentUser._id);

        const filterUser = {
            name: user.name,
            email: user.email,
            _id: user._id,
            profileimage: user.profileimage,
            coverimage: user.coverimage,
            username: user.username,
            createdAt: user.createdAt,
            bio: user.bio,
            location: user.location,
            followers: user.followers?.length || 0,
            following: user.following?.length || 0,
        };

        return filterUser;
    } catch (error) {
        throw error;
    }
}
