import { connectDb } from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import Invitation from "../../../../../../models/Invitation";
import Project from "../../../../../../models/Project";

export async function GET(request: NextRequest, { params }: { params : { id: string }}){
    try{
        await connectDb();

        const { id } = await params;
        const inv = await Invitation.findById({_id : id });
        if(!inv){
            return NextResponse.json({ message: "No invitation with this id was found"}, { status: 404});
        }

        let updatedProject;

        if(inv.type === "invitation"){
            updatedProject = await Project.findByIdAndUpdate( inv.project , { $push: { participants: { userId: inv.invitee, username: inv.inviteeUsername, initials: inv.inviteeUsername[0], position: inv.position  }}},  { new : true } );
        }else if(inv.type === "participationRequest"){
            updatedProject = await Project.findByIdAndUpdate( inv.project , { $push: { participants: { userId: inv.inviter, username: inv.inviterUsername, initials: inv.inviterUsername[0], position: inv.position }}},  { new : true } );
        }

        if(!updatedProject){
            return NextResponse.json({ message: "This project was not found"}, { status: 404});
        }

        const res = await Invitation.deleteOne({ _id : id });
        
        return NextResponse.json({ message: "Invitation accepted and paricipant added to project successfully"}, { status: 200 });
    }catch(error){
        console.log(error);
        return NextResponse.json({ message: `Internal server error : ${error}`}, { status: 500});
    }
}