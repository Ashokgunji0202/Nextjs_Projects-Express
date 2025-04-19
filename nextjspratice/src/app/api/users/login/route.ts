import { NextRequest,NextResponse } from "next/server";
import { PrismaClient} from "@prisma/client";
import bcrypt from "bcrypt"; 
import jwt from "jsonwebtoken";
//Prisma Calling
const prisma = new PrismaClient();

export async function POST(req:NextRequest,res:NextResponse):Promise<NextResponse> {
    try{
        const reqBody =await req.json();
        const {email,password}=reqBody;  
        console.log("reqBody",reqBody);  

        const user = await prisma.user.findFirst({
            where:{email}
        });  
         
        if(!user){
            return NextResponse.json({error:"User not found"},{status:400});
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return NextResponse.json({success:"false",error:"Invalid credentials"},{status:400});
        }
        // create Token data
        const tokenData = {id:user.id,email:user.email};

        //create token
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET || "secret", {expiresIn: "1h",});
          
        const response=NextResponse.json({success:"Login successful",user:user,token:token},{status:200});
        response.cookies.set("token",token,{
            httpOnly:true
        });

        return response;

    }catch(error:any){
        return NextResponse.json({error:"Something went wrong",message:error.message},{status:500});
    }

}
