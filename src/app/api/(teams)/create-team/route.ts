import { connectDb } from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
//@ts-ignore
import jwt from "jsonwebtoken"
import Team from "../../../../../models/Team";

export async function POST(req: NextRequest){
    try {
        await connectDb();
        const token = req.cookies.get('token')?.value;
        if(!token){
            return NextResponse.json({ message: "Token not found"}, { status: 401})
        }
        const secretKey = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, secretKey);
        const { title, description, members } = await req.json();

        const plusUserMem = [{ userId: decoded.userId, username: decoded.username, initials: decoded.username[0] + decoded.username[1]}, ...members]

        const team = new Team({
            title, 
            description,
            members: plusUserMem
        })

        await team.save();

        return NextResponse.json({ message: `New team created`}, { status: 200 });
    }catch(error){
        return NextResponse.json({ message: `Internal server error : ${error}`}, { status: 500 });
    }
}