// src/app/api/students/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, context: { params: { id: string } }) {
    const { id } = context.params;
  
    try {
      const student = await prisma.student.findUniqueOrThrow({
        where: { id: parseInt(id) },
      });
  
      return NextResponse.json(
        {
          success: true,
          message: "Student found successfully",
          student,
        },
        { status: 200 }
      );
    } catch (error: any) {
      return NextResponse.json(
        { error: "Something went wrong", message: error.message },
        { status: 500 }
      );
    }
  }
  

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await req.json();

    const updatedStudent = await prisma.student.update({
      where: { id },
      data: {
        ...body,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Student updated successfully",
        student: updatedStudent,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Something went wrong", message: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    await prisma.student.delete({
      where: { id },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Student deleted successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Something went wrong", message: error.message },
      { status: 500 }
    );
  }
}
