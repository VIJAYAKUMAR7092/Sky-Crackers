import React from "react";
import Link from "next/link";
import { Search, ChevronRight, Check, Sparkles, Filter, SlidersHorizontal, ArrowDownWideNarrow } from "lucide-react";
import { getProducts, getAllCategories } from "@/lib/services/public/product.service";
import ScrollReveal from "@/components/public/ui/ScrollReveal";
import ProductListItem from "@/components/public/ui/ProductListItem";

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
  const categoryId = typeof resolvedSearchParams.category === 'string' ? resolvedSearchParams.category : undefined;
  const search = typeof resolvedSearchParams.search === 'string' ? resolvedSearchParams.search : undefined;

  // We fetch a high limit for wholesale view so we can show all products grouped
  const { products } = await getProducts({
    categoryId,
    search,
    limit: 1000 
  });
  
  const categories = await getAllCategories();

  // Group products by category
  const groupedProducts: Record<string, any[]> = {};
  
  // Initialize with all categories to maintain order if we want, or just group what we have
  products.forEach((product: any) => {
    const catName = product.category?.name || "Uncategorized";
    if (!groupedProducts[catName]) {
      groupedProducts[catName] = [];
    }
    groupedProducts[catName].push(product);
  });

  return (
    <div className="min-h-screen bg-[#050505] pb-20 selection:bg-primary/30">
      
      {/* 1. SHOP HEADER */}
      <div className="relative pt-8 pb-12 md:pt-12 md:pb-16 overflow-hidden mb-12">
        <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#050505]" />
        
        {/* Animated Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />

        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal animation="fade-up">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-xs font-bold uppercase tracking-widest text-primary">Wholesale Catalog</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight drop-shadow-lg">
                Premium Fireworks <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-300">Collection</span>
              </h1>
              <p className="text-zinc-400 text-lg md:text-xl font-light">
                Explore Authentic Sivakasi Crackers For Every Celebration. Direct wholesale pricing for premium quality.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* 4. FILTER SIDEBAR */}
          <aside className="w-full lg:w-72 shrink-0">
            <div className="sticky top-28 bg-[#0a0a0a]/80 backdrop-blur-2xl rounded-[2rem] p-6 md:p-8 border border-white/5 shadow-2xl">
              
              {/* 5. SEARCH EXPERIENCE */}
              <div className="mb-10 relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-zinc-500 group-focus-within:text-primary transition-colors" />
                </div>
                <form action="/shop" method="GET">
                  {categoryId && <input type="hidden" name="category" value={categoryId} />}
                  <input 
                    type="text" 
                    name="search"
                    defaultValue={search || ''}
                    placeholder="Search crackers..." 
                    className="w-full bg-white/5 border-white/10 focus:border-primary/50 focus:ring-primary/50 text-white rounded-2xl pl-12 pr-4 py-4 transition-all"
                  />
                </form>
              </div>
              
              {/* Categories Filter */}
              <div className="mb-8">
                <h3 className="font-bold text-sm tracking-widest uppercase text-white mb-6 flex items-center justify-between">
                  Categories <ChevronRight className="h-4 w-4 text-zinc-600" />
                </h3>
                <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                  <Link 
                    href={`/shop${search ? `?search=${search}` : ''}`}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all duration-300 ${!categoryId ? 'bg-primary/10 text-primary font-bold border border-primary/20' : 'hover:bg-white/5 text-zinc-400 hover:text-white border border-transparent'}`}
                  >
                    <span>All Products</span>
                  </Link>
                  {categories.map(cat => (
                    <Link 
                      key={cat.id}
                      href={`/shop?category=${cat.id}${search ? `&search=${search}` : ''}`}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all duration-300 ${categoryId === cat.id ? 'bg-primary/10 text-primary font-bold border border-primary/20' : 'hover:bg-white/5 text-zinc-400 hover:text-white border border-transparent'}`}
                    >
                      <span className="line-clamp-1">{cat.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            
            {/* Toolbar */}
            <ScrollReveal animation="fade-up">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8 bg-[#0a0a0a] p-5 rounded-[2rem] border border-white/5 shadow-xl">
                <p className="text-sm font-medium text-zinc-400">
                  Showing <strong className="text-white text-lg">{products.length}</strong> premium products
                </p>
                <div className="flex items-center gap-3 text-sm">
                  <div className="bg-white/5 p-2 rounded-full border border-white/10">
                    <ArrowDownWideNarrow className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-zinc-400">Wholesale Price List Format</span>
                </div>
              </div>
            </ScrollReveal>

            {/* WHOLESALE TABLE VIEW */}
            {products.length > 0 ? (
              <div className="space-y-12">
                {Object.entries(groupedProducts).map(([categoryName, categoryProducts]) => (
                  <ScrollReveal key={categoryName} animation="fade-up">
                    <div className="bg-[#0a0a0a]/50 border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
                      
                      {/* Category Header */}
                      <div className="bg-gradient-to-r from-zinc-900 to-black px-6 py-4 flex items-center justify-between border-b border-white/10">
                        <h2 className="text-lg md:text-xl font-black text-white tracking-wide uppercase flex items-center gap-3">
                          <span className="w-2 h-6 bg-primary rounded-full"></span>
                          {categoryName}
                        </h2>
                        <span className="bg-white/5 text-zinc-400 text-xs font-bold px-3 py-1 rounded-full border border-white/10">
                          {categoryProducts.length} Items
                        </span>
                      </div>
                      
                      {/* Table Container (Horizontal scroll on md screens, Stacked cards on mobile) */}
                      <div className="overflow-x-auto custom-scrollbar md:pb-2">
                        <table className="w-full text-left border-collapse md:min-w-[800px]">
                          <thead className="hidden md:table-header-group">
                            <tr className="bg-white/5 text-xs uppercase tracking-widest font-bold text-zinc-400 border-b border-white/10">
                              <th className="px-4 py-4 w-16">S.No</th>
                              <th className="px-4 py-4 w-20">Image</th>
                              <th className="px-4 py-4">Product Name</th>
                              <th className="px-4 py-4 w-32">Pack</th>
                              <th className="px-4 py-4 w-32">Price</th>
                              <th className="px-4 py-4 w-40">Qty</th>
                              <th className="px-4 py-4 w-32 text-right">Total</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5 md:divide-y-0 block md:table-row-group">
                            {categoryProducts.map((product: any, idx: number) => (
                              <ProductListItem 
                                key={product.id} 
                                product={product} 
                                index={idx + 1} 
                              />
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            ) : (
              <ScrollReveal animation="fade-up">
                <div className="text-center py-32 bg-[#0a0a0a] rounded-[3rem] border border-dashed border-white/10 shadow-2xl">
                  <div className="bg-white/5 h-24 w-24 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/10">
                    <Search className="h-10 w-10 text-zinc-600" />
                  </div>
                  <h3 className="text-3xl font-extrabold text-white mb-4 drop-shadow-md">No products found</h3>
                  <p className="text-zinc-400 mb-10 max-w-md mx-auto text-lg font-light">We couldn't find anything matching your search. Try adjusting the filters or explore our full collection.</p>
                  <Link href="/shop" className="inline-flex items-center justify-center px-8 py-4 bg-primary text-black font-extrabold rounded-full hover:bg-amber-400 hover:-translate-y-1 transition-all shadow-[0_10px_30px_rgba(212,175,55,0.3)]">
                    Clear All Filters
                  </Link>
                </div>
              </ScrollReveal>
            )}
            
            {/* Note: Pagination removed for wholesale single-page list style as requested */}
          </div>
        </div>
      </div>
    </div>
  );
}
