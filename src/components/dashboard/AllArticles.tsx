import { getAllArticles } from "@/apiCalls/articleApiCalls";
import { Article } from "@prisma/client";

export default async function AllArticles() {
  const articles: Article[] = await getAllArticles();

  return (
    <div className="w-[800px] h-[80vh] overflow-scroll p-4 md:p-6">
      <div className="w-full overflow-x-auto bg-slate-900 border border-slate-800 rounded-xl shadow-lg">
        <table className="w-full text-sm text-slate-300">
          <thead className="bg-slate-800 text-slate-400 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left whitespace-nowrap">ID</th>
              <th className="px-4 py-3 text-left whitespace-nowrap">Title</th>
              <th className="px-4 py-3 text-left whitespace-nowrap">Description</th>
              <th className="px-4 py-3 text-center whitespace-nowrap">Procedure</th>
            </tr>
          </thead>

          <tbody>
            {articles.map((article) => (
              <tr
                key={article.id}
                className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors duration-200"
              >
                <td className="px-4 py-3 font-medium break-words max-w-[80px]">{article.id}</td>
                <td className="px-4 py-3 break-words max-w-[200px]">{article.title}</td>
                <td className="px-4 py-3 break-words max-w-[300px]">{article.description}</td>
                <td className="px-4 py-3 text-center flex justify-center items-center gap-2">
                  <button className="px-3 py-1 text-xs font-semibold text-blue-400 border border-blue-400 rounded hover:bg-blue-400/10 transition">
                    Edit
                  </button>
                  <button className="px-3 py-1 text-xs font-semibold text-red-400 border border-red-400 rounded hover:bg-red-400/10 transition">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer small hint */}
      <p className="text-center text-slate-500 text-xs mt-3">
        Showing {articles.length} articles
      </p>
    </div>
  );
}
