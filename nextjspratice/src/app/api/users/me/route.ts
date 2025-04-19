import { getDataFromToken } from "@/helpers/getDataFromToken";
import { PrismaClient } from "@prisma/client";
import{NextRequest,NextResponse} from 'next/server'

const prisma = new PrismaClient();

export async function GET(req:NextRequest,res:NextResponse) {
    try{
        const userId = await getDataFromToken(req);
        const user = await prisma.user.findUniqueOrThrow({
            where:{
                id:userId
            },
            select:{
                username:true,
                email:true
            }
        })
        return NextResponse.json({sucess:"true",message:"User found successfully",user:user},{status:200})
    }catch(error:any){
        return NextResponse.json({error:"Something went wrong",message:error.message},{status:500});
    }
}

