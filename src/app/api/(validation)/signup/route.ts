import { NextResponse } from 'next/server';
import User from '../../../../../models/User';
//@ts-expect-error no_explanation
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    try {
        const { name, email, username, password } = await request.json();

        // Check if the user already exists
        const existingUserName = await User.findOne({ username });
        if(existingUserName)
        {
            return NextResponse.json({ message: 'Username already used' }, { status: 404 });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            name,
            email,
            username,
            password : hashedPassword
        });

        // Save the user to the database
        await newUser.save();

        return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: `Error signing in user -> error : ${error} `}, { status: 500 });
    }
}
