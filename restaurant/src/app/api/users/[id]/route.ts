
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{params}:{params:{id:string}},res:NextResponse) {
    try{
        const { id } = params;
        const idNumber = parseInt(id);
        const user = await prisma.user.findUnique({ where: {id:idNumber } });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "User found", user: user }, { status: 200 });
    }catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(req:NextRequest,{params}:{params:{id:string}},res:NextResponse) {
    try{
        const id = params.id;
        const idNumber = parseInt(id);
        const reqBody = await req.json();
        const user = await prisma.user.update({ where: { id:idNumber }, data: reqBody });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "User updated", user: user }, { status: 200 });
    }catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }   
}

export async function DELETE(req:NextRequest,{params}:{params:{id:string}},res:NextResponse) {
    try{
        const id = params.id;
        const idNumber = parseInt(id);
        const user = await prisma.user.delete({ where: { id:idNumber } });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "User deleted", user: user }, { status: 200 });
    }catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

