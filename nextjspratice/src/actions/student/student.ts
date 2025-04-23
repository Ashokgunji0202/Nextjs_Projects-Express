
import { BadRequestException, HttpException, NotFoundException } from "@/lib/utils/exception";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export const createStudent = async (studentData: any) => {

    const existingStudent = await prisma.student.findUnique({
      where: { email: studentData.email },
    });

    if (existingStudent) {
      throw new HttpException("Email already exists."
        ,400);
    }

    const studentCreate=await prisma.student.create({data: studentData,});

    return studentCreate;
  
};
export async function getStudentById(id: number) {
  const student = await prisma.student.findUnique({ where: { id } });
  if (!student) {
    throw new HttpException("Student not found",
      404
    );
  }
  return student;
}

export async function updateStudent(id: number, studentData: any) {
  const existingStudent = await prisma.student.findUnique({ where: { id } });
  if (!existingStudent) {
    throw new NotFoundException("Student not found");
  }
  const studentUpdated=await prisma.student.update({ where: { id }, data: studentData })
  return studentUpdated;
}

export async function deleteStudent(id: number) {
  const existingStudent = await prisma.student.findUnique({ where: { id } });
  if (!existingStudent) {
    throw new NotFoundException("Student not found");
  }
  const deletedStudentById = await prisma.student.delete({ where: { id } });
  return deletedStudentById;
}