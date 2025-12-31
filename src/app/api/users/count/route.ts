import prisma from "@/utils/db";
import { NextRequest as Request ,NextResponse as Response } from "next/server";

/**
 * @method GET
 * @description get Aricles count
 * @access public 
 */

export async function GET(request:Request){
    try{
      const count = await prisma.user.count();
      return Response.json({count},{status:200})
    }catch(error){
        return Response.json(
            {message:"Internal Server Error"},
            {status:500}
        )
    }
}