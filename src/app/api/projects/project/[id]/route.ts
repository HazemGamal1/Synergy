import { NextResponse } from "next/server";
import Project from "../../../../../../models/Project";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;

        try{

            const project = await Project.findOne({ _id : id });

            if(!project)
            {
                return NextResponse.json({ message: `${id} Project not found`}, { status: 404 });
            }
            return NextResponse.json({ ...project._doc }, { status: 200})
        }catch(error)
        {
            console.error('Error fetching user:', error);
            return NextResponse.json({ message: 'Server error' }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}
