import { editForm } from "@/lib/validation";
import { IUser } from "@/types/user-type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import {
    FormField,
    FormItem,
    FormControl,
    FormMessage,
    Form,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import Button from "@/ui/button";
import { Textarea } from "../ui/textarea";
import axios from "axios";
import { useRouter } from "next/navigation";
import useEdit from "@/lib/edit-modal";

interface UserProps {
    user: IUser;
}

export default function EditForm({ user }: UserProps) {
    console.log(user._id);

    const router = useRouter();
    const useEditModal = useEdit();
    const form = useForm<z.infer<typeof editForm>>({
        resolver: zodResolver(editForm),
        defaultValues: {
            bio: user.bio || "",
            username: user.username || "",
            name: user.name || "",
            location: user.location || "",
        },
    });
    async function onSubmit(data: z.infer<typeof editForm>) {
        try {
            await axios.put(`/api/users/${user._id}`, data);
            router.refresh();
            useEditModal.isClose();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="relative bottom-10">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="mb-2">
                                <FormControl>
                                    <Input
                                        placeholder="Name"
                                        {...field}
                                        className="text-white"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem className="mb-5">
                                <FormControl>
                                    <Input
                                        placeholder="Username"
                                        {...field}
                                        className="text-white"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem className="mb-5">
                                <FormControl>
                                    <Input
                                        placeholder="location"
                                        {...field}
                                        className="text-white"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                            <FormItem className="mb-5">
                                <FormControl>
                                    <Textarea
                                        placeholder="Bio"
                                        {...field}
                                        className="text-white"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        label={"Edit"}
                        secondary
                        onClick={form.handleSubmit(onSubmit)}
                        fullWidth
                    />
                </form>
            </Form>
        </div>
    );
}
