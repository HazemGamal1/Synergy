import { NextResponse } from "next/server";
import Project from "../../../../../models/Project";

export async function GET(request: Request){
    try{
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");
        const projects = await Project.find({ ownerId: userId})
        
        return NextResponse.json( projects, { status: 200 });
    }catch(error){
        return NextResponse.json( { messaage: `Internal server error ${error}`}, { status: 500 });
    }
}