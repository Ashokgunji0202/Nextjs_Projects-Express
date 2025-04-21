// app/api/students/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
      const student = await req.json();
  
      console.log("Received student:", student);
  
      const newStudent = await prisma.student.create({
        data: {
          ...student,
        },
      });
      return NextResponse.json(
        {
          success: true,
          message: "Student created successfully",
          student: newStudent,
        },
        { status: 201 }
      );
    } catch (error: any) {
      return NextResponse.json(
        { error: "Something went wrong", message: error.message },
        { status: 500 }
      );
    }
  }
