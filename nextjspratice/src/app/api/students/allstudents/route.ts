import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { handleApiError } from "@/lib/utils/handleApiError";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
        try {
            const students = await prisma.student.findMany();
            return NextResponse.json(students, { status: 200 });
        } catch (error: any) {
            return handleApiError(error);
        }
    }