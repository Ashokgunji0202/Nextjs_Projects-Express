import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{params}:{params:{productMatching:string,quantity:string}},res:NextResponse) {
    try{
        const { productMatching,quantity } = params;
        const prodId = parseInt(productMatching);
        const quant = parseInt(quantity);
        const product = await prisma.product.findUnique({ where: { id:prodId } }); 
        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 }); 
        }
        const updatedProduct = await prisma.product.update({ where: { id:prodId }, data: { quantity: product.quantity - quant } });
        return NextResponse.json({ message: "Quantity updated", product: updatedProduct }, { status: 200 }); 
    }catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 }); 
    }   
}