import prisma from "@/utils/db";
import { Article } from "@prisma/client";
import { NextResponse as Response } from "next/server";

/**
 * @method GET
 * @route ~/api/articles/all
 * @description Fetch all articles
 * @access public
 */

export async function GET() {
  try {
    const articles: Article[] = await prisma.article.findMany({
      orderBy: { createdAt: "desc" },
    });

    return Response.json(articles, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
