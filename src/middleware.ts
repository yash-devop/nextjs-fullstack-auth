import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;  //or we can do : window.location.pathname
    const isPublicPath = path === '/login' || path ==='/signup'

    const token = request.cookies.get("token")?.value || ""  //accessing the token from cookies.
    // console.log("middlewareToken",token)

    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/',request.nextUrl))  
    }
    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/login',request.nextUrl))  
    }

}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/','/profile/:id*','/login','/signup']  // this are the routes where the middlewares are applied.
}