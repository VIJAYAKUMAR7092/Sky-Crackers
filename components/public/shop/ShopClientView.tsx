"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Grid, List } from "lucide-react";
import ProductListItem from "@/components/public/ui/ProductListItem";
import MobileProductRow from "@/components/public/ui/MobileProductRow";
import ProductCard from "@/components/public/ui/ProductCard";
import ScrollReveal from "@/components/public/ui/ScrollReveal";

interface ShopClientViewProps {
  products: any[];
  groupedProducts: Record<string, any[]>;
  categories: any[];
  categoryId: string | undefined;
  search: string | undefined;
  totalProductsCount: number;
}

export default function ShopClientView({
  products,
  groupedProducts,
  categories,
  categoryId,
  search,
  totalProductsCount,
}: ShopClientViewProps) {
  // Try to load initial view mode from localStorage (default to 'list' for wholesale style)
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  return (
    <div className="flex-1 w-full max-w-full">
      {/* MOBILE CATEGORY NAVIGATION (Horizontal Scroll) */}
      <div className="lg:hidden mb-6 -mx-4 px-4 overflow-x-auto custom-scrollbar flex items-center gap-2 pb-2">
        <Link
          href={`/shop${search ? `?search=${search}` : ""}`}
          className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all border ${
            !categoryId
              ? "bg-primary border-primary text-white shadow-md"
              : "bg-white border-gray-200 text-gray-700 hover:border-primary/50"
          }`}
        >
          <span>All</span>
        </Link>
        {categories.map((cat: any) => {
          const isSelected = categoryId === cat.slug || categoryId === cat.id;
          return (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.slug}${search ? `&search=${search}` : ""}`}
              className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all border ${
                isSelected
                  ? "bg-primary border-primary text-white shadow-md"
                  : "bg-white border-gray-200 text-gray-700 hover:border-primary/50"
              }`}
            >
              <span>{cat.name}</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full ${
                  isSelected ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                }`}
              >
                {cat._count?.products || 0}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Toolbar */}
      <ScrollReveal animation="fade-up">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-500">
            Showing <strong className="text-gray-900 font-bold">{products.length}</strong> products
          </p>
          <div className="flex w-full sm:w-auto justify-between sm:justify-end items-center gap-3">
            <select className="text-sm border border-gray-300 rounded-md px-3 py-2 focus:border-primary focus:ring-1 focus:ring-primary outline-none">
              <option>↑↓ Default</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-gray-50 shadow-sm shrink-0">
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center justify-center px-4 py-2 transition-colors border-r border-gray-300 ${
                  viewMode === "grid" ? "bg-primary text-white" : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Grid className="w-4 h-4" />
                <span className="ml-2 text-sm font-bold hidden sm:inline-block">Grid</span>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`flex items-center justify-center px-4 py-2 transition-colors ${
                  viewMode === "list" ? "bg-primary text-white" : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                <List className="w-4 h-4" />
                <span className="ml-2 text-sm font-bold hidden sm:inline-block">List</span>
              </button>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* SEPARATE CATEGORY PRODUCT SECTIONS */}
      {products.length > 0 ? (
        <div className="space-y-4 md:space-y-12">
          
          {/* MOBILE LIST VIEW GLOBAL HEADER (Matches Screenshot 2) */}
          {viewMode === "list" && (
            <div className="md:hidden sticky top-[60px] z-30 flex items-center bg-primary text-white text-[11px] font-bold uppercase tracking-wider py-2.5 px-1 rounded-md shadow-md mb-2">
               <div className="flex-1 text-center pr-4">NAME</div>
               <div className="w-[52px] text-center">PRICE</div>
               <div className="w-[44px] text-center">QTY</div>
               <div className="w-[52px] text-right pr-2">TOTAL</div>
            </div>
          )}

          {Object.entries(groupedProducts).map(([categoryName, categoryProducts]) => (
            <div
              key={categoryName}
              className="bg-white border-0 md:border-2 border-primary/20 rounded-none md:rounded-2xl overflow-hidden shadow-none md:shadow-sm flex flex-col mb-4 md:mb-0"
            >
              {/* Category Heading (Matches Screenshot 2 for Mobile) */}
              <div className="bg-white md:bg-gradient-to-r md:from-orange-50 md:to-white border-b border-primary/20 p-2 md:p-5 flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-3">
                <h2 className="text-[16px] md:text-2xl font-bold text-primary md:tracking-wide text-center">
                  {categoryName}
                </h2>
                <span className="bg-gray-100 md:bg-primary/10 text-gray-700 md:text-primary text-[9px] md:text-sm font-bold px-2 py-0.5 md:py-1 rounded-full">
                  {categoryProducts.length} {categoryProducts.length === 1 ? "Product" : "Products"}
                </span>
              </div>

              {/* Product Grid / List */}
              {viewMode === "list" ? (
                <>
                  {/* DESKTOP LIST VIEW (Unchanged) */}
                  <div className="hidden md:block overflow-x-auto custom-scrollbar w-full">
                    <table className="w-full text-left border-collapse table-fixed min-w-[320px]">
                      <thead className="table-header-group">
                        <tr className="bg-primary text-white text-xs font-bold uppercase tracking-wider">
                          <th className="px-2 py-3 w-auto">Name</th>
                          <th className="px-2 py-3 w-24 text-center">Price</th>
                          <th className="px-2 py-3 w-28 text-center">Qty</th>
                          <th className="px-2 py-3 w-24 text-right">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 table-row-group">
                        {categoryProducts.map((product: any, idx: number) => (
                          <ProductListItem key={product.id} product={product} index={idx + 1} />
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* MOBILE LIST VIEW (Matches Screenshot 2) */}
                  <div className="block md:hidden flex flex-col border-b border-primary/20">
                    {categoryProducts.map((product: any) => (
                      <MobileProductRow key={product.id} product={product} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="p-2 md:p-6 bg-gray-50/50">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-5">
                    {categoryProducts.map((product: any) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <ScrollReveal animation="fade-up">
          <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-gray-300 shadow-sm">
            <div className="bg-gray-50 h-24 w-24 rounded-full flex items-center justify-center mx-auto mb-8 border border-gray-200">
              <Search className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-extrabold text-gray-900 mb-4 drop-shadow-sm">
              No products found
            </h3>
            <p className="text-gray-500 mb-10 max-w-md mx-auto text-lg font-medium">
              We couldn't find anything matching your search. Try adjusting the filters or explore our full
              collection.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-orange-700 transition-all shadow-md hover:shadow-lg"
            >
              Clear All Filters
            </Link>
          </div>
        </ScrollReveal>
      )}
    </div>
  );
}