import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const jwtToken = request.cookies.get("token");
  const token = jwtToken?.value;

  if (!token) {
    if (request.nextUrl.pathname.startsWith("/api/users/profile"))
      return NextResponse.json(
        { message: "No token provided, access denied" },
        { status: 401 }
      );
  }else {
    if(request.nextUrl.pathname === '/login' || request.nextUrl.pathname === "/register")
    {
      return NextResponse.redirect(new URL('/',request.url))
    }
  }

  // لو فيه توكن خليه يكمل
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/users/profile/:path*", "/login", "/register"],
};
