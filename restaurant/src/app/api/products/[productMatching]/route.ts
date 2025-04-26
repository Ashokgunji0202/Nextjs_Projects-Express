import prisma from "@/lib/prisma";  
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{params}:{params:{productMatching:string}},res:NextResponse) {
    try{
        const { productMatching } = params;
        const prodId = parseInt(productMatching);
        const product = await prisma.product.findUnique({ where: { id:prodId } }); 
        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 }); 
        }
        return NextResponse.json({ message: "Product found", product: product }, { status: 200 }); 
    }catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 }); 
    }
}

export async function PUT(req:NextRequest,{params}:{params:{productMatching:string}},res:NextResponse) {
    try{
        const { productMatching } = params;
        const prodId = parseInt(productMatching);
        const reqBody = await req.json();
        const product = await prisma.product.update({ where: { id:prodId }, data: reqBody }); 
        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 }); 
        }
        return NextResponse.json({ message: "Product updated", product: product }, { status: 200 }); 
    }catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 }); 
    }
}

export async function DELETE(req:NextRequest,{params}:{params:{productMatching:string}},res:NextResponse) {
    try{
        const { productMatching } = params;
        const prodId = parseInt(productMatching);
        const product = await prisma.product.delete({ where: { id:prodId } }); 
        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 }); 
        }
        return NextResponse.json({ message: "Product deleted", product: product }, { status: 200 }); 
    }catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 }); 
    }
}