"use client";
import React from "react";

export default function ArticlesLoading() {
  return (
    <div className="p-6 space-y-6">
      {/* Search Loading */}
      <div className="max-w-md mx-auto">
        <div className="h-12 w-full rounded-xl bg-gradient-to-r from-gray-300 via-gray-300 to-gray-300 bg-[length:200%_100%] animate-[shimmer_2s_ease-in-out_infinite]"></div>
      </div>
      
      {/* Filter/Sort Loading */}
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <div className="h-10 w-24 rounded-lg bg-gradient-to-r from-gray-300 via-gray-300 to-gray-300 bg-[length:200%_100%] animate-[shimmer_2s_ease-in-out_infinite] [animation-delay:0.1s]"></div>
          <div className="h-10 w-20 rounded-lg bg-gradient-to-r from-gray-300 via-gray-300 to-gray-300 bg-[length:200%_100%] animate-[shimmer_2s_ease-in-out_infinite] [animation-delay:0.2s]"></div>
        </div>
        <div className="h-4 w-24 rounded bg-gradient-to-r from-gray-300 via-gray-300 to-gray-300 bg-[length:200%_100%] animate-[shimmer_2s_ease-in-out_infinite] [animation-delay:0.3s]"></div>
      </div>

      {/* Cards Loading */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="p-4 rounded-2xl bg-white shadow-sm border border-gray-300 space-y-4 hover:shadow-md transition-shadow"
          >
            {/* Image placeholder with better aspect ratio */}
            <div className="aspect-video w-full rounded-xl bg-gradient-to-r from-gray-300 via-gray-300 to-gray-300 bg-[length:200%_100%] animate-[shimmer_2s_ease-in-out_infinite]" 
                 style={{ animationDelay: `${i * 0.1}s` }}></div>
            
            {/* Title placeholder - varies in width for realism */}
            <div 
              className="h-6 rounded bg-gradient-to-r from-gray-300 via-gray-300 to-gray-300 bg-[length:200%_100%] animate-[shimmer_2s_ease-in-out_infinite]"
              style={{ 
                width: `${Math.random() * 30 + 60}%`,
                animationDelay: `${i * 0.1 + 0.1}s`
              }}
            ></div>
            
            {/* Meta info placeholder */}
            <div className="flex items-center gap-3">
              <div className="h-4 w-16 rounded bg-gradient-to-r from-gray-300 via-gray-300 to-gray-300 bg-[length:200%_100%] animate-[shimmer_2s_ease-in-out_infinite]"
                   style={{ animationDelay: `${i * 0.1 + 0.2}s` }}></div>
              <div className="h-4 w-20 rounded bg-gradient-to-r from-gray-300 via-gray-300 to-gray-300 bg-[length:200%_100%] animate-[shimmer_2s_ease-in-out_infinite]"
                   style={{ animationDelay: `${i * 0.1 + 0.3}s` }}></div>
            </div>
            
            {/* Description lines */}
            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-gradient-to-r from-gray-300 via-gray-300 to-gray-300 bg-[length:200%_100%] animate-[shimmer_2s_ease-in-out_infinite]"
                   style={{ animationDelay: `${i * 0.1 + 0.4}s` }}></div>
              <div 
                className="h-4 rounded bg-gradient-to-r from-gray-300 via-gray-300 to-gray-300 bg-[length:200%_100%] animate-[shimmer_2s_ease-in-out_infinite]"
                style={{ 
                  width: `${Math.random() * 40 + 50}%`,
                  animationDelay: `${i * 0.1 + 0.5}s`
                }}
              ></div>
            </div>
            
            {/* Tags placeholder */}
            <div className="flex gap-2">
              <div className="h-6 w-16 rounded-full bg-gradient-to-r from-gray-300 via-gray-300 to-gray-300 bg-[length:200%_100%] animate-[shimmer_2s_ease-in-out_infinite]"
                   style={{ animationDelay: `${i * 0.1 + 0.6}s` }}></div>
              <div className="h-6 w-20 rounded-full bg-gradient-to-r from-gray-300 via-gray-300 to-gray-300 bg-[length:200%_100%] animate-[shimmer_2s_ease-in-out_infinite]"
                   style={{ animationDelay: `${i * 0.1 + 0.7}s` }}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Loading */}
      <div className="flex justify-center gap-3 pt-6">
        <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-gray-300 via-gray-300 to-gray-300 bg-[length:200%_100%] animate-[shimmer_2s_ease-in-out_infinite]"></div>
        <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-gray-300 via-gray-300 to-gray-300 bg-[length:200%_100%] animate-[shimmer_2s_ease-in-out_infinite] [animation-delay:0.1s]"></div>
        <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-gray-300 via-gray-300 to-gray-300 bg-[length:200%_100%] animate-[shimmer_2s_ease-in-out_infinite] [animation-delay:0.2s]"></div>
        <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-gray-300 via-gray-300 to-gray-300 bg-[length:200%_100%] animate-[shimmer_2s_ease-in-out_infinite] [animation-delay:0.3s]"></div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  );
}