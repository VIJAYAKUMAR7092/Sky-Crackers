import re

with open('components/public/shop/ShopClientView.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

if 'import MobileProductRow' not in content:
    content = content.replace(
        'import ProductListItem from "@/components/public/ui/ProductListItem";',
        'import ProductListItem from "@/components/public/ui/ProductListItem";\nimport MobileProductRow from "@/components/public/ui/MobileProductRow";'
    )

parts = content.split('{/* SEPARATE CATEGORY PRODUCT SECTIONS */}')

new_content = parts[0] + """{/* SEPARATE CATEGORY PRODUCT SECTIONS */}
      {products.length > 0 ? (
        <div className="space-y-4 md:space-y-12">
          
          {/* MOBILE LIST VIEW GLOBAL HEADER (Matches Screenshot 2) */}
          {viewMode === "list" && (
            <div className="block md:hidden sticky top-[60px] z-30 flex items-center bg-primary text-white text-[11px] font-bold uppercase tracking-wider py-2.5 px-1 rounded-md shadow-md mb-2">
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
                  <div className="block md:hidden flex flex-col">
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
      ) : (""" + parts[1].split(') : (')[1]

with open('components/public/shop/ShopClientView.tsx', 'w', encoding='utf-8') as f:
    f.write(new_content)
