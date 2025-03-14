import { NextResponse } from "next/server";
import User from "../../../../../models/User";
import { connectDb } from "@/lib/mongoose";

export async function GET(){
    try{
        await connectDb();
        const users = await User.find();

        return NextResponse.json(users, { status: 200 });
    }catch(error){
        return NextResponse.json({ message: `Internal server error -> ${error}`}, { status: 500 });
    }
}