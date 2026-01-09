
/**
 * @method DELETE
 * @description Delete a user by ID
 * @route /api/users/profile/:id
 * @access public by admin 
 */

import prisma from "@/utils/db";
import verifyToken from "@/utils/verifyToken";
import { NextResponse as Response, NextRequest as Request } from "next/server";
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;   
    const userId = parseInt(id);
    if (isNaN(userId)) {
      return Response.json({ message: "Invalid user ID" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include:{comments:true}
    });

    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    const decoded = verifyToken(request);
    
    if (!decoded || (decoded.isAdmin !== true && decoded.userId !== userId)) {
      return Response.json({ message: "Not authorized" }, { status: 403 });
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    const commentIds:number[] = user?.comments.map(comment => comment.id) || []
    
    await prisma.comment.deleteMany({
      where:{
        id:{in:commentIds}
      }
    })
    return Response.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete User Error:", error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
