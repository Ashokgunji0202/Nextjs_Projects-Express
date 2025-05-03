import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req:NextRequest) {
    try{
        const reqBody = await req.json();
        const { email,password,confirmPassword } = reqBody;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        if(password!==confirmPassword){
            return NextResponse.json({ error: "Password and confirm password should be same" }, { status: 400 });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const updatedUser = await prisma.user.update({ where: { email }, data: { password: hashedPassword } });
        return NextResponse.json({success:"Password updated successfully",user:updatedUser.email},{status:200});
        
    }catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
