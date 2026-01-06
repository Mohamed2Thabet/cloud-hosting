import { DOMAIN } from "@/utils/constants";
import { getToken } from "@/utils/generateToken";
import { User } from "@prisma/client";
import { get } from "http";
import { Cookie } from "next/font/google";

export async function getAllUsers(): Promise<User[]> {
  const token = await getToken();
  const response = await fetch(`${DOMAIN}/api/users`, {
    cache: "no-store",
    headers: {
      Cookie: `token=${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
}
