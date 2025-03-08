import { connectDb } from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import ProjectIdea from "../../../../../models/ProjectIdea";

export async function GET(request: NextRequest){
    try{
        await connectDb();
        const ideas = await ProjectIdea.find();
        
        if(!ideas){
            return NextResponse.json({ message: "No project ideas found."}, { status: 404 });
        }

        return NextResponse.json(ideas,  { status: 200 });
    }catch(error){
        return NextResponse.json({ message: `Internal server error: ${error}`}, { status: 500 });
    }
}