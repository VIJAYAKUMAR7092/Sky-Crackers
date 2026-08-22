import React from "react";
import Link from "next/link";
import { Search, ChevronRight, Check, Sparkles, Filter, SlidersHorizontal, ArrowDownWideNarrow } from "lucide-react";
import { getProducts, getAllCategories } from "@/lib/services/public/product.service";
import ScrollReveal from "@/components/public/ui/ScrollReveal";
import ProductListItem from "@/components/public/ui/ProductListItem";

export const dynamic = 'force-dynamic';

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

  // We fetch a high limit for wholesale view so we can show all products grouped
  const { products } = await getProducts({
    categoryId,
    search,
    limit: 1000 
  });
  
  const categories = await getAllCategories();

  // Group products by category (these are the filtered products for the main view)
  const groupedProducts: Record<string, any[]> = {};
  
  products.forEach((product: any) => {
    const catName = product.category?.name || "Uncategorized";
    if (!groupedProducts[catName]) {
      groupedProducts[catName] = [];
    }
    groupedProducts[catName].push(product);
  });

  // Calculate total products count for "All Products" link from the categories counts
  const totalProductsCount = categories.reduce((sum, cat: any) => sum + (cat._count?.products || 0), 0);

  return (
    <div className="min-h-screen bg-white pb-20 text-gray-900">
      
      <div className="container mx-auto px-4 mt-6">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* 4. FILTER SIDEBAR */}
          <aside className="w-full lg:w-72 shrink-0">
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
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${!categoryId ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'}`}>{totalProductsCount}</span>
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

          {/* Main Content */}
          <div className="flex-1">
            
            {/* Toolbar */}
            <ScrollReveal animation="fade-up">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <p className="text-sm text-gray-500">
                  Showing <strong className="text-gray-900 font-bold">{products.length}</strong> products
                </p>
                <div className="flex items-center gap-3">
                  <select className="text-sm border border-gray-300 rounded-md px-3 py-1.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none">
                    <option>↑↓ Default</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                  </select>
                  <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-gray-50">
                     <button className="px-3 py-1.5 bg-white text-gray-700 hover:text-primary transition-colors border-r border-gray-300">
                       <span className="sr-only">Grid</span>
                       <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                     </button>
                     <button className="px-3 py-1.5 bg-primary text-white">
                       <span className="sr-only">List</span>
                       <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                     </button>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* WHOLESALE TABLE VIEW */}
            {products.length > 0 ? (
              <div className="bg-white border border-primary/20 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto custom-scrollbar md:pb-2">
                    <table className="w-full text-left border-collapse md:min-w-[800px]">
                      {/* Unified Table Header matched to screenshot */}
                      <thead className="hidden md:table-header-group">
                        <tr className="bg-primary text-white text-xs font-bold uppercase tracking-wider">
                          <th className="px-4 py-3 w-16 text-center">#</th>
                          <th className="px-4 py-3">Name</th>
                          <th className="px-4 py-3 w-24 text-center">Pack</th>
                          <th className="px-4 py-3 w-28 text-center">Price</th>
                          <th className="px-4 py-3 w-32 text-center">Qty</th>
                          <th className="px-4 py-3 w-28 text-right">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 block md:table-row-group">
                        {Object.entries(groupedProducts).map(([categoryName, categoryProducts]) => (
                          <React.Fragment key={categoryName}>
                            {/* Centered Category Header Row */}
                            <tr className="bg-white border-b border-gray-200 group/cat">
                              <td colSpan={6} className="py-3 px-4 text-center">
                                <div className="inline-flex items-center justify-center gap-3">
                                  <h2 className="text-lg font-bold text-primary">{categoryName}</h2>
                                  <span className="bg-gray-100 text-gray-500 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-gray-200">
                                    {categoryProducts.length} Products
                                  </span>
                                </div>
                              </td>
                            </tr>
                            {/* Product Rows */}
                            {categoryProducts.map((product: any, idx: number) => (
                              <ProductListItem 
                                key={product.id} 
                                product={product} 
                                index={idx + 1} 
                              />
                            ))}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
              <ScrollReveal animation="fade-up">
                <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-gray-300 shadow-sm">
                  <div className="bg-gray-50 h-24 w-24 rounded-full flex items-center justify-center mx-auto mb-8 border border-gray-200">
                    <Search className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-gray-900 mb-4 drop-shadow-sm">No products found</h3>
                  <p className="text-gray-500 mb-10 max-w-md mx-auto text-lg font-medium">We couldn't find anything matching your search. Try adjusting the filters or explore our full collection.</p>
                  <Link href="/shop" className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-green-700 transition-all shadow-md hover:shadow-lg">
                    Clear All Filters
                  </Link>
                </div>
              </ScrollReveal>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
