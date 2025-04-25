import { NextRequest, NextResponse } from "next/server";
import { comments } from "../data";



export async function PUT(req:NextRequest,{params}:{params:{id:string}},res:NextResponse) {

    const id = params.id;
    const ccc=comments.filter((comment) => comment.id !== parseInt(id));
    return NextResponse.json({success: true, message: "Comment deleted successfully",data:ccc},{ status: 200 });
    
}
