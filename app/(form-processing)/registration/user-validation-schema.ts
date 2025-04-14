import {z} from "zod"

export const registrationSchema = z.object({
    email: z.string().email({message: "Email may be missing an '@' or 'something.com', please enter a valid email address!"}),
    password: z.string().min(8, {message: "The password must be at least 8 characters long!"})
    .regex(/[a-zA-Z]/, {message: "Password must contain at least one letter!"})
    .regex(/[0-9]/, {message: "Password must contain at least one number!"})
    .regex(/[^a-zA-Z0-9]/, {message:"Password must contain at least one special character!"})
    .trim()
})

export type registerState = {
    form?: {
        email?: string,
        password?: string,
    }

    errors?:{
        email?: string[],
        password?:string[]
    }
}