import {cookies} from "next/headers"

export type jwtPlayload = {
  userId: number;
  email: string;
  username: string;
  isAdmin: boolean;
};
import { serialize } from "cookie";
import jwt from "jsonwebtoken";
// Generate JWT Token
export function generateToken(payload: jwtPlayload): string {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });
}

// set cookie with token
export function setTokenCookie(jwtPlayload: jwtPlayload) {
  const token = generateToken(jwtPlayload);
  return serialize("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // development = http, production = https
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
}

// Get token from cookies (Server Side)
export async function getToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value ?? "";
  return token;
}