import { Article,User,Comment } from "@prisma/client";



export interface ErrorResponse {
    error: { message: string };
    reset: () => void;
}

// Fixed: params should always be a Promise in Next.js App Router
export type SingleArticlePropsParams = {
    params: Promise<{ id: string }>
}

export type CommentWithUser = Comment & {user:User}

export type SingleArticle = Article & {comments:CommentWithUser[]}