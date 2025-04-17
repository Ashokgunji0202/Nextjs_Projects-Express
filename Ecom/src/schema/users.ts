import {z} from "zod";

export const SignUpSchema = z.object({ 
    name: z.string().min(3), 
    email: z.string().email(), 
    password: z.string().min(8), 
    
}); 

export const loginSchema = z.object({ 
    email: z.string().email(), 
    password: z.string().min(8), 
});


export const AddressSchema=z.object({
    lineOne:z.string(),
    lineTwo:z.string().nullable(),
    pincode:z.string().length(6),
    country:z.string(),
    city:z.string()
})

export const UpdateUserSchema=z.object({
    name:z.string().optional(),
    defaultShippingAddressId:z.number().optional(),
    defaultBillingAddressId:z.number().optional()
})
