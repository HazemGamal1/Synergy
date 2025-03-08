import { NextRequest, NextResponse } from 'next/server';
import Project, { IComment, IProject } from '../../../../../models/Project';
import { IUser } from '../../../../../models/User';
import { connectDb } from '@/lib/mongoose';
//@ts-expect-error no_explanation
import jwt from "jsonwebtoken"

export async function POST(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

    try {
        await connectDb();

        const secretKey = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, secretKey) as { userId: string, email: string, username: string, name : string}

        const { userId, username, name } = decoded;

        const { title,
            shortDescription,
            detailedDescription,
            requiredSkills,
            estimatedCompletion,
            whatsAppLink,
            githubRepo,
            discordLink,
            isPublic,
            createdDate,
            participants
        } = await request.json();

        const comments : IComment[] = []
        const likes : IUser[] = []
        const relatedProjects : IProject[] = []

        const newProject = new Project({
            title,
            ownerId: userId,
            ownerUsername: username,
            ownerName: name,
            shortDescription,
            detailedDescription,
            requiredSkills,
            estimatedCompletion,
            whatsAppLink,
            discordLink,
            githubRepo,
            isPublic,
            createdDate,
            likes,
            comments,
            relatedProjects,
            participants
        });

        await newProject.save();

        return NextResponse.json({ message: 'Project post created successfully' }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}
