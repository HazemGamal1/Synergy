import { NextRequest, NextResponse } from "next/server";
//@ts-ignore
import jwt from "jsonwebtoken"
import Project from "../../../../../models/Project";

export async function GET(request: NextRequest){
    try{
        const token = request.cookies.get('token')?.value;
        if(!token){
            return NextResponse.json({ message: "Token not found"}, { status: 401})
        }
        const secretKey = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, secretKey);

        const projects = await Project.find({ ownerId: decoded.userId})
        
        return NextResponse.json( projects, { status: 200 });
    }catch(error){
        return NextResponse.json({ message: `Internal server error ${error}`}, { status: 500 });
    }
}