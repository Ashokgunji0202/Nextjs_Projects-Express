import { BadRequestException } from "@/exceptions/BadRequestException";
import { InternalServerException } from "@/exceptions/InternalServerException";
import { NotFoundException } from "@/exceptions/NotFoundException";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export const createStudent = async (studentData: any) => {
  try {
    // Example validation (You can replace this with Zod or any other validation)
    if (!studentData.email || !studentData.name) {
      throw new BadRequestException("Name and Email are required.");
    }

    const existingStudent = await prisma.student.findUnique({
      where: { email: studentData.email },
    });

    if (existingStudent) {
      throw new BadRequestException("Email already exists.");
    }

    return await prisma.student.create({
      data: studentData,
    });
  } catch (error) {
    if (error instanceof BadRequestException) {
      throw error;
    }
    throw new InternalServerException("Something went wrong while creating student.");
  }
};

export const getStudentById = async (id: number) => {
  try {
    const student = await prisma.student.findUnique({
      where: { id },
    });

    if (!student) {
      throw new NotFoundException("Student not found.");
    }

    return student;
  } catch (error) {
    if (error instanceof NotFoundException) {
      throw error;
    }
    throw new InternalServerException("Something went wrong while fetching the student.");
  }
};