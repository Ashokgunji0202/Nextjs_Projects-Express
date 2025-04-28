import { z } from "zod";

export const restaurantSchema = z.object({
  id: z.number().optional(),  
  name: z.string().min(1, "Restaurant name is required"),
  description: z.string().min(1, "Description is required"),
  address: z.string().min(1, "Address is required"),
  createdAt: z.date().optional(), 
  items: z.array(z.any()).optional(), 
});
