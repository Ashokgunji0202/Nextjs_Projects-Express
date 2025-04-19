import { Product } from "@prisma/client";
import { NotFoundException } from "../exceptions/not-found";

import { ErrorCodes } from "../exceptions/root";
import { changeQuantitySchema, CreateCartSchema } from "../schema/cart";
import { prisma } from "..";
import { Request, Response } from "express";
import { me } from "./auth";
import { InternalException } from "../exceptions/internal-exception";


export const addItemToCart = async (req: Request, res: Response) => {

    //check for the existance of the same product in user's cart and alter the quantity as required
    const validateData = CreateCartSchema.parse(req.body);

    try {
        //check if the product exists
        await prisma.product.findFirstOrThrow({
            where: { id: validateData.productId },
        });

        //check if the product already exists in the user's cart
        const existingCartItem = await prisma.cartItem.findFirst({
            where: {
                userId: (req as any).user?.id,
                productId: validateData.productId,
            },
        });

        if (existingCartItem) {
            //if it exists then update the quantity
            await prisma.cartItem.update({
                where: {
                    id: existingCartItem.id,
                },
                data: {
                    quantity: validateData.quantity,
                },
            });

            res.json({
                success: true,
                message: "Quantity updated",
            });
        } else {
            //if it doesn't exist then add it to the cart
            const cartItem = await prisma.cartItem.create({
                data: {
                    userId: (req as any).user?.id,
                    productId: validateData.productId,
                    quantity: validateData.quantity,
                },
            });

            res.json({ success: true, cartItem });
        }
    } catch (error) {
        throw new NotFoundException("Product not found", ErrorCodes.NOT_FOUND);
    }
};

export const deleteItemFromCart = async (req: Request, res: Response) => {
    try {
        // Check if the user is deleting their own cart items
        const cartItem = await prisma.cartItem.findFirst({
            where: {
                userId: req.user?.id,
                id: +req.params.id,
            },
        });
        if (!cartItem) {
            throw new NotFoundException("Item not found", ErrorCodes.NOT_FOUND);
        }
        await prisma.cartItem.delete({
            where: {
                id: cartItem.id,
            },
        });
        res.json({ success: true, message: "Item deleted" });
    } catch (error) {
        if (error instanceof NotFoundException) {
            throw new NotFoundException(error.message, error.errorCode);

        } else {
            throw new InternalException("Something went wrong", error, ErrorCodes.SERVER_ERROR);
        }
    }
};

export const changeQuantity = async (req: Request, res: Response) => {

    const validateData = changeQuantitySchema.parse(req.body);
    try {
        const cartItem = await prisma.cartItem.findFirst({
            where: {
                userId: (req as any).user?.id,
                id: +req.params.id
            }
        });
        if (!cartItem) {
            throw new NotFoundException("Item not found", ErrorCodes.NOT_FOUND);
        }
        await prisma.cartItem.update({
            where: {
                id: cartItem.id
            },
            data: {
                quantity: validateData.quantity
            }
        });
        res.json({ success: true, message: "Quantity updated" });
    } catch (error) {
        if (error instanceof NotFoundException) {
            throw new NotFoundException(error.message, error.errorCode);
        } else {
            throw new InternalException("Something went wrong", error, ErrorCodes.SERVER_ERROR);
        }
    }

}

export const getCart = async (req: Request, res: Response) => {
    try {
        const cartItems = await prisma.cartItem.findMany({
            where: {
                userId: req.user?.id
            },
            include: {
                product: {                   // Including the product details
                    select: {                // fetching the required Fields
                        id: true,
                        name: true,
                        price: true,
                        description: true,
                    }
                }
            }
        });
        if (cartItems.length === 0) {
            throw new NotFoundException("No items in the cart", ErrorCodes.NOT_FOUND);
        }
        res.json(cartItems);
    } catch (error) {
        if (error instanceof NotFoundException) {
            throw new NotFoundException("No items in the cart", ErrorCodes.NOT_FOUND);
        } else {
            throw new InternalException("Something went wrong", error, ErrorCodes.SERVER_ERROR);
        }
    }
}
