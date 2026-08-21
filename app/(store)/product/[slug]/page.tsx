import React from "react";
import { getProductBySlug, getProducts } from "@/lib/services/public/product.service";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, Package } from "lucide-react";
import ProductCard from "@/components/public/ui/ProductCard";
import ProductGallery from "@/components/public/product/ProductGallery";
import ProductActions from "@/components/public/product/ProductActions";
import ProductTabs from "@/components/public/product/ProductTabs";
import ProductReviews from "@/components/public/product/ProductReviews";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.name} | Sky Crackers Premium`,
    description: product.shortDescription || product.description?.substring(0, 160) || "Premium Sivakasi fireworks delivered across Tamil Nadu.",
    openGraph: {
      title: product.name,
      description: product.shortDescription || "",
      images: product.images?.length ? [{ url: product.images[0].url }] : [],
    }
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const { products: relatedProducts } = await getProducts({ 
    categoryId: product.categoryId || undefined,
    limit: 5
  });
  
  const filteredRelated = relatedProducts.filter((p: any) => p.id !== product.id).slice(0, 4);

  const hasDiscount = product.discount && Number(product.discount) > 0;
  const isOutOfStock = product.stockStatus === "OUT_OF_STOCK";

  return (
    <div className="bg-[#050505] min-h-screen pb-24 selection:bg-primary/30 selection:text-white pt-24">
      <div className="absolute top-0 right-0 w-1/2 h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-[40%] left-[-20%] w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <nav className="flex items-center text-xs text-zinc-500 font-bold uppercase tracking-widest mb-10 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="mx-3 text-zinc-700">/</span>
          <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <span className="mx-3 text-zinc-700">/</span>
          {product.category && (
            <>
              <Link href={`/shop?category=${product.category.slug || product.categoryId}`} className="hover:text-primary transition-colors">
                {product.category.name}
              </Link>
              <span className="mx-3 text-zinc-700">/</span>
            </>
          )}
          <span className="text-white truncate max-w-[200px] sm:max-w-none">{product.name}</span>
        </nav>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-20">
          <div className="relative">
            <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
              {hasDiscount && !isOutOfStock && (
                <div className="bg-primary/90 text-black text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider backdrop-blur-md shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                  Save ₹{Number(product.discount).toFixed(0)}
                </div>
              )}
              {product.featured && (
                <div className="bg-amber-500 text-black text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider shadow-lg">
                  Featured
                </div>
              )}
              {isOutOfStock && (
                <div className="bg-red-500 text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider shadow-lg">
                  Out of Stock
                </div>
              )}
            </div>
            <ProductGallery images={product.images || []} productName={product.name} />
          </div>

          <div className="flex flex-col pt-2 lg:pt-8">
            <div className="mb-4 text-primary font-bold tracking-[0.2em] uppercase text-xs flex items-center gap-2">
              {product.category?.name || "Premium Collection"}
              {product.sku && <span className="text-zinc-600">| SKU: {product.sku}</span>}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-[1.1] tracking-tight drop-shadow-lg">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-white/10">
              <div className="flex flex-col gap-1">
                <div className="flex items-end gap-3">
                  <span className="text-4xl font-extrabold text-white tracking-tight drop-shadow-sm">
                    ₹{Number(product.sellingPrice).toFixed(2)}
                  </span>
                  {Number(product.mrp) > Number(product.sellingPrice) && (
                    <span className="text-lg text-zinc-500 line-through font-medium mb-1">
                      ₹{Number(product.mrp).toFixed(2)}
                    </span>
                  )}
                </div>
                <span className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Inclusive of all taxes</span>
              </div>
            </div>

            <div className="text-zinc-400 font-light text-base leading-relaxed mb-10 max-w-xl">
              {product.shortDescription || product.description || "Experience the brilliant display and magnificent sound of this premium firework. Perfect for making your celebrations unforgettable."}
            </div>

            <ProductActions 
              product={{
                id: product.id,
                name: product.name,
                slug: product.slug,
                price: Number(product.sellingPrice),
                mrp: Number(product.mrp),
                imageUrl: product.images?.[0]?.url || "/placeholder.png",
                packInfo: product.packInfo || undefined,
                stockStatus: product.stockStatus
              }} 
            />

            <div className="mt-12 grid grid-cols-2 gap-4 border-t border-white/10 pt-8">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 transition-colors">
                <div className="bg-zinc-900 p-3 rounded-full text-primary border border-white/10">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Authentic</span>
                  <span className="text-[10px] text-zinc-500">100% Genuine</span>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 transition-colors">
                <div className="bg-zinc-900 p-3 rounded-full text-primary border border-white/10">
                  <Package className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Packaging</span>
                  <span className="text-[10px] text-zinc-500">Safe & Secure</span>
                </div>
              </div>
            </div>
            
            <ProductTabs 
              description={product.description} 
              packInfo={product.packInfo} 
              sku={product.sku} 
            />
          </div>
        </div>

        <ProductReviews />
      </div>

      {filteredRelated.length > 0 && (
        <div className="container mx-auto px-4 md:px-8 py-24 mt-20 border-t border-white/10 relative">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
          
          <div className="flex flex-col items-center text-center mb-16 relative z-10">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Explore Related</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-transparent via-primary to-transparent" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {filteredRelated.map((p: any) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
