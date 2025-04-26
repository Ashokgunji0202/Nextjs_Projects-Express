
import { z } from "zod";

export const productSchema = z.object({ 
    name: z.string().min(3, { message: "Name must be at least 3 characters long" }), 
    description: z.string().min(3, { message: "Description must be at least 3 characters long" }), 
    price: z.number().min(1, { message: "Price must be at least 1" }), 
    category: z.string().min(3, { message: "Category must be at least 3 characters long" }), 
});