import { z } from 'zod';
export declare const SignUpInput: z.ZodObject<{
    name: z.ZodString;
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    username: string;
    password: string;
}, {
    name: string;
    username: string;
    password: string;
}>;
export type SignUpInputType = z.infer<typeof SignUpInput>;
export declare const SignInInput: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
export type SignInInputType = z.infer<typeof SignInInput>;
export declare const CreateBlog: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
}, {
    title: string;
    content: string;
}>;
export type CreateBlogType = z.infer<typeof CreateBlog>;
export declare const UpdateBlog: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
}, {
    title: string;
    content: string;
}>;
export type UpdateBlogType = z.infer<typeof UpdateBlog>;
