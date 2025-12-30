import Link from "next/link";

export default function DashboardPage() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard Overview</h2>

      {/* إحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-xl shadow hover:shadow-md transition">
          <h3 className="text-lg font-semibold">Articles</h3>
          <p className="text-2xl font-bold text-blue-600">120</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow hover:shadow-md transition">
          <h3 className="text-lg font-semibold">Comments</h3>
          <p className="text-2xl font-bold text-green-600">340</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow hover:shadow-md transition">
          <h3 className="text-lg font-semibold">Users</h3>
          <p className="text-2xl font-bold text-purple-600">45</p>
        </div>
      </div>

      {/* اختصارات */}
      <div className="flex gap-4">
        <Link
          href="/admin/articles"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add Article
        </Link>
        <Link
          href="/admin/comments"
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Add Comment
        </Link>
      </div>
    </section>
  );
}
