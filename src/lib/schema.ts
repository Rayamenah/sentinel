import { z } from "zod";

export const signUpSchema = z.object({
    name: z.string().min(2),
    email: z.email(),
    password: z.string().min(6)
});

export const signInSchema = z.object({
    email: z.email(),
    password: z.string().min(6)
});

export const productSchema = z.object({
    title: z.string().min(1),
    price: z.number().positive(),
    description: z.string().optional(),
    image: z.string().optional(),
    category: z.string().optional()
});
