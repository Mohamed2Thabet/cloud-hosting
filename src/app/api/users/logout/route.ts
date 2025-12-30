import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

/**
 * @method GET
 * @description Logout user by clearing the token cookie
 * @route /api/users/logout
 * @access Public
 */
export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token) {
      return NextResponse.json(
        { message: "Token not found" },
        { status: 404 }
      );
    }

    cookieStore.delete("token");

    return NextResponse.json(
      { message: "Logout successful" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
