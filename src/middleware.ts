import { NextRequest, NextResponse } from 'next/server'
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
    const token = await getToken({req: request});
    const url = request.nextUrl

    // If user is authenticated and trying to access auth pages, redirect to dashboard
    if(token &&
        (
            url.pathname.startsWith('/signin') ||
            url.pathname.startsWith('/signup') ||
            url.pathname.startsWith('/verify')
        )
    ){
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    // If user is not authenticated and trying to access protected pages, redirect to signin
    if(!token &&
        (
            url.pathname.startsWith('/dashboard')
        )
    ){
        return NextResponse.redirect(new URL('/signin', request.url))
    }

    return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/signin',
    '/signup',
    '/dashboard/:path*',
    '/verify/:path*'
  ],
}