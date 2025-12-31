"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  FilePlus,
  List,
  MessageSquare,
  MessagesSquare,
  Users,
  Settings,
  BarChart3,
  Tags,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path.split("?")[0];
  console.log("Current Pathname:", pathname);
  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin",
    },
    {
      title: "Articles",
      icon: FileText,
      subItems: [
        { title: "All Articles", icon: List, href: "/admin/articles?pageNumber=1" },
        { title: "Create Article", icon: FilePlus, href: "/admin/articles/create" },
        // { title: "Categories", icon: Tags, href: "/admin/categories" },
      ],
    },
    {
      title: "Comments",
      icon: MessageSquare,
      subItems: [
        { title: "Create Comments", icon: MessagesSquare, href: "/admin/comments" },
        { title: "Pending Review", icon: MessageSquare, href: "/admin/comments/pending" },
      ],
    },
    {
      title: "Users",
      icon: Users,
      href: "/admin/users",
    },
    {
      title: "Analytics",
      icon: BarChart3,
      href: "/admin/analytics",
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/admin/settings",
    },
  ];

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-900 text-white rounded-md shadow-lg hover:bg-gray-800 transition-colors"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen bg-gray-900 text-white shadow-lg z-400 transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 w-64 overflow-y-auto
        `}
      >
        <div className="p-6 space-y-6">
          {/* Logo/Header */}
          <div className="pt-12 lg:pt-4">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-blue-400">
              <LayoutDashboard className="w-6 h-6" />
              Admin Panel
            </h2>
            <p className="text-xs text-gray-400 mt-1">Manage your content</p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2">
            {menuItems.map((item, index) => (
              <div key={index}>
                {item.subItems ? (
                  // Menu item with sub-items
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 px-3 py-2 text-gray-300 font-medium text-sm">
                      <item.icon className="w-4 h-4" />
                      {item.title}
                    </div>
                    <div className="ml-4 space-y-1">
                      {item.subItems.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`
                            flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 text-sm
                            ${
                              isActive(subItem.href)
                                ? "bg-blue-600 text-white font-medium shadow-md"
                                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                            }
                          `}
                        >
                          <subItem.icon className="w-4 h-4" />
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  // Single menu item
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`
                      flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 text-sm
                      ${
                        isActive(item.href)
                          ? "bg-blue-600 text-white font-medium shadow-md"
                          : "text-gray-300 hover:bg-gray-800 hover:text-white"
                      }
                    `}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Footer Info */}
          <div className="pt-6 border-t border-gray-700">
            <div className="text-xs text-gray-400 space-y-1">
              <p>Version 1.0.0</p>
              <p>© 2025 Admin Panel</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Spacer for desktop to prevent content overlap */}
      <div className="hidden lg:block w-64" />
    </>
  );
}