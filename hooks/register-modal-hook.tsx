"use client";

import z from "zod";
import useRegisterSchema from "@/lib/register-schema";
import Modal from "@/ui/modal-dialog";
import { Dispatch, SetStateAction, useState } from "react";
import { registerStep1, registerStep2 } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
    FormField,
    FormItem,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import Button from "@/ui/button";
import { Input } from "@/components/ui/input";
import useLoginSchema from "@/lib/login-schema";
import axios from "axios";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { signIn } from "next-auth/react";

export default function RegisterModal() {
    const [step, setStep] = useState(1);
    const useRegister = useRegisterSchema();
    const useLogin = useLoginSchema();
    const [data, setData] = useState({ email: "", name: "" });

    const registerToggle = () => {
        useRegister.isClose();
        useLogin.isOpen();
    };

    const body =
        step === 1 ? (
            <RegisterStep1 setData={setData} setStep={setStep} />
        ) : (
            <RegisterStep2 email={data.email} name={data.name} />
        );

    const footer = (
        <div className="flex justify-center">
            <p>
                Already have a?{" "}
                <span
                    className="text-sky-400 cursor-pointer hover:underline"
                    onClick={registerToggle}
                >
                    Account
                </span>
            </p>
        </div>
    );

    return (
        <Modal
            body={body}
            footer={footer}
            isOpen={useRegister.onOpen}
            onClose={useRegister.isClose}
            step={step}
            totalStep={2}
        />
    );
}

function RegisterStep1({
    setData,
    setStep,
}: {
    setData: Dispatch<SetStateAction<{ email: string; name: string }>>;
    setStep: Dispatch<SetStateAction<number>>;
}) {
    const [error, setError] = useState("");
    const form = useForm<z.infer<typeof registerStep1>>({
        resolver: zodResolver(registerStep1),
        defaultValues: {
            email: "",
            name: "",
        },
    });

    async function onSubmit(values: z.infer<typeof registerStep1>) {
        try {
            const { data } = await axios.post(
                "/api/auth/register?step=1",
                values,
            );
            if (data.success) {
                setData(values);
                setStep(2);
            }
        } catch (error: any) {
            const msg =
                error.response.data.message ||
                error.response.data.error ||
                "somthing went wrong. please try again";
            setError(msg);
        }
    }

    const { isSubmitting } = form.formState;

    return (
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
                        <FormItem className="mb-2">
                            <FormControl>
                                <Input placeholder="Email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="mb-5">
                            <FormControl>
                                <Input placeholder="Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    label={isSubmitting ? "Loading..." : "Next"}
                    secondary
                    onClick={form.handleSubmit(onSubmit)}
                    fullWidth
                />
            </form>
        </Form>
    );
}

function RegisterStep2({ email, name }: { name: string; email: string }) {
    const useRegister = useRegisterSchema();
    const [error, setError] = useState("");
    const form = useForm<z.infer<typeof registerStep2>>({
        resolver: zodResolver(registerStep2),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof registerStep2>) {
        try {
            const { data: response } = await axios.post(
                "/api/auth/register?step=2",
                { ...values, email, name },
            );
            if (response.success) {
                useRegister.isClose();
                signIn("credentials", {
                    password: values.password,
                    email,
                });
            }
        } catch (error: any) {
            const msg =
                error.response.data.message ||
                error.response.data.error ||
                "somthing went wrong. please try again";
            setError(msg);
        }
    }

    const { isSubmitting } = form.formState;
    return (
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
                    name="password"
                    render={({ field }) => (
                        <FormItem className="mb-2">
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
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem className="mb-5">
                            <FormControl>
                                <Input placeholder="Username" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    label={isSubmitting ? "Loading..." : "Next"}
                    secondary
                    onClick={form.handleSubmit(onSubmit)}
                    fullWidth
                />
            </form>
        </Form>
    );
}
