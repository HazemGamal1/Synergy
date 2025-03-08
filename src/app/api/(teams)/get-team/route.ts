import { NextResponse } from "next/server";
import Team from "../../../../../models/Team";
export async function GET(req: Request){
    try{
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        const team = await Team.findOne( { _id : id })

        if(!team){
            return NextResponse.json({ message: "Team not found"}, { status: 404 });
        }
        return NextResponse.json(team , { status: 200 });
    }catch(error){
        return NextResponse.json({ message: `Internal server error ${error}`}, { status: 500 });
    }
}