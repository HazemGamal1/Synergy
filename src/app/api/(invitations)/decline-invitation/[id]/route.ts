import { connectDb } from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import Invitation from "../../../../../../models/Invitation";
import Project from "../../../../../../models/Project";

export async function GET(request: NextRequest, { params }: { params : { id: string }}){
    try{
        await connectDb();

        const { id } = await params;
        const res = await Invitation.deleteOne({ _id : id });
        
        return NextResponse.json({ message: "Invitation accepted and paricipant added to project successfully"}, { status: 200 });
    }catch(error){
        console.log(error);
        return NextResponse.json({ message: `Internal server error : ${error}`}, { status: 500});
    }
}