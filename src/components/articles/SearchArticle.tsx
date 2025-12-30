"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchArticle() {
    const [searchText, setSearchText] = React.useState("");
    const router = useRouter();
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
      router.push(`/articles/search?searchText=${searchText}`);
    }
  return (
    <form className="relative my-6 w-full max-w-md mx-auto" onSubmit={handleSearch}>
      <input
        type="text"
        id="text"
        placeholder="Enter your text"
        className="w-full px-4 py-3 pr-10 border border-gray-600 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
        required
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
    </form>
  );
}
