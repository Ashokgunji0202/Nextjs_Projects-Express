import { NextResponse } from "next/server";


export async function GET(req:Request) {
    return NextResponse.json({message:"Hello Carts Items Controller"},{status:200});
}   