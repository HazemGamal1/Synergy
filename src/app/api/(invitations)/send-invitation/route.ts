import { connectDb } from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
//@ts-expect-error no_explanation
import jwt from "jsonwebtoken"
import Invitation from "../../../../../models/Invitation";

export async function POST(request: NextRequest){
    try{ 
        await connectDb();
        const { inviteeId, type, project, projectName, position, inviteeUsername} = await request.json();
        const token = request.cookies.get('token')?.value;
        if(!token){
            return NextResponse.json({ message: "Token not found"}, { status: 401})
        }
        const secretKey = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, secretKey);

        const invitation = new Invitation({
            inviter: decoded.userId,
            invitee: inviteeId,
            project: project,
            type: type,
            inviterUsername: decoded.username,
            inviteeUsername,
            projectName,
            position,
            createdDate: Date.now(),
            updatedAt: Date.now()
        });

        await invitation.save();
        return NextResponse.json({ message: `Invitation sent`} , { status: 200 });
    }catch(error){
        console.log(error)
        return NextResponse.json({ message: `internal server error ${error}`} , { status: 500 });
    }
}