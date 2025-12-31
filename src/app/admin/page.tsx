import { getArticlesCount, getCommentsCount, getUsersCount } from "@/apiCalls/articleApiCalls";
import Link from "next/link";
import { FileText, MessageSquare, Users, Plus, ArrowRight } from "lucide-react";

export default async function DashboardPage() {
  const countArticles = await getArticlesCount();
  const countComments = await getCommentsCount();
  const countUsers = await getUsersCount();

  return (
    <div className="w-full min-h-[calc(100vh-(80px+92px))] bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="mt-2 text-gray-600">Welcome back! Here&apos;s what&apos;s happening with your content.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Articles Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-400">Total Articles</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900">{countArticles}</h3>
            <div className="mt-4 flex items-center text-sm text-blue-600 font-medium">
              <Link href="/admin/articles?pageNumber=1" className="flex items-center hover:underline">
                View all articles <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>

          {/* Comments Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <MessageSquare className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm font-medium text-gray-400">Total Comments</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900">{countComments}</h3>
            <div className="mt-4 flex items-center text-sm text-green-600 font-medium">
              <Link href="/admin/comments" className="flex items-center hover:underline">
                View all comments <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>

          {/* Users Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-50 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-gray-400">Total Users</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900">{countUsers}</h3>
            <div className="mt-4 flex items-center text-sm text-purple-600 font-medium">
              <Link href="/admin/users" className="flex items-center hover:underline">
                Manage users <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/admin/articles/create"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create New Article
            </Link>
            <Link
              href="/admin/comments"
              className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium shadow-sm"
            >
              <MessageSquare className="w-5 h-5 mr-2 text-gray-500" />
              Manage Comments
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
