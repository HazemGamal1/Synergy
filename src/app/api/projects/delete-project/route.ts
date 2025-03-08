import { connectDb } from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import Project from "../../../../../models/Project";

export async function POST(req: NextRequest){
    try{
        await connectDb();

        const { id } = await req.json()

        await Project.deleteOne( { _id :  id });

        return NextResponse.json({ message: "Project deltedd successfully", status: 200})
    }catch(error){
        return NextResponse.json({ message: `Internal server error : ${error}`, status: 500 });
    }
}