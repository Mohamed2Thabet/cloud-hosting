import prisma from "@/utils/db";
import { NextRequest as Request ,NextResponse as Response } from "next/server";

/**
 * @method GET
 * @description get Articles by seacrh 
 * @access public 
 */

export async function GET(request:Request){
    try{
        const seacrh = request.nextUrl.searchParams.get("searchText");
        console.log(seacrh)
        let article;
        if(seacrh)
        {
            article = await prisma.article.findMany({
                where:{
                    title:{
                        startsWith:seacrh,
                        mode:"insensitive"
                    }
                }
            })
        }else {
            article = await prisma.article.findMany({
                take:6
            })
        }
        return Response.json(article,{status:200})
    }catch(error){
        return Response.json(
            {message:"Internal Server Error"},
            {status:500}
        )
    }
}