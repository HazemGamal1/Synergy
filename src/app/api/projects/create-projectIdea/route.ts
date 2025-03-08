import { NextRequest, NextResponse } from "next/server";
//@ts-expect-error no_explanation
import jwt from "jsonwebtoken"
import ProjectIdea from "./../../../../../models/ProjectIdea";
import { IComment } from "../../../../../models/Project";

export async function POST(request: NextRequest){
    try{
        const { title, description } = await request.json();
        
        if(!title || !description || title === "" || description === ""){
            return NextResponse.json({ message: "Please make sure both title and description fields are filled"}, { status: 401 });
        }

        const token = request.cookies.get('token')?.value;
        if(!token){
            return NextResponse.json({ message: "Token not found"}, { status: 401})
        }
        const secretKey = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, secretKey);

        const comments : IComment[] = [];
        const likes = 0;
        const newProjectIdea = new ProjectIdea({
            ownerId: decoded.userId,
            title,
            description,
            comments,
            likes
        })

        await newProjectIdea.save();

        return NextResponse.json({ message: "New project Idea saved successfully"}, { status: 200})

    }catch(error){
        return NextResponse.json({ message: `Internal server error ${error}`}, { status: 500 });
    }
}