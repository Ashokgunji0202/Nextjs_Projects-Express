import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, { params }: { params: { restaurantId: string } }, res: NextResponse) {
    try {
        const { restaurantId } = params;
        const idNumber = parseInt(restaurantId);
        const restaurant = await prisma.restaurant.findUnique({
            where: {
                id: idNumber
            },
            include: {
                products: true
            } as any
        });
        if (!restaurant) {
            return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Restaurant found", restaurant: restaurant }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}
export async function PUT(req: NextRequest, { params }: { params: { restaurantId: string } }, res: NextResponse) {
    try {
        const { restaurantId } = params;
        const idNumber = parseInt(restaurantId);
        const reqBody = await req.json();
        const restaurant = await prisma.restaurant.update({
            where: {
                id: idNumber
            },
            data: reqBody
        });
        if (!restaurant) {
            return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Restaurant updated", restaurant: restaurant }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}
export async function DELETE(req: NextRequest, { params }: { params: { restaurantId: string } }, res: NextResponse) {
    try {
        const { restaurantId } = params;
        const idNumber = parseInt(restaurantId);
        const restaurant = await prisma.restaurant.delete({
            where: {
                id: idNumber
            }
        });
        if (!restaurant) {
            return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Restaurant deleted", restaurant: restaurant }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}   
