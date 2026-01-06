import { createCommentSchema } from "@/utils/createArticleSchema";
import prisma from "@/utils/db";
import { CreateCommentDTO } from "@/utils/dto";
import verifyToken from "@/utils/verifyToken";
import { error } from "console";
import { NextResponse as Response, NextRequest as Request } from "next/server";
/**
 * @method POST
 * @route ~/api/comments
 * @description Create a new comment
 * @access Private (Only authenticated users can create comments)
 */
export async function POST(request: Request) {
  try {
    const decoded = verifyToken(request);
    console.log("Decoded Token:", decoded);
    if (!decoded) {
      return Response.json({ message: "Not authorized" }, { status: 403 });
    }
    const body = (await request.json()) as CreateCommentDTO;
    const validatedBody = createCommentSchema.safeParse(body); // Validate the request body
    if (!validatedBody.success) {
      return Response.json(
        { message: "Invalid request data" },
        { status: 400 }
      );
    }
    const newComment = await prisma.comment.create({
      data: {
        userId: decoded.userId,
        content: body.text,
        articleId: body.articleId,
      },
    });
    return Response.json(
      { message: "Comment created successfully", comment: newComment },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}

/**
 * @method GET
 * @route ~/api/comments
 * @description Get comments for an article
 * @access admin (Only authenticated users can get comments)
 */

export async function GET(request: Request) {
  try {
    const user = verifyToken(request);
    if (user === null || user.isAdmin === false) {
      return Response.json(
        { message: "only admin , access denied " },
        { status: 403 }
      );
    }
    const comments = await prisma.comment.findMany();
    return Response.json(comments, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}




