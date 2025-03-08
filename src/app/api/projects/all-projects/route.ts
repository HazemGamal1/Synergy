import { connectDb } from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import Project from "../../../../../models/Project";

export async function GET(req: NextRequest){
    try{
        await connectDb();

        const projects = await Project.find();

        return NextResponse.json(projects, { status: 200 })
    }catch(error){
        return NextResponse.json({ message: `Internal server error : ${error}` }, { status: 500 })
    }
}