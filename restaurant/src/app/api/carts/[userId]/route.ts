import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import prisma from "@/lib/prisma"; 
import { CreateCartSchema } from "@/validation/cart.valid"; 

export async function POST(req: NextRequest, { params }: { params: { userId: string } }) {
  try {
    const reqBody = await req.json();
    const validatedData = CreateCartSchema.parse(reqBody);

    const userId = parseInt(params.userId);

    // 1. Check if product exists
    await prisma.product.findFirstOrThrow({
      where: { id: validatedData.productId },
    });

    // 2. Check if cart item already exists (using unique constraint)
    const existingCartItem = await prisma.cartItem.findFirst({
        where: {
          userId,
          productId: validatedData.productId,
        },
      });

    if (existingCartItem) {
      // 3. Update quantity if it exists
      await prisma.cartItem.update({
        where: {
          id: existingCartItem.id,
        },
        data: {
          quantity: validatedData.quantity,
        },
      });

      return NextResponse.json(
        { success: true, message: "Quantity updated" },
        { status: 200 }
      );
    } else {
      // 4. Otherwise create new cart item
      await prisma.cartItem.create({
        data: {
          userId: userId,
          productId: validatedData.productId,
          quantity: validatedData.quantity,
        },
      });

      return NextResponse.json(
        { success: true, message: "Item added to cart" },
        { status: 200 }
      );
    }
  } catch (error: any) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.errors },
        { status: 400 }
      );
    }
    console.error("Error adding to cart:", error.message);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}



export async function GET(req: NextRequest,{params}:{params:{userId:string}},res:NextResponse) {
    try {
        const userId = parseInt(params.userId);
        const cartItems = await prisma.cartItem.findMany({
            where: {
                userId: userId,
            },
            include: {
                product: {
                    select: {
                        id: true,
                        name: true,
                        price: true,
                        description: true,
                    },
                },
            },
        });

        if (cartItems.length === 0) {
            return NextResponse.json({ error: "No items in the cart" }, { status: 404 });
        }

        return NextResponse.json({ message: "Cart items found", cartItems: cartItems }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}

