import React, { Suspense } from "react";
import Link from "next/link";
import { Search, Filter } from "lucide-react";
import { getAllCategories } from "@/lib/services/public/product.service";
import ShopContent from "@/components/public/shop/ShopContent";
import ShopSkeleton from "@/components/public/shop/ShopSkeleton";

export const metadata = {
  title: "Shop Premium Fireworks | Sky Crackers",
  description: "Browse our complete catalog of authentic Sivakasi fireworks at wholesale prices.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const categoryIdParam = typeof resolvedSearchParams.category === 'string' ? resolvedSearchParams.category : undefined;
  const categoryId = categoryIdParam === 'all' ? undefined : categoryIdParam;
  const search = typeof resolvedSearchParams.search === 'string' ? resolvedSearchParams.search : undefined;

  const categories = await getAllCategories();
  const totalProductsCount = categories.reduce((sum, cat: any) => sum + (cat._count?.products || 0), 0);

  return (
    <div className="min-h-screen bg-white pb-20 text-gray-900">
      <div className="container mx-auto px-4 mt-6">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* 4. FILTER SIDEBAR */}
          <aside className="!hidden lg:!block w-72 shrink-0">
            <div className="sticky top-28 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              
              {/* SEARCH SECTION */}
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Search className="h-4 w-4 text-primary" />
                  Search
                </h3>
                <form action="/shop" method="GET" className="relative">
                  {categoryId && <input type="hidden" name="category" value={categoryId} />}
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input 
                    type="text" 
                    name="search"
                    defaultValue={search || ''}
                    placeholder="Product, brand, SKU..." 
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </form>
              </div>
              
              {/* CATEGORIES SECTION */}
              <div className="p-4">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Filter className="h-4 w-4 text-primary" />
                  Categories
                </h3>
                
                <div className="flex flex-col gap-1 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
                  <Link 
                    href={`/shop${search ? `?search=${search}` : ''}`}
                    className={`flex items-center justify-between px-3 py-2 rounded-md text-sm transition-all duration-200 ${!categoryId ? 'bg-primary text-white font-bold shadow-md' : 'hover:bg-gray-50 text-gray-700'}`}
                  >
                    <span>All Products</span>
                  </Link>
                  {categories.map((cat: any) => {
                    const isSelected = categoryId === cat.slug || categoryId === cat.id;
                    return (
                      <Link 
                        key={cat.id}
                        href={`/shop?category=${cat.slug}${search ? `&search=${search}` : ''}`}
                        className={`flex items-center justify-between px-3 py-2 rounded-md text-sm transition-all duration-200 ${isSelected ? 'bg-primary text-white font-bold shadow-md' : 'hover:bg-gray-50 text-gray-700'}`}
                      >
                        <span className="line-clamp-1">{cat.name}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'}`}>{cat._count?.products || 0}</span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content with Suspense */}
          <Suspense fallback={<ShopSkeleton />}>
            <ShopContent 
              categoryId={categoryId} 
              search={search} 
              categories={categories} 
              totalProductsCount={totalProductsCount} 
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}