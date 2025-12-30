import ArticleItem from "@/components/articles/ArticleItem";
import React from "react";
import { Article } from "@prisma/client";
import SearchArticle from "@/components/articles/SearchArticle";
import Pagination from "@/components/articles/Pagination";
import { getArticles, getArticlesCount } from "@/apiCalls/articleApiCalls";
import { ARTICLE_PRE_PAGE } from "@/utils/constants";

interface ArticlesPageProps {
  searchParams:{pageNumber:string}
}

export default async function ArticlesPage({searchParams}:ArticlesPageProps) {
  const {pageNumber} = await searchParams;
  
  const articles:Article[] = await getArticles(pageNumber)
  const count:number = await getArticlesCount()
  const pages = Math.ceil(count/ ARTICLE_PRE_PAGE)
  return (
    <section className="container  px-5 mx-auto min-h-[calc(100vh-(80px+92px))] flex justify-center items-center flex-col">
      <SearchArticle />
     <div className="flex justify-center items-center flex-wrap gap-7 ">
       {articles.map((article) => (
        <ArticleItem key={article.id} article={article} />
      ))}
     </div>
     <Pagination route="/articles" pageNumber={parseInt(pageNumber)} pages={pages} />
    </section>
  );
}
