import prisma from "@/lib/prisma";
import { restaurantSchema } from "@/validation/restaurant.valid";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET() {
   try{

    const restaurants = await prisma.restaurant.findMany();
    return NextResponse.json({ message: "Restaurants found", restaurants: restaurants }, { status: 200 });

   }catch(error:any){

    return NextResponse.json({ error: error.message }, { status: 500 });
   }
}


export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        console.log(reqBody);
        restaurantSchema.parse(reqBody)
        const restaurant = await prisma.restaurant.create({ data: reqBody });
        return NextResponse.json({ message: "Restaurant created successfully", restaurant: restaurant }, { status: 201 });
    } catch (error: any) {
        if(error instanceof ZodError){
             return NextResponse.json({ error: error.errors.map((e) => e) }, { status: 400 });
        }
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}   