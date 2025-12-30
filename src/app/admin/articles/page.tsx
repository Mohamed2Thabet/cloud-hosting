import AddArticle from "@/components/dashboard/AddArticle";
import AllArticles from "@/components/dashboard/AllArticles";

export default function ArticlesPage() {
  return (
    <main className="p-6 flex justify-center items-center flex-col gap-3">
   
        {/* <h2 className="text-2xl font-bold ">Manage Articles</h2> */}
      <AddArticle />
      <AllArticles />
    </main>
  );
}
