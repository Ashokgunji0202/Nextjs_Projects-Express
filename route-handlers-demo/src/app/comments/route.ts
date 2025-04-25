
import {NextRequest } from "next/server";
import { comments } from "./data";


export async function GET(req:NextRequest) {

    const searchparams=req.nextUrl.searchParams;
    const quary=searchparams.get("quary");
    const filteredComments=quary?comments.filter((comment) => comment.text.includes(quary)):comments;

    return Response.json(filteredComments);
}

export async function POST(req: Request) {
    const body = await req.json();
    comments.push(body);
    return new Response(JSON.stringify(comments),{status:201});
}