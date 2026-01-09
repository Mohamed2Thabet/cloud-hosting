import { NextRequest as Request, NextResponse as Response } from "next/server";
import { RegisterUserDTO } from "@/utils/dto";
import { registerUserSchema } from "@/utils/createArticleSchema";
import prisma from "@/utils/db";
import bcrypt from "bcryptjs";
import {
  jwtPlayload,
  setTokenCookie,
} from "@/utils/generateToken";
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RegisterUserDTO;
    const validation = registerUserSchema.safeParse(body);
    if (!validation.success) {
      return Response.json(
        {
          message: "Validation failed",
          errors: validation.error.issues.map((issue) => issue.message),
        },
        { status: 400 }
      );
    }
    const userExists = await prisma.user.findUnique({
      where: { email: body.email },
    });
    if (userExists) {
      return Response.json({ message: "User already exists" }, { status: 400 });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(body.password, salt);
    body.password = hashedPassword;
    const newUser = await prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: hashedPassword,
      },
    });
    const jwtPlayload: jwtPlayload = {
      userId: newUser.id,
      email: newUser.email,
      username: newUser.username,
      isAdmin: newUser.isAdmin,
    };

    const { password, ...userWithoutPassword } = newUser;
    const cookie = setTokenCookie(jwtPlayload);
    return Response.json(
      {
        message: "User registered",
        user: userWithoutPassword,
      },
      { status: 201,
        headers: { "Set-Cookie": cookie } }
    );
  } catch (error) {
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
