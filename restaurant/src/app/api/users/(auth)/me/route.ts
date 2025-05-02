import { getDataFromToken } from "@/helpers/getDataFromToken";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest,res:NextResponse) {
    try{
        const userId = await getDataFromToken(req);
        const user = await prisma.user.findUniqueOrThrow({
            where:{
                id:userId
            },
            select:{
                id:true,
                name:true,
                email:true
            }
        })
        return NextResponse.json({sucess:"true",message:"User found successfully",user:user},{status:200})
    }catch(error:any){
        return NextResponse.json({error:"Something went wrong",message:error.message},{status:500});
    }
}