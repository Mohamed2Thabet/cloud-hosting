"use client";
import React from "react";

export default function LoadingPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center space-y-6">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>

        {/* Text */}
        <p className="text-gray-600 text-lg font-medium animate-pulse">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
}
