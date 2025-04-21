import { BadRequestException } from "@/exceptions/BadRequestException";
import { InternalServerException } from "@/exceptions/InternalServerException";
import { NotFoundException } from "@/exceptions/NotFoundException";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export const handleError = (error: any) => {
  // messages: error.errors.map((issue) => issue.message)
    
    if(error instanceof ZodError){
      return NextResponse.json({
        error: "Bad Request",
        issues: error.errors.map((issue) => ({
          path: issue.path.join("."), 
          message: issue.message,
        })),
      },
      { status: 400 })
    }
    if (error instanceof BadRequestException) {
      return NextResponse.json(
        { error: "Bad Request", message: error.message },
        { status: 400 }
      );
    }
  
    if (error instanceof NotFoundException) {
      return NextResponse.json(
        { error: "Not Found", message: error.message },
        { status: 404 }
      );
    }
  
    if (error instanceof InternalServerException) {
      return NextResponse.json(
        { error: "Internal Server Error", message: error.message },
        { status: 500 }
      );
    }
  
    // Fallback error for unhandled exceptions
    return NextResponse.json(
      { error: "Internal Server Error", message: "An unexpected error occurred." },
      { status: 500 }
    );
  };

function Recoard<T>(error: any) {
  throw new Error("Function not implemented.");
}
