import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  const jwtToken = request.cookies.get("token");
  const token = jwtToken?.value;
  const { pathname } = request.nextUrl;

  // No token
  if (!token) {
    // Protected API route
    if (pathname.startsWith("/api/users/profile")) {
      return NextResponse.json(
        { message: "No token provided, access denied" },
        { status: 401 }
      );
    }

    // Admin pages
    if (pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Token exists
  if (token) {
    // Prevent access to login and register pages
    if (pathname === "/login" || pathname === "/register") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Admin authorization check
    if (pathname.startsWith("/admin")) {
      try {
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET!
        ) as { isAdmin: boolean };
        console.log(decoded);
        if (!decoded.isAdmin) {
          return NextResponse.redirect(new URL("/", request.url));
        }
      } catch {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/users/profile/:path*",
    "/login",
    "/register",
    "/admin/:path*",
  ],
};
