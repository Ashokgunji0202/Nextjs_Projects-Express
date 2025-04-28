
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req:Request) {
    try{
        const reqBody = await req.json();
        const { email, password } = reqBody;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: "Invalid password" }, { status: 404 });
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "secret");
        const response=NextResponse.json({success:"Login successful",user:user,token:token},{status:200});
        response.cookies.set("token",token,{
            httpOnly:true
        });
        return response;
    }catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}