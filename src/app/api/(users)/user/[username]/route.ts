// /app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '@/lib/mongoose';
import User from '../../../../../../models/User';

export async function GET(req: NextRequest, { params } : { params : { username: string }}) {
    try {
        await connectDb();
        const { username } = await params
        const user = await User.findOne({ username });
        if(!user){
            return NextResponse.json({ message: "User was not found."}, { status: 404 });
        }
        return NextResponse.json(user._doc, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: `Error fetching users -> error :${error}` }, { status: 500 });
    }
}
