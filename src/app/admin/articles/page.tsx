import { getArticles, getArticlesCount } from "@/apiCalls/articleApiCalls";
import Pagination from "@/components/articles/Pagination";
import { ARTICLE_PRE_PAGE } from "@/utils/constants";
import { Article } from "@prisma/client";
import DeleteArticleButton from "@/components/articles/DeleteArticle";
import EditArticle from "@/components/articles/EditArticle";
interface ArticlesPageProps {
  searchParams: Promise<{
    pageNumber?: string;
  }>;
}
export default async function ArticlesPage({ searchParams }: ArticlesPageProps) {
  const params = await searchParams;
  let pageNumber = parseInt(params.pageNumber || "1");
  if (isNaN(pageNumber) || pageNumber < 1) {
    pageNumber = 1;
  }

  const articles: Article[] = await getArticles(pageNumber.toString());
  const count: number =  await getArticlesCount()
  const totalPages = Math.ceil(count / ARTICLE_PRE_PAGE)
  return (
    <div className="w-full min-h-[calc(100vh-(80px+92px))] bg-gray-50 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            All Articles
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Manage and view all your articles
          </p>
        </div>

        {/* Desktop Table View - Hidden on mobile */}
        <div className="hidden lg:block bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Procedure
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {articles.map((article) => (
                  <tr key={article.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {article.id}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {article.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="max-w-xs truncate">
                        {article.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        <EditArticle title={article.title} description={article.description} articleId={article.id} />
                      
                        <DeleteArticleButton articleId={article.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile/Tablet Card View - Visible on small/medium screens */}
        <div className="lg:hidden space-y-4">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow"
            >
              {/* Article ID Badge */}
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  ID: {article.id}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 break-words">
                {article.title}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-3">
                {article.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm sm:text-base font-medium">
                  Edit
                </button>
                <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm sm:text-base font-medium">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 sm:mt-8 text-center">
         <Pagination route="/admin/articles" pageNumber={pageNumber} pages={totalPages} />
        </div>
      </div>
    </div>
  );
}