import prisma from "@/utils/db";
import { updateCommentDTO } from "@/utils/dto";
import verifyToken from "@/utils/verifyToken";
import { NextRequest as Request, NextResponse as Response } from "next/server";

/**
 * @method PUT
 * @route ~/api/comments/:id
 * @description Update a existing comment
 * @access  private (Only authenticated users can update comments)
 */

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    if (!id)
      return Response.json(
        {
          message: "Comment id is required",
        },
        { status: 400 }
      );

      
    const existingComment = await prisma.comment.findUnique({
      where: { id: Number(id) },
    });
    if (!existingComment)
      return Response.json(
        { message: "comment is not found" },
        { status: 404 }
      );

    const user = verifyToken(request);

    if (!user || user.userId !== existingComment.userId)
      return Response.json({ message: "Access denied" }, { status: 403 });

    const body = (await request.json()) as updateCommentDTO;
    const updateComment = await prisma.comment.update({
      where: { id: Number(id) },
      data: {
        content: body.text ?? existingComment.content,
      },
    });

    return Response.json(
      { message: "Comment update successfully", updateComment },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: "Interal sever error", error },
      { status: 500 }
    );
  }
}

/**
 * @method DELETE
 * @route ~/api/comments/:id
 * @description Delete a existing comment
 * @access  private (Only authenticated users can delete comments)
 */

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    if (!id)
      return Response.json(
        {
          message: "Comment id is required",
        },
        { status: 400 }
      );

      
    const existingComment = await prisma.comment.findUnique({
      where: { id: Number(id) },
    });
    if (!existingComment)
      return Response.json(
        { message: "comment is not found" },
        { status: 404 }
      );

    const user = verifyToken(request);

    if (!user || user.userId !== existingComment.userId)
      return Response.json({ message: "Access denied" }, { status: 403 });

     await prisma.comment.delete({
      where: { id: Number(id) },
    });

    return Response.json(
      { message: "Comment deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: "Interal sever error", error },
      { status: 500 }
    );
  }
}
