import useLoginSchema from "@/lib/login-schema";
import { loginForm } from "@/lib/validation";
import Modal from "@/ui/modal-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Form } from "@/components/ui/form";
import {
    FormField,
    FormItem,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import Button from "@/ui/button";
import { Input } from "@/components/ui/input";
import useRegisterSchema from "@/lib/register-schema";
import axios from "axios";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { signIn } from "next-auth/react";

export default function LoginModal() {
    const useLogin = useLoginSchema();
    const useRegister = useRegisterSchema();

    const loginToggle = () => {
        useLogin.isClose();
        useRegister.isOpen();
    };

    const body = <LoginBody />;
    const footer = (
        <div className="flex justify-center text-white">
            <p>
                Have you?{" "}
                <span
                    className="text-sky-400 cursor-pointer hover:underline"
                    onClick={loginToggle}
                >
                    Registered
                </span>
            </p>
        </div>
    );
    return (
        <>
            <Modal
                body={body}
                footer={footer}
                isOpen={useLogin.onOpen}
                onClose={useLogin.isClose}
            />
        </>
    );
}

function LoginBody() {
    const useLogin = useLoginSchema();
    const [error, setError] = useState("");
    const form = useForm<z.infer<typeof loginForm>>({
        resolver: zodResolver(loginForm),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof loginForm>) {
        try {
            const { data: response } = await axios.post(
                "/api/auth/login",
                values,
            );
            if (response.success) {
                useLogin.isClose();
                signIn("credentials", {
                    ...values,
                });
            }
        } catch (error: any) {
            const msg =
                (error.response.data.message || error.response.data.error,
                "somthing went wrong. Try again");
            setError(msg);
        }
    }

    const { isSubmitting } = form.formState;
    return (
        <>
            <div className="flex justify-center ">
                <h1 className="text-2xl font-semibold text-white">Login</h1>
            </div>
            <Form {...form}>
                {error && (
                    <Alert variant="destructive" className="max-w-md mb-2">
                        <AlertCircleIcon />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription className="text-red-500">
                            {error}
                        </AlertDescription>
                    </Alert>
                )}
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="mb-2 mt-5 px-4">
                                <FormControl>
                                    <Input placeholder="Email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="mb-5 px-4">
                                <FormControl>
                                    <Input
                                        placeholder="Password"
                                        {...field}
                                        type="password"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="px-4">
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            label={isSubmitting ? "Loading..." : "Next"}
                            secondary
                            onClick={form.handleSubmit(onSubmit)}
                            fullWidth
                        />
                    </div>
                </form>
            </Form>
        </>
    );
}
