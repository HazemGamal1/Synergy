import { NextResponse } from 'next/server';
import User from '../../../../../models/User';
//@ts-expect-error no_explanation
import jwt from 'jsonwebtoken';
//@ts-expect-error no_explanation
import bcrypt from 'bcryptjs';
import { connectDb } from '@/lib/mongoose';

const JWT_SECRET = process.env.JWT_SECRET || '3c7c7d7f7e8f9a1b2c3d4e5f6g7h8i9j';

export async function POST(request: Request) {
    try {
        await connectDb();
        const { username, password } = await request.json();

        const user = await User.findOne({ username })

        if(!user){
            return NextResponse.json({ message: "User not found"}, {status: 404})
        }

        if(username !== user.username){
            return NextResponse.json({ message: "Username is incorrect"}, {status: 400})
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            return NextResponse.json({ message: "Password is incorrect"}, {status: 400})
        }
        
        const payload  = {
            userId: user._id,
            email: user.email,
            username: user.username,
            name: user.name
        }
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '12h' })
        
        return NextResponse.json(
            { message: 'Login successful' },
            {
                headers: {
                    'Set-Cookie': `token=${token}; HttpOnly; Secure; Path=/; Max-Age=3600`,
                },
            }
        );

    } catch (error) {
        return NextResponse.json({ message: `Error signing in user -> error : ${error} `}, { status: 500 });
    }
}
