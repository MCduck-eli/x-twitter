import Header from "@/components/home/home";
import AutorPage from "@/components/profile/author";
import Bio from "@/components/profile/bio";
import Hero from "@/components/profile/hero";
import { getByUserId } from "@/lib/action/user-action";

export default async function ProfilePage() {
    try {
        const user = await getByUserId();

        return (
            <>
                <div className="w-full h-auto flex flex-col border-x border-neutral-500">
                    <Header label="Profile" back />
                    <Hero user={JSON.parse(JSON.stringify(user))} />
                    <AutorPage />
                    <Bio user={JSON.parse(JSON.stringify(user))} />
                </div>
            </>
        );
    } catch (error) {
        console.log(error);
        return <div>Error loading profile</div>;
    }
}
