// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value;
    console.log(token)
  if (!token) {
    // Redirect to login if no token is found
    return NextResponse.redirect(`${req.nextUrl.origin}/signin`);
  }

  try {
    // Redirect to the validation API route to verify the token
    const validateResponse = await fetch(new URL('/api/validate-token', req.url), {
      headers: { Cookie: `token=${token}` },
    });

    if (validateResponse.ok) {
      // Token is valid, proceed to the requested page
      return NextResponse.next();
    }

    // Redirect to login if token is invalid
    return NextResponse.redirect(`${req.nextUrl.origin}/signin`);
  } catch (error) {
    // Redirect to login in case of errors
    return NextResponse.redirect(`${req.nextUrl.origin}/signin`);
  }
}

export const config = {
  matcher: ['/profile', '/post-project', '/team', '/invitations', '/teams', '/skills'], // Paths to apply middleware
};
