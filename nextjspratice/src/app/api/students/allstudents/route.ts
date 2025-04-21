import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
        try {
            const students = await prisma.student.findMany();
            return NextResponse.json(students, { status: 200 });
        } catch (error: any) {
            return NextResponse.json({ error: "Something went wrong", message: error.message }, { status: 500 });
        }
    }