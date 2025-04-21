// app/api/students/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { createStudent } from "@/actions/student/student";
import { handleError } from "@/lib/utils/errorHandler";
import { studentSchema } from "@/validation/student";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
      const student = await req.json();
      studentSchema.parse(student);
      const newStudent = await createStudent(student);
      return NextResponse.json(
        {
          success: true,
          message: "Student created successfully",
          student: newStudent,
        },
        { status: 201 }
      );
    } catch (error: any) {
      return handleError(error);
    }
  }
