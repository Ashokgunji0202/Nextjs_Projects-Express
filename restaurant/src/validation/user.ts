
import { z } from "zod";

export const userSchema = z.object({ 
    name: z.string().min(3, { message: "Name must be at least 3 characters long" }), 
    email: z.string().email({ message: "Email is required" }).nonempty({ message: "Email is required" }), 
    password: z.string().min(8, { message: "Password must be at least 8 characters long" })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,{ message: "Password must contain at least one lowercase, one uppercase, one number and one special character" }), 
});