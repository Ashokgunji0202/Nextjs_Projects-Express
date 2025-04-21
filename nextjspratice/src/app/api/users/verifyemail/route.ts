import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const reqBody = await req.json();
    const { token } = reqBody;
    console.log("token", token);

    const user = await prisma.user.findFirst({
      where: {
        AND: [{ verifyToken: token },{verifyTokenExpiry: {gt: new Date()},},],
      },
    });

    if(!user){
        return NextResponse.json({error:"Invalid token"},{status:400})
    }
    user.isVerified = true;
    user.verifyToken = null;
    user.verifyTokenExpiry = null;


    // update user
    const result = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        isVerified: true,
        verifyToken: null,
        verifyTokenExpiry: null,
      },
    });
    return NextResponse.json({ success: "true", message: "User verified Successfully" });


  } catch (error: any) {
    return NextResponse.json(
      { error: "Something went wrong", message: error.message },
      { status: 500 }
    );
  }
}