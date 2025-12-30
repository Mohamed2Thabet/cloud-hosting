"use client";

import Link from "next/link";
import Navbar from "./Navbar";
import { usePathname } from "next/navigation";
import { jwtPlayload } from "@/utils/generateToken";
import Logout from "./Logout";
export default function Header({user}:{user:jwtPlayload | null}) {
  const pathname = usePathname();

  // Check if auth link is active
  const isActiveAuthLink = (href:string) => {
    return pathname === href;
  };

  // Get auth button classes
  const getAuthButtonClasses = (href:string) => {
    const baseClasses = "px-6 py-2 rounded-lg font-semibold transition-all  duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2";
    
    if (href === "/login") {
      return isActiveAuthLink(href)
        ? `${baseClasses} bg-blue-600 text-white shadow-lg scale-105 ring-2 ring-blue-500 ring-offset-2`
        : `${baseClasses} border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white shadow-md hover:shadow-lg`;
    } else {
      return isActiveAuthLink(href)
        ? `${baseClasses} bg-blue-700 text-white shadow-lg scale-105 ring-2 ring-blue-500 ring-offset-2`
        : `${baseClasses} bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg`;
    }
  };

  return (
    <header className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-[100] ">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center flex-col sm:flex-row">
          {/* Navbar takes most of the space */}
          <div className="flex-1">
            <Navbar isAdmin={user?.isAdmin || false}/>
          </div>

          {/* Auth buttons section */}
           {!user ? (
            <>
              <div className="hidden md:flex items-center space-x-4 px-4 sm:px-6 lg:px-8 ">
                <Link href="/login" className={getAuthButtonClasses("/login")}>
                  Login
                </Link>
                <Link
                  href="/register"
                  className={getAuthButtonClasses("/register")}
                >
                  Register
                </Link>
              </div>

              <div className="md:hidden flex items-center space-x-2 px-4">
                <Link
                  href="/login"
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActiveAuthLink("/login")
                      ? "bg-blue-600 text-white shadow-md"
                      : "border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                  }`}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActiveAuthLink("/register")
                      ? "bg-blue-700 text-white shadow-md"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  Register
                </Link>
              </div>
            </>
          ) : (
            /* ✅ لو المستخدم موجود، اعرض معلوماته */
            <div className="flex items-center space-x-4 px-4 sm:px-6 lg:px-8">
              <span className="font-semibold text-gray-700">
                👋 Welcome, {user.username || "User"}
              </span>
              <Logout/>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}