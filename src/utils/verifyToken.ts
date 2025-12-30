import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { jwtPlayload } from "./generateToken";

// verify token for APi
export default function verifyToken(request: NextRequest): jwtPlayload | null {
  try {
    const jwtToken = request.cookies.get("token");
    const token = jwtToken?.value;

    if (!token) {
      console.warn("No token found in cookies");
      return null;
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as jwtPlayload;

    return decoded;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}

// verfiy token for page
export function verifyTokenForPage(token?: string): jwtPlayload | null {
  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as jwtPlayload;

    return decoded;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}
