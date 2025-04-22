// src/app/api/students/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { deleteStudent, getStudentById, updateStudent } from "@/actions/student/student";
import { handleApiError } from "@/lib/utils/handleApiError";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  try {
    const id = parseInt(context.params.id);
    const student = await getStudentById(id);

    return NextResponse.json({ success: true, student }, { status: 200 });
  } catch (error) {
    return handleApiError(error);
  }
}
  

export async function PUT(req: NextRequest,{ params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    const body = await req.json();
    const updatedStudent = await updateStudent(id, body);
    return NextResponse.json(
      {success: true,message: "Student updated successfully", student: updatedStudent,},{ status: 200 }
    );
  } catch (error: any) {
    return handleApiError(error)
}
}

export async function DELETE(req: NextRequest,{ params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    const studentDeleteById=await deleteStudent(id);
    return NextResponse.json(
      {success: true,message: "Student deleted successfully",},{ status: 200 }
    );
  } catch (error: any) {
    return handleApiError(error);
  }
}
