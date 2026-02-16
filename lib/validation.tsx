import * as z from "zod";

const registerStep1 = z.object({
    email: z.string().email(),
    name: z.string().min(3),
});

const registerStep2 = z.object({
    password: z.string().min(6),
    username: z.string().min(3),
});

const loginForm = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

const editForm = z.object({
    bio: z.string().min(5),
    name: z.string().min(3),
    location: z.string(),
    username: z.string(),
});

export { registerStep1, registerStep2, loginForm, editForm };
