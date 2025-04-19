import { Request, Response } from "express";
import { prisma } from "..";
import { create } from "domain";
import { ErrorCodes } from "../exceptions/root";
import { NotFoundException } from "../exceptions/not-found";

export const createOrder = async (req: Request, res: Response) => {
    return await prisma.$transaction(async (tx) => {
        const cartItems = await tx.cartItem.findMany({
            where: {
                userId: req.user?.id
            },
            include: {
                product: true
            }
        });

        if (cartItems.length === 0) {
            return res.status(404).json({ Status: false, message: "Cart is empty" });
        }

        const price = cartItems.reduce((prv, curr) => {
            return prv + curr.quantity * +curr.product.price;
        }, 0);

        const addressId = req.user?.defaultShippingAddress;
        if (addressId === null || addressId === undefined) {
            return res.status(404).json({ Status: false, message: "Default shipping address not found" });
        }

        const address = await tx.address.findFirst({
            where: {
                id: addressId
            }
        });

        if (address === null || address === undefined) {
            return res.status(404).json({ Status: false, message: "Default shipping address not found" });
        }

        const userId = req.user?.id;
        if (!userId) {
            return res.status(404).json({ Status: false, message: "User not found" });
        }

        const order = await tx.order.create({
            data: {
                userId: userId,
                netAmount: price,
                address: address.formattedAddress,
            }
        });

        await Promise.all(
            cartItems.map((cart) =>
                tx.orderProduct.create({
                    data: {
                        orderId: order.id,
                        productId: cart.productId,
                        quantity: cart.quantity
                    }
                })
            )
        );
        const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

        await tx.orderEvent.create({
            data: {
                orderId: order.id,
                quantity: totalQuantity 
            }
        });

        await tx.cartItem.deleteMany({
            where: {
                userId: userId
            }
        });

        return res.status(201).json({ success: true, orderDetails: order });
    });
};


export const listOrders = async (req: Request, res: Response) => {
    const orders = await prisma.order.findMany({
        where: {
            userId: req.user?.id
        }
    })
    res.json({success: true, ordersUase: orders});
 }

export const cancleOrder = async (req: Request, res: Response) => { 

    //1. wrap it inside transaction
    ///2. check if the user cancelling its own order
    try {
        const order = await prisma.order.update({
            where: {
                id: +req.params.id
            },
            data: {
                status: "CANCELLED"
            }
        })
        await prisma.orderEvent.create({
            data: {
                orderId: order.id,
                quantity: 0,
                status: "CANCELLED"
            }
        })
    } catch (error) {
        throw new NotFoundException("Order not found", ErrorCodes.ORDER_NOT_FOUND);
    }
}

export const getOrderById = async (req: Request, res: Response) => { 
    try {
        const order = await prisma.order.findFirstOrThrow({
            where: {
              id: +req.params.id
            },
            include: {
                OrderProduct: { // This matches model exactly
                    include: {
                        product: {
                            select: {
                                id: true,
                                name: true,
                                price: true,
                                description: true,
                            }
                        }
                    }
                },
                OrderEvent: true
            }
          });

        res.json(order); 
    } catch (error) {
        throw new NotFoundException("Order not found", ErrorCodes.ORDER_NOT_FOUND);
    }
};
