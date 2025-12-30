"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { GrTechnology } from "react-icons/gr";
import { AiOutlineMenu } from "react-icons/ai";
import { IoClose } from "react-icons/io5";

// Enhanced Navbar component with active link detection
interface NavbarProps {
  isAdmin:boolean 
}
export default function Navbar({isAdmin}:NavbarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Check if link is active
  const isActiveLink = (href :string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  // Get link classes - all links are now buttons
  const getLinkClasses = (href:string) => {
    return isActiveLink(href)
      ? "bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 transform scale-105 shadow-lg"
      : " hover:bg-blue-700 hover:text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg";
  };

  // Get mobile link classes - all mobile links are now buttons
  const getMobileLinkClasses = (href :string) => {
    return isActiveLink(href)
      ? "block mx-2 mt-2 px-4 py-3 bg-blue-700 text-white text-center font-semibold rounded-lg transition-all duration-200 transform scale-105 shadow-lg"
      : "block mx-2 mt-2 px-4 py-3  hover:text-white  hover:bg-blue-700  text-center font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md";
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            >
              Cloud 
              <GrTechnology className="text-blue-600 text-xl md:text-2xl animate-pulse" />
              Hosting
            </Link>
          </div>

          {/* Desktop Navigation - All buttons now */}
          <ul className="hidden lg:flex items-center space-x-4">
            <li>
              <Link 
                href="/" 
                className={getLinkClasses("/")}
              >
                Home
              </Link>
            </li>
            
            <li>
              <Link 
                href="/about" 
                className={getLinkClasses("/about")}
              >
                About
              </Link>
            </li>
            
            {isAdmin && <li>
              <Link 
                href="/admin" 
                className={getLinkClasses("/admin")}
              >
                Admin Dashboard
              </Link>
            </li>}
            
            <li>
              <Link 
                href="/articles?pageNumber=1" 
                className={getLinkClasses("/articles")}
              >
                Articles
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Toggle menu"
            >
              {open ? (
                <IoClose className="w-6 h-6 transform rotate-0 transition-transform duration-200" />
              ) : (
                <AiOutlineMenu className="w-6 h-6 transform rotate-0 transition-transform duration-200" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - All buttons now */}
        <div 
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 space-y-2 bg-gradient-to-b from-white to-gray-50 border-t border-gray-100">
            <Link 
              href="/" 
              onClick={() => setOpen(false)}
              className={getMobileLinkClasses("/")}
            >
              Home
            </Link>
            
            <Link 
              href="/about" 
              onClick={() => setOpen(false)}
              className={getMobileLinkClasses("/about")}
            >
              About
            </Link>
            
            <Link 
              href="/admin" 
              onClick={() => setOpen(false)}
              className={getMobileLinkClasses("/admin")}
            >
              Admin Dashboard
            </Link>
            
            <Link 
              href="/articles" 
              onClick={() => setOpen(false)}
              className={getMobileLinkClasses("/articles")}
            >
              Articles
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
