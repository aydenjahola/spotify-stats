import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  // Get the session information (to check if user is authenticated)
  const session = await getServerSession(authOptions);

  // List of paths to protect
  const protectedPaths = ["/dashboard", "/profile", "/api/*", "/artist/*"];

  // Check if the current path is in the protected paths list
  if (protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
    // If there is no session (user is not logged in), redirect them to the sign-in page
    if (!session) {
      return NextResponse.redirect(new URL("api/auth/signin", req.url));
    }
  }

  // If user is authenticated, or the path is not protected, allow the request to continue
  return NextResponse.next();
}

// apply the middleware only for certain routes
export const config = {
  matcher: ["/dashboard", "/profile", "/api", "/artist"],
};
