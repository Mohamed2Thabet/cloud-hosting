import { ARTICLE_PRE_PAGE } from "@/utils/constants";
import { createArticleSchema } from "@/utils/createArticleSchema";
import prisma from "@/utils/db";
import { CreateArticleDTO } from "@/utils/dto";
import verifyToken from "@/utils/verifyToken";
import { Article } from "@prisma/client";
import { NextRequest as Request, NextResponse as Response } from "next/server";


/**
 * @method GET
 * @route ~/api/articles
 * @description Fetch all articles
 * @access public 
 */
export async function GET(request: Request) {
 try {
  const pageNumber = request.nextUrl.searchParams.get("pageNumber") || "1"
   
const articles: Article[] = await prisma.article.findMany(
  {
    skip:ARTICLE_PRE_PAGE * (Number(pageNumber)-1),
    take:ARTICLE_PRE_PAGE,
    orderBy:{
      createdAt:"desc"
    }
  }
);
  return Response.json(articles , { status: 200 });
 } catch (error) {
  return Response.json(
    { message: "Internal server error" },
    { status: 500 }
  );}
}

/**
 * @method POST
 * @route ~/api/articles
 * @description Create New Article
 * @access public 
 */
export async function POST(request: Request) {
  try {
    const user = verifyToken(request);
    if( user=== null || user.isAdmin === false)
      return Response.json({message:"Access denied"},{status:403})
     const body = (await request.json()) as CreateArticleDTO;
  const validation = createArticleSchema.safeParse(body);
  if (!validation.success) {
    return Response.json(     { 
      message: "Validation failed",
      errors: validation.error.issues.map((issue) => issue.message), 
    },
 { status: 400 });
  }

  const newArticle:Article = await prisma.article.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });


  return Response.json(
    { message: "Article created", article: newArticle },
    { status: 201 }
  );} catch (error) {
    return Response.json(
      { message: "Internal server error" },
      { status: 500 }
    );}
}
