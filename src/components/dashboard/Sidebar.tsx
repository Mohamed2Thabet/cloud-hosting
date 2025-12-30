import Link from "next/link";
import { LayoutDashboard, FileText, MessageSquare } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="fixed top-0  left-0 w-64 h-screen bg-gray-900 text-white p-6 space-y-6 shadow-lg z-50">
      <h2 className="text-xl font-bold flex items-center gap-2 mt-20">
        <LayoutDashboard className="w-5 h-5" /> Dashboard
      </h2>
      <nav className="flex flex-col gap-4">
        <Link
          href="/admin/articles"
          className="flex items-center gap-2 hover:text-blue-400 transition-colors"
        >
          <FileText className="w-4 h-4" /> Articles
        </Link>
        <Link
          href="/admin/comments"
          className="flex items-center gap-2 hover:text-blue-400 transition-colors"
        >
          <MessageSquare className="w-4 h-4" /> Comments
        </Link>
      </nav>
    </aside>
  );
}
