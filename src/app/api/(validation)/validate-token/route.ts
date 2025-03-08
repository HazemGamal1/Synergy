import { NextResponse , NextRequest } from "next/server";
//@ts-expect-error no_explanation
import jwt from "jsonwebtoken"

export function GET(req: NextRequest) {
    const token = req.cookies.get('token')?.value;
    if(!token){
        return NextResponse.json({ message: "Token not found"}, { status: 401})
    }

    try {
        const secretKey = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, secretKey);
        console.log(decoded.userId)
        return NextResponse.json({ valid: true, user: decoded}, { status: 200})
    }catch(error){
        return NextResponse.json({ message: `Invalide token -> error : ${error} ` }, { status: 401})
    }
}