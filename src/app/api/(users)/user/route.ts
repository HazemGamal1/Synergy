// /app/api/users/route.ts
import { NextResponse } from 'next/server';
import { connectDb } from '@/lib/mongoose';
import User from '../../../../../models/User';

export async function GET(req: Request) {
    try {
        await connectDb();
        const { searchParams } = new URL(req.url);
        const username = searchParams.get("username");
        const user = await User.findOne({ username });
        if(!user){
            return NextResponse.json({ message: "User was not found."}, { status: 404 });
        }
        return NextResponse.json(user._doc, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: `Error fetching users -> error :${error}` }, { status: 500 });
    }
}
