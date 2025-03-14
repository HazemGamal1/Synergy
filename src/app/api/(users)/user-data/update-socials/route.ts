import { NextRequest, NextResponse } from "next/server";
//@ts-expect-error no_explanation
import jwt from "jsonwebtoken"
import { connectDb } from "@/lib/mongoose";
import User from "../../../../../../models/User";

export async function POST(req: NextRequest){
    try{
        await connectDb();

        const { github, linkedin, twitter, youtube, website} = await req.json();
        console.log(github)

        const token = req.cookies.get('token')?.value;
        if(!token){
            return NextResponse.json({ message: "Token not found"}, { status: 401})
        }
        const secretKey = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, secretKey);

        const updatedUser = await User.findByIdAndUpdate({_id : decoded.userId}, { github, linkedin, twitter, youtube, website });

        if(!updatedUser){
            return NextResponse.json({ message: "No user was found with this ID"} , { status : 404 });
        }
        
        return NextResponse.json({ message: "User data updated successfully"}, { status: 200 })
    }catch(error){
        console.log(error);
        return NextResponse.json({ error: `Internal server error: ${error}` }, { status: 500 });
    }
}