import prisma from "@/utils/db";
import { UpdateArticleDTO } from "@/utils/dto";
import verifyToken from "@/utils/verifyToken";
import { Article } from "@prisma/client";
import { NextRequest as Request, NextResponse as Response } from "next/server";

/**
 * @method GET
 * @route ~/api/articles/:id
 * @description Fetch a single article by ID
 * @access public
 */
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const article: Article | null = await prisma.article.findUnique({
      where: { id: parseInt(id) },
      include:{
        comments:{
          orderBy:{
            createdAt:'desc'
          },
          include:{
            user:{
              select:
              {
                username:true,
                email:true
              }
            }
          }
        }
      }
    });
    if (!article) {
      return Response.json({ message: "Article not found" }, { status: 404 });
    }
    return Response.json(article, { status: 200 });
  } catch (error: unknown) {
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

/**
 * @method PUT
 * @route ~/api/articles/:id
 * @description Update a single article by ID
 * @access public
 */
export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const user = verifyToken(request);
    if (user === null || user.isAdmin === false)
      return Response.json({ message: "Access denied" }, { status: 403 });
    // ✅ await لازم

    const { id } = await context.params;

    const body = (await request.json()) as UpdateArticleDTO;

    const updatedArticle = await prisma.article.update({
      where: { id: parseInt(id) },
      data: body,
    });

    return Response.json(
      { message: "Article updated", article: updatedArticle },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (typeof error === 'object' && error !== null && 'code' in error && error.code === "P2025") {
      return Response.json({ message: "Article not found" }, { status: 404 });
    }
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

/**
 * @method DELETE
 * @route ~/api/articles/:id
 * @description Delete a single article by ID
 * @access public
 */
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const user = verifyToken(request);
    if (user === null || user.isAdmin === false)
      return Response.json({ message: "Access denied" }, { status: 403 });
    const { id } = await context.params;

    //check article is found 
    const article = await prisma.article.findUnique({
      where:{id:Number(id)}
      ,include:{comments:true}
    })
    if(!article)
      return Response.json({message:"Article not found"},{status:404})

    // deleting the Article
     await prisma.article.delete({
      where: { id: parseInt(id) },
    });
    
    //delete all comment by article 
    const commentIds:number[] = article?.comments.map(comment => comment.id) || []
    await prisma.comment.deleteMany({
      where:{id:{in:commentIds}}
    })
    return Response.json(
      { message: "Article deleted" },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (typeof error === 'object' && error !== null && 'code' in error && error.code === "P2025") {
      return Response.json({ message: "Article not found" }, { status: 404 });
    }
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
