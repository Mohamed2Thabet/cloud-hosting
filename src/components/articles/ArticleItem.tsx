
import Link from 'next/link'
import React from 'react'
import { Article } from '@prisma/client'

export interface ArticleItemProps {
    article: Article;
}
export default function ArticleItem({article}: ArticleItemProps) {

  return (
    <article
      key={article.id}
      className="group relative bg-white border border-gray-200 hover:border-purple-300 shadow-md hover:shadow-xl transition-all duration-300 p-6 rounded-xl md:w-2/5 lg:w-1/4 transform hover:-translate-y-1 overflow-hidden"
    >
      {/* Subtle background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/0 to-blue-50/0 group-hover:from-purple-50/30 group-hover:to-blue-50/20 transition-all duration-300 rounded-xl"></div>
      
      <div className="relative z-10">
        <h2
          className="text-xl font-bold text-gray-900 line-clamp-2 mb-3 group-hover:text-purple-900 transition-colors duration-200"
          title={article.title}
        >
          {article.title}
        </h2>
        
        <p className="text-gray-600 text-base leading-relaxed line-clamp-3 mb-6">
          {article.description}
        </p>
        
        <Link
          href={`/articles/${article.id}`}
          className="inline-flex items-center justify-center w-full px-4 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium text-sm rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          Read More
          <svg 
            className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  )
}
