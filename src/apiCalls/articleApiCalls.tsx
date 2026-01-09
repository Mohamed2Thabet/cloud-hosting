import { DOMAIN } from "@/utils/constants";
import { SingleArticle } from "@/utils/types";
import { Article } from "@prisma/client";

export async function getArticles(pageNumber:string|undefined):Promise<Article[]> {
const response = await fetch(`${DOMAIN}/api/articles?pageNumber=${pageNumber}`);
  if (!response.ok) {
    throw new Error("Failed to fetch articles");
  }
  return response.json();
}

export async function getAllArticles(): Promise<Article[]> {
  const response = await fetch(`${DOMAIN}/api/articles/all`, {
    cache: "no-store", // عشان البيانات دايمًا تتحدث
  });

  if (!response.ok) {
    throw new Error("Failed to fetch articles");
  }

  return response.json();
}
export async function getArticlesCount():Promise<number> {
const response = await fetch(`${DOMAIN}/api/articles/count`);
  if (!response.ok) {
    throw new Error("Failed  to get articles count");
  }
  const {count} =( await response.json()) as {count:number};
  return count;
}


export async function getArticlesSearch(search:string):Promise<Article[]> {
const response = await fetch(`${DOMAIN}/api/articles/search?searchText=${search}`);
  if (!response.ok) {
    throw new Error("Failed to fetch articles");
  }
  return response.json();
}

export async function getSingleArticle(articleId:string):Promise<SingleArticle> {
const response = await fetch(`${DOMAIN}/api/articles/${articleId}`,{cache:"no-store"});
  if (!response.ok) {
    throw new Error("Failed to fetch articles");
  }
  return response.json();
}
export async function getUsersCount():Promise<number> {
const response = await fetch(`${DOMAIN}/api/users/count`);
  if (!response.ok) {
    throw new Error("Failed  to get articles count");
  }
  const {count} =( await response.json()) as {count:number};
  return count;
}
export async function getCommentsCount():Promise<number> {
const response = await fetch(`${DOMAIN}/api/comments/count`);
  if (!response.ok) {
    throw new Error("Failed  to get articles count");
  }
  const {count} =( await response.json()) as {count:number};
  return count;
}
