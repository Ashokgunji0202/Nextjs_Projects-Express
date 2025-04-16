import { Request, Response } from "express";
import { AddressSchema } from "../schema/users";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCodes } from "../exceptions/root";
import { User } from "@prisma/client";
import { prisma } from "..";



export const addAddress = async (req: Request, res: Response) => {
    AddressSchema.parse(req.body);

    const address=await prisma.address.create({
        data:{
            ...req.body,
            userId:req.user?.id
        }
    })
    res.json(address);
}

export const deleteAddress = async (req: Request, res: Response) => {
    try{
        await prisma.address.delete({
            where:{
                id:+req.params.id
            }});
        res.json({success:true,message:"Address deleted"});

    }catch(error){    
         throw new NotFoundException("Address not found",ErrorCodes.ADDRESS_NOT_FOUND);
    }
}

export const listAddress = async (req: Request, res: Response) => {
    try{
        const address=await prisma.address.findMany({
            where:{
                userId:req.user?.id
            }});
        res.json(address);
    }catch(error){    
         throw new NotFoundException("Address not found",ErrorCodes.ADDRESS_NOT_FOUND);
    }
}
// export const updateUser = async (req: Request, res: Response) => {
   
// }
