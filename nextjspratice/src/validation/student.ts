
import {z} from 'zod'

export const studentSchema = z.object({ 
    name: z.string().min(3, { message: "Name must be at least 3 characters long" }), 
    email: z.string().email(), 
    age: z.number().min(18), 
    branch: z.string().min(3, { message: "Branch must be at least 3 characters long" }),
    isEligible: z.boolean(),
    percentage: z.number().min(0).max(100)
});