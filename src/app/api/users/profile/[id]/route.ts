import { NextRequest as Request, NextResponse as Response } from "next/server";
import prisma from "@/utils/db";
import  verifyToken  from "@/utils/verifyToken";
import { UpdateUserDTO } from "@/utils/dto";
import bcrypt from 'bcryptjs';
import { createPasswordSchema, updateUserSchema } from "@/utils/createArticleSchema";


/**
 * @method DELETE
 * @description Delete a user by ID
 * @route /api/users/profile/:id
 * @access Private (Only the user themselves or an admin can delete the account)
 */

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

    const decoded = verifyToken(request); ;
    

    if (decoded?.userId !== userId) {
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

/**
 * @method GET
 * @description Get a user profile by ID
 * @route /api/users/profile/:id
 * @access Private (Only the user themselves or an admin can access the profile)
 */

export async function GET(
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
    });
    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }
    const decoded = verifyToken(request); ;
    if (decoded?.userId !== userId) {
      return Response.json({ message: "Not authorized" }, { status: 403 });
    }
    return Response.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Get User Profile Error:", error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}

/**
 * @method PUT
 * @description Update a user profile by ID
 * @route /api/users/profile/:id
 * @access  Private (Only the user themselves or an admin can update the profile)
 */

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const userId = Number(id);

    if (isNaN(userId)) {
      return Response.json({ message: "Invalid user ID" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      
    });

    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    const decoded = verifyToken(request);
    if (!decoded || decoded.userId !== userId) {
      return Response.json({ message: "Not authorized" }, { status: 403 });
    }

    const body = await request.json() as UpdateUserDTO;
    const validation = updateUserSchema.safeParse(body)
    if(!validation.success)
      return Response.json({message:validation.error.issues[0].message},{status:400})
    // Handle password hashing
    let hashedPassword: string | undefined;

    if (body.password) {
      const password = createPasswordSchema.safeParse(body.password);
      if (!password.success) {
        return Response.json(
          { message: "Invalid password format"},
          { status: 400 }
        );
      }
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(body.password, salt);
    }

    // Build the update payload safely
    const updateData: UpdateUserDTO = {
      ...(body.username && { username: body.username }),
      ...(body.email && { email: body.email }),
      ...(hashedPassword && { password: hashedPassword }),
    };

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    return Response.json({ user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error("Update User Profile Error:", error);
    return Response.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
