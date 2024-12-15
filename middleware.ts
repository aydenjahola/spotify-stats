import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  // Get the token (check if the user is authenticated)
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  // List of protected paths
  const protectedPaths = ["/dashboard", "/profile", "/api", "/artist"];

  // Check if the current path is in the protected paths list
  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    // If there is no token (user is not logged in), redirect them to the sign-in page
    if (!token) {
      return NextResponse.redirect(new URL("api/auth/signin", req.url));
    }
  }

  // If user is authenticated, or the path is not protected, allow the request to continue
  return NextResponse.next();
}

// Apply the middleware only for certain routes
export const config = {
  matcher: ["/dashboard", "/profile", "/api", "/artist"],
};
