import { DOMAIN } from "@/utils/constants";
import { getToken } from "@/utils/generateToken";
import { Comment } from "@prisma/client";   
export async function  getAllComments(): Promise<Comment[]> {
    const token = await getToken()

    const response = await fetch(`${DOMAIN}/api/comments`, {
    cache: "no-store",
    headers: {
      Cookie: `token=${token}`,
    },
  });
 
  if (!response.ok) {
    throw new Error("Failed to fetch comments");
  }

  return response.json();
}
