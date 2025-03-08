import { connectDb } from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import Project from "../../../../../../../models/Project";
//@ts-expect-error no_explanation
import jwt from "jsonwebtoken"

export async function POST(request : NextRequest, {params} : {params : {id : number }}){
    try{ 
        await connectDb();
        const token = request.cookies.get('token')?.value;
        const { id } = await params;
        if(!token){
            return NextResponse.json({ message: "Token not found"}, { status: 401})
        }
        const secretKey = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, secretKey);
        
        const updatedPost = await Project.findByIdAndUpdate(
            id,
            { $addToSet: { likes: decoded.userId } },
            { new: true } // Return the updated document
          );
        return NextResponse.json({ message: `like added to ${updatedPost}`} , { status: 200 });
    }catch(error){
        console.log(error)
        return NextResponse.json({ message: `internal server error ${error}`} , { status: 500 });
    }
}