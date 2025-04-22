import { NextResponse } from "next/server";
import { HttpException } from "./exception";
import { ZodError } from "zod";


export function handleApiError(error: unknown) {
  if (error instanceof HttpException) {
    return NextResponse.json({ error: error.name, message: error.message },{ status: error.statusCode });
  }
  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        error: "ValidationError",
        message: error.errors.map((e) => ({
          path: e.path.join("."),
          message: e.message
        }))
      },
      { status: 400 }
    );
  }
  
  return NextResponse.json(
    { error: "InternalServerError", message: "Something went wrong." },
    { status: 500 }
  );
}
