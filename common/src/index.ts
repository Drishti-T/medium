import { z } from 'zod';

//define SignUpInput ___________________________________________________________
export const SignUpInput = z.object({
    name: z.string(),
    username: z.string().email(),
    password: z.string().min(6),
})

export type SignUpInputType = z.infer<typeof SignUpInput>;

export const SignInInput = z.object({
    username: z.string().email(),
    password: z.string().min(6),
})

export type SignInInputType = z.infer<typeof SignInInput>;


// define create blog  ___________________________________________________________
export const CreateBlog = z.object({    
    title: z.string(),    
    content: z.string(),
}) 

export type CreateBlogType = z.infer<typeof CreateBlog>;


// define Update blog  ___________________________________________________________
export const UpdateBlog = z.object({
    title: z.string(),
    content: z.string(),
})

export type UpdateBlogType = z.infer<typeof UpdateBlog>;


