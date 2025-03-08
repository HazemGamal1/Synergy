import { NextRequest, NextResponse } from "next/server";
import Project from "../../../../../../models/Project";


export async function GET(request: NextRequest, { params }: { params: { userId : string }}){
    try{
        const { userId } = await params;
        const projects = await Project.find({ ownerId: userId})
        
        return NextResponse.json( projects, { status: 200 });
    }catch(error){
        return NextResponse.json( { messaage: `Internal server error ${error}`}, { status: 500 });
    }
}