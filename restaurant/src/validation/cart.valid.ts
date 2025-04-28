import { z } from "zod";
export const CreateCartSchema = z.object({ 
    userId: z.number(),
    productId: z.number(), 
    quantity: z.number().min(1, { message: "Quantity must be at least 1" }), 
});