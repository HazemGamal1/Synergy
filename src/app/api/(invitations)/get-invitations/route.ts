import { connectDb } from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import Invitation from "../../../../../models/Invitation";
//@ts-ignore
import jwt from "jsonwebtoken"

export async function GET(req: NextRequest){
    try{
        await connectDb();
        const token = req.cookies.get('token')?.value;
        if(!token){
            return NextResponse.json({ message: "Token not found"}, { status: 401})
        }
        const secretKey = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, secretKey);
        const invitations = await Invitation.find({ invitee : decoded.userId});

        
        return NextResponse.json ( invitations, { status: 200 });
        
    }catch(error){
        return NextResponse.json({ message: `Internal server error ${error}`}, { status: 500 });
    }
}