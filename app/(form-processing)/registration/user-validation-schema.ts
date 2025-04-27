import {z} from "zod"

//Place rules on captured form data using z.object() from Zod package
export const registrationSchema = z.object({
    email: z.string().email({message: "Email may be missing an '@' or 'something.com', please enter a valid email address!"}).trim(),
    password: z.string().min(8, {message: "The password must be at least 8 characters long!"})
    .regex(/[a-zA-Z]/, {message: "Password must contain at least one letter!"})
    .regex(/[0-9]/, {message: "Password must contain at least one number!"})
    .regex(/[^a-zA-Z0-9]/, {message:"Password must contain at least one special character!"})
    .trim(),
    confirmPassword: z.string().trim(),
}).superRefine((val, ctx) => {
    if(val.password !== val.confirmPassword) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Password fields do not match, they must match!",
            path: ["confirmPassword"],
        })
    }
})

export type registerState = {
    form?: {
        email?: string,
        password?: string,
        confirmPassword?: string
    }

    errors?:{
        email?: string[],
        password?:string[],
        confirmPassword?:string[]
    }
}