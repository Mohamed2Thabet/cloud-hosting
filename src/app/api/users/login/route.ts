import { loginUserSchema } from "@/utils/createArticleSchema";
import prisma from "@/utils/db";
import { LoginUserDTO } from "@/utils/dto";
import { NextRequest as Request, NextResponse as Response } from "next/server";
import bcrypt from "bcryptjs";
import {  jwtPlayload, setTokenCookie } from "@/utils/generateToken";
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LoginUserDTO;

    const validation = loginUserSchema.safeParse(body);
    if (!validation.success) {
      return Response.json(
        {
          message: "Invalid input",
          errors: validation.error.issues.map((issue) => issue.message),
        },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (!user) {
      return Response.json(
        { message: "Email not found. Please register first." },
        { status: 400 }
      );
    }

    const isPasswordValid = await bcrypt.compare(body.password, user.password);
    if (!isPasswordValid) {
      return Response.json(
        { message: "Incorrect password. Please try again." },
        { status: 400 }
      );
    }

    const jwtPlayload:jwtPlayload = {
      userId: user.id,
      email: user.email,
      username: user.username,
      isAdmin: user.isAdmin,
    };
  const cookie = setTokenCookie(jwtPlayload);
    return Response.json(
      {
        message: "Login successful",
      },
      { status: 200 ,headers: { 'Set-Cookie': cookie }}
    );
  } catch (error) {
    console.error("Login Error:", error);
    return Response.json(
      { message: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
