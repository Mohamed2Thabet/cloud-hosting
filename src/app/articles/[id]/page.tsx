import React from "react";
import { SingleArticle, SingleArticlePropsParams } from "@/utils/types";
import Link from "next/link";
import AddCommentForm from "@/components/comments/AddCommentForm";
import CommentItem from "@/components/comments/CommentItem";
import { getSingleArticle } from "@/apiCalls/articleApiCalls";
import { getToken } from "@/utils/generateToken";
import { verifyTokenForPage } from "@/utils/verifyToken";
export default async function SingleArticlePage({
  params,
}: SingleArticlePropsParams) {
  const { id } = await params;
  const token = await getToken();
  const payload = verifyTokenForPage(token);
  const article: SingleArticle = await getSingleArticle(id);

  return (
    <div>
      <main className="min-h-[calc(100vh-148px)] bg-gradient-to-br from-slate-50 to-blue-50 flex justify-center items-start mb-5 md:p-8">
        <article className="max-w-4xl w-full bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100/50 backdrop-blur-sm">
          {/* Header Section */}
          <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 md:p-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-8 bg-yellow-400 rounded-full"></div>
              <span className="text-blue-100 text-sm font-medium tracking-wide uppercase">
                Article #{article.id}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 capitalize">
              {article.title}
            </h1>
            <div className="flex items-center gap-6 text-blue-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                {/* <span className="text-sm font-medium">
                Author ID: {article.comments.}
              </span> */}
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm">Published</span>
              </div>
            </div>
          </header>

          {/* Content Section */}
          <div className="p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line mb-8 first-letter:text-5xl first-letter:font-bold first-letter:text-blue-600 first-letter:float-left first-letter:mr-3 first-letter:mt-1">
                {article.description}
              </p>
            </div>

            {/* Engagement Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-6">
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-full transition-colors duration-200">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    <span className="text-sm font-medium">Like</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-green-50 hover:bg-green-100 text-green-600 rounded-full transition-colors duration-200">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    <span className="text-sm font-medium">Comment</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-600 rounded-full transition-colors duration-200">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                      />
                    </svg>
                    <span className="text-sm font-medium">Share</span>
                  </button>
                </div>

                <div className="flex items-center gap-2 text-gray-500">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm">
                    {new Date(article.createdAt).toDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <Link
                  href={Number(id) > 1 ? `/articles/${Number(id) - 1}` : "#"}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-colors duration-200 
    ${
      Number(id) > 1
        ? "bg-blue-600 hover:bg-blue-700 text-white"
        : "bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none"
    }`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  <span className="font-medium">Previous</span>
                </Link>
                <div className="text-center">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                    Article
                  </div>
                  <div className="text-2xl font-bold text-gray-800">
                    {article.id}
                  </div>
                </div>
                <Link
                  href={`${Number(id) + 1}`}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors duration-200"
                >
                  <span className="font-medium">Next</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>
      {payload ? (
        <AddCommentForm articleId={parseInt(id)} />
      ) : (
        <p className="text-muted">Please log in to add a comment.</p>
      )}
      <div>
        {article.comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            userId={payload?.userId}
          />
        ))}
      </div>
    </div>
  );
}
