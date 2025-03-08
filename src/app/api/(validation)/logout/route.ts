    import { NextResponse } from "next/server";

    export async function GET() {
        return NextResponse.json({message: "Logged out successfully"}, {
            headers: {
                'Set-Cookie': `token=; HttpOnly; Secure; Path=/; MaxAge=0`,
            },
        });
    }