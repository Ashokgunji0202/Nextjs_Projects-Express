import prisma from "@/lib/prisma";
import { productSchema } from "@/validation/product.valid";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET() {
    try {
        const products = await prisma.product.findMany();
        return NextResponse.json({ message: "Products found", products: products }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        
        const reqBody = await req.json();
        console.log(reqBody);
        productSchema.parse(reqBody)
        const product = await prisma.product.create({ data: reqBody });
        return NextResponse.json({ message: "Product created successfully", product: product }, { status: 201 });
    } catch (error: any) {
        if(error instanceof ZodError){
             return NextResponse.json({ error: error.errors.map((e) => e) }, { status: 400 });
        }
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}