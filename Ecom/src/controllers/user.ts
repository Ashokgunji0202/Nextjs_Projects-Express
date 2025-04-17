import { Request, Response } from "express";
import { AddressSchema, UpdateUserSchema } from "../schema/users";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCodes } from "../exceptions/root";
import { Address, User } from "@prisma/client";
import { prisma } from "..";



export const addAddress = async (req: Request, res: Response) => {
    AddressSchema.parse(req.body);

    const address = await prisma.address.create({
        data: {
            ...req.body,
            userId: req.user?.id
        }
    })
    res.json(address);
}

export const deleteAddress = async (req: Request, res: Response) => {
    try {
        await prisma.address.delete({
            where: {
                id: +req.params.id
            }
        });
        res.json({ success: true, message: "Address deleted" });

    } catch (error) {
        throw new NotFoundException("Address not found", ErrorCodes.ADDRESS_NOT_FOUND);
    }
}

export const listAddress = async (req: Request, res: Response) => {
    try {
        const address = await prisma.address.findMany({
            where: {
                userId: req.user?.id
            }
        });
        res.json(address);
    } catch (error) {
        throw new NotFoundException("Address not found", ErrorCodes.ADDRESS_NOT_FOUND);
    }
}
export const updateUser = async (req: Request, res: Response) => {
    const validateData = UpdateUserSchema.parse(req.body);
    let shippingAddress: Address;
    let billingAddress: Address;
    if (validateData.defaultShippingAddressId) {
        try {
            shippingAddress = await prisma.address.findFirstOrThrow({
                where: {
                    id: validateData.defaultShippingAddressId
                }
            });
        } catch (err) {
            throw new NotFoundException("Shipping address not found", ErrorCodes.ADDRESS_NOT_FOUND);
        }
        if(shippingAddress.userId !== req.user?.id) {
            throw new NotFoundException("Address not bing to user", ErrorCodes.ADDRESS_DOES_NOT_BELONG);
        }
    }
    if(validateData.defaultBillingAddressId) {
        try {
            billingAddress = await prisma.address.findFirstOrThrow({
                where: {
                    id: validateData.defaultBillingAddressId
                }
            });
            
        } catch (err) {
            throw new NotFoundException("Billing address not found", ErrorCodes.ADDRESS_NOT_FOUND);
        }
        if(billingAddress.userId !== req.user?.id) {
            throw new NotFoundException("Address not bing to user", ErrorCodes.ADDRESS_DOES_NOT_BELONG);
        }
    }
    const updatedUser=await prisma.user.update({
        where: {
            id: req.user?.id
        },
        data: validateData
    });
    res.json({ success: true, message: "User address updated" });


};
