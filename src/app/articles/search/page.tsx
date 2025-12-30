import { getArticlesSearch } from "@/apiCalls/articleApiCalls";
import ArticleItem from "@/components/articles/ArticleItem";
import { Article } from "@prisma/client";

interface SearchPageProps {
  searchParams: { searchText: string };
}

export default async function SearchPage({
  searchParams: { searchText },
}: SearchPageProps) {
  const articles: Article[] = await getArticlesSearch(searchText);
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Search Results</h1>
      {searchText ? (
        <>
          {" "}
          <p className="text-center text-lg">
            You searched for:{" "}
            <span className="font-semibold">{searchText}</span>
          </p>
          <div className="flex justify-center items-center flex-wrap gap-7 mt-8">
            {articles.map((article) => (
              <ArticleItem key={article.id} article={article} />
            ))}
          </div>
        </>
      ) : (
        <p className="text-center text-lg">No search query provided.</p>
      )}
    </div>
  );
}
