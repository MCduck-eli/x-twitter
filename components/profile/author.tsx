import { getByUserId } from "@/lib/action/user-action";

export default async function AutorPage() {
    const user = await getByUserId();

    return (
        <>
            <div className="w-full h-auto flex flex-row items-start justify-between p-8 gap-4 z-50 ">
                <img
                    src={user.profileimage || "/default-avatar.jpg"}
                    alt="Avatar"
                    className="w-35 h-35 rounded-full -mt-12 border-4 border-white relative bottom-10"
                />
            </div>
        </>
    );
}
