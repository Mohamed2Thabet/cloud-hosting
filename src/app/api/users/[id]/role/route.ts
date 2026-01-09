/**
 * @method PATCH
 * @description Update user role (admin / user)
 * @route /api/users/:id/role
 * @access Private (Admin only)
 */

import prisma from "@/utils/db";
import verifyToken from "@/utils/verifyToken";
import { NextResponse as Response, NextRequest as Request } from "next/server";
export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const userId = Number(id);

  if (isNaN(userId)) {
    return Response.json({ message: "Invalid user id" }, { status: 400 });
  }

  const decoded = verifyToken(request);
  if (!decoded || !decoded.isAdmin) {
    return Response.json({ message: "Admin only" }, { status: 403 });
  }

  const { isAdmin } = await request.json();

  if (typeof isAdmin !== "boolean") {
    return Response.json(
      { message: "isAdmin must be boolean" },
      { status: 400 }
    );
  }

  const user = await prisma.user.update({
    where: { id: userId },
    data: { isAdmin },
  });

  return Response.json(
    { message: "Role updated successfully" },
    { status: 200 }
  );
}
