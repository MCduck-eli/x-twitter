"use client";

import Button from "@/ui/button";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import useRegisterSchema from "@/lib/register-schema";
import { useCallback } from "react";
import RegisterModal from "@/hooks/register-modal-hook";
import LoginModal from "@/hooks/login-modal-hook";
import { signIn } from "next-auth/react";
import useLoginSchema from "@/lib/login-schema";

export default function Auth() {
    const useRegister = useRegisterSchema();
    const useLogin = useLoginSchema();

    const registerHendler = useCallback(() => {
        useRegister.isOpen();
    }, [useRegister]);

    const loginHendler = useCallback(() => {
        useLogin.isOpen();
    }, [useLogin]);

    return (
        <div className="grid md:grid-cols-2 grid-cols-1 w-full h-screen md:my-30 my-20 px-5 md:px-0">
            <RegisterModal />
            <LoginModal />
            <div className="w-full flex justify-center items-center relative">
                <Image
                    src={"/x-logo.png"}
                    alt="logo"
                    objectFit="cover"
                    height={450}
                    width={450}
                    className="md:block hidden"
                />
            </div>
            <div className="w-full flex flex-col justify-center">
                <div className="relative mb-5">
                    <Image
                        src={"/x-logo.png"}
                        alt="logo"
                        objectFit="cover"
                        height={50}
                        width={50}
                        className="md:hidden block"
                    />
                </div>
                <h1 className="md:text-7xl text-4xl font-bold text-white">
                    In the know about <br /> what's going on
                </h1>

                <h2 className="md:text-5xl text-3xl text-white font-semibold md:mt-25 mt-10 md:mb-10 mb-5">
                    Join today.
                </h2>
                <div className="md:w-70 ">
                    <div className="flex flex-col gap-2">
                        <Button
                            fullWidth
                            secondary
                            onClick={() => signIn("google")}
                            label={
                                <div className="flex justify-center flex-row gap-1">
                                    <div className="text-2xl">
                                        <FcGoogle />
                                    </div>
                                    Sign up with Google
                                </div>
                            }
                        ></Button>
                        <Button
                            fullWidth
                            secondary
                            onClick={() => signIn("github")}
                            label={
                                <div className="flex justify-center flex-row gap-1">
                                    <div className="text-2xl">
                                        <FaGithub />
                                    </div>
                                    Sign up with Github
                                </div>
                            }
                        ></Button>
                    </div>
                    <div className="flex items-center justify-center py-3">
                        <div className="flex-1 h-0.5 bg-gray-400 opacity-60"></div>
                        <span className="mx-2 text-white text-[15px] font-bold">
                            OR
                        </span>
                        <div className="flex-1 h-0.5 bg-gray-400 opacity-60"></div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <Button
                            fullWidth
                            onClick={registerHendler}
                            secondary
                            label={
                                <div className="flex justify-center flex-row gap-1">
                                    <div className="text-2xl"></div>
                                    Register
                                </div>
                            }
                        ></Button>
                        <p className="text-muted-foreground text-[11px]">
                            By registering, you agree to{" "}
                            <a
                                href="#"
                                className="text-sky-500 hover:underline"
                            >
                                the Terms of Service
                            </a>{" "}
                            and{" "}
                            <a
                                href="#"
                                className="text-sky-500 hover:underline"
                            >
                                Privacy Policy
                            </a>{" "}
                            , as well as the{" "}
                            <a
                                href="#"
                                className="text-sky-500 hover:underline"
                            >
                                Cookie Policy .
                            </a>
                        </p>
                    </div>

                    <h1 className="text-2xl font-semibold mt-10 mb-2 text-white">
                        Already registered?
                    </h1>
                    <div className="flex flex-col gap-2">
                        <Button
                            label={"Login"}
                            onClick={loginHendler}
                            fullWidth
                            outline
                            classNames="border-2 border-neutral-700"
                        ></Button>
                        <Button
                            label={"Access Grok"}
                            fullWidth
                            outline
                            classNames="border-2 border-neutral-700"
                        ></Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
