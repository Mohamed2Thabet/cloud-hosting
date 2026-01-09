import prisma from "@/utils/db";
import verifyToken from "@/utils/verifyToken";
import { NextResponse as Response, NextRequest as Request } from "next/server";
export async function GET(request: Request) {
  try {
    const user = verifyToken(request);

    if (!user) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!user.isAdmin) {
      return Response.json(
        { message: "Access denied, admins only" },
        { status: 403 }
      );
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        isAdmin: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return Response.json(users, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
