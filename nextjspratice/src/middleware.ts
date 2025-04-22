import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

    // Using `request.nextUrl.pathname` to get the path of the request
    // Instead of using `request.url` because it includes the query string
    // and we don't want to match the query string in this case
    const path = request.nextUrl.pathname;

    // Check if the user is logged in or not
    const isPublicPath = path === '/login' || path === '/signup' ;

    const token = request.cookies.get('token')?.value || '';

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/profile/:path*",
    "/login",
    "/signup",
    // "/verify/:path*",

  ]
}