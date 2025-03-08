import { connectDb } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import Invitation from "../../../../../../models/Invitation";

export async function GET( { params }: { params : { id: string }}){
    try{
        await connectDb();

        const { id } = await params;
        await Invitation.deleteOne({ _id : id });
        
        return NextResponse.json({ message: "Invitation accepted and paricipant added to project successfully"}, { status: 200 });
    }catch(error){
        console.log(error);
        return NextResponse.json({ message: `Internal server error : ${error}`}, { status: 500});
    }
}