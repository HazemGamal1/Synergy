import { connectDb } from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
//@ts-ignore
import jwt from "jsonwebtoken"
import Team from "../../../../../models/Team";

export async function GET(req: NextRequest){
    try{
        await connectDb();
        const token = req.cookies.get('token')?.value;
        if(!token){
            return NextResponse.json({ message: "Token not found"}, { status: 401})
        }
        const secretKey = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, secretKey);
        
        const teams = await Team.find( { members: { $elemMatch: { userId: decoded.userId} } });
        
        return NextResponse.json(teams, { status: 200 });
    }catch(error){
        return NextResponse.json({ message: `Internal server error ${error}`}, { status: 500 });
    }
}