import { NextRequest, NextResponse } from "next/server";
import Project from "../../../../../../../models/Project";
import { connectDb } from "@/lib/mongoose";
//@ts-ignore
import jwt from "jsonwebtoken"

export async function POST(request: NextRequest, { params } : { params: { id: string }}){
    try{
        await connectDb();
        const token = request.cookies.get('token')?.value;
        const { id } = await params;
        if(!token){
            return NextResponse.json({ message: "Token not found"}, { status: 401})
        }
        const { comment } = await request.json();
        const secretKey = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, secretKey);
        
        const updatedPost = await Project.findByIdAndUpdate(
            id,
            { $addToSet: { comments : {text: comment, username: decoded.username, user: decoded.userId }} },
            { new: true } // Return the updated document
        );

        return NextResponse.json({ message: `Comment added to ${updatedPost}`} , { status: 200 });
    }catch(error){
        return NextResponse.json({message: `Internal server error: ${error}`} , { status: 500 })
    }
}