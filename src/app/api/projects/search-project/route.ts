import { NextRequest, NextResponse } from "next/server";
import Project from "../../../../../models/Project";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || '';
    console.log(query);

    try{
        const results = await Project.find({
            title: { $regex: query, $options: 'i' }, 
        });
        if(results){
            return NextResponse.json(results, { status: 200 })
        }else{
            return NextResponse.json({ message: "No projects found"}, { status: 404});
        }
    }catch(error){
        console.log(error);
        return NextResponse.json({ message: `Internal server error => ${error}`}, { status: 500 });
    }
}