import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Add paths that don't require authentication
const publicPaths = ["/auth"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the path is public
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));
  
  // Get the token from the Authorization header
  const token = request.headers.get("Authorization")?.replace("Bearer ", "") || 
                request.cookies.get("token")?.value;
  
  // Redirect to login if accessing a protected route without a token
  if (!isPublicPath && !token) {
    const loginUrl = new URL("/auth", request.url);
    return NextResponse.redirect(loginUrl);
  }
  
  // Redirect to main app if accessing auth pages with a valid token
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public).*)"],
};