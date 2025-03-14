import { connectDb } from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import User from "../../../../../../models/User";
//@ts-expect-error no_explanation
import jwt from "jsonwebtoken"

export async function POST(req : NextRequest){
    try{
        await connectDb();

        const { selectedSkills  } = await req.json();

        const token = req.cookies.get('token')?.value;
        if(!token){
            return NextResponse.json({ message: "Token not found"}, { status: 401})
        }
        const secretKey = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, secretKey);

        if(!decoded.userId){
            return NextResponse.json({ message: "User ID is needed to perform action"}, { status: 400 });
        }
        const updatedUser = await User.findByIdAndUpdate({ _id : decoded.userId } , { $push: {skills: { $each : selectedSkills }} });
        
        if(!updatedUser){
            return NextResponse.json({ message: "No user was found with this ID"} , { status : 404 });
        }
        return NextResponse.json({ message: "Skills updated successfully" }, { status: 200 });
    }catch(error){
        console.log(error);
        return NextResponse.json({ message: `Internal server error: ${error}`}, { status: 500 });
    }
}