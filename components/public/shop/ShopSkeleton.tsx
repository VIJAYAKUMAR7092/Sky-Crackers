import React from "react";

export default function ShopSkeleton() {
  return (
    <div className="flex-1 w-full max-w-full animate-pulse">
      {/* Mobile Category Navigation Skeleton */}
      <div className="lg:hidden mb-6 -mx-4 px-4 overflow-x-auto flex items-center gap-2 pb-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="shrink-0 w-24 h-10 bg-gray-200 rounded-full" />
        ))}
      </div>

      {/* Toolbar Skeleton */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="h-5 w-48 bg-gray-200 rounded" />
        <div className="flex items-center gap-3">
          <div className="h-9 w-24 bg-gray-200 rounded-md" />
        </div>
      </div>

      {/* Products Skeleton */}
      <div className="space-y-12">
        <div className="w-full">
          {/* Category Title Skeleton */}
          <div className="flex items-center gap-4 mb-6 pb-2 border-b-2 border-gray-100">
            <div className="h-8 w-64 bg-gray-200 rounded" />
          </div>
          
          {/* Grid View Skeleton (Default) */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white border-2 border-gray-100 rounded-2xl md:rounded-3xl h-64 sm:h-80 w-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
