
import prisma from "@/lib/prisma";
import { userSchema } from "@/validation/user";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        userSchema.parse(reqBody)
        const { name, email, password } = reqBody;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword },
        });
        return NextResponse.json({  message: "User created successfully",user: user, },{status:201});        
    } catch (error: any) {
        if(error instanceof ZodError){
             return NextResponse.json({ error: error.errors.map((e) => e) }, { status: 400 });
        }
        return NextResponse.json({ error: error.message }, { status: 500 }); 
    }
}