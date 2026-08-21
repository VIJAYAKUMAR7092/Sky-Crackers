'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { ImageUploader, ImageItem } from '@/components/ui/ImageUploader';
import { Category, Product, ProductImage } from '@prisma/client';

type ProductWithImages = Product & { images: ProductImage[] };

interface ProductFormProps {
  categories: { id: string; name: string }[];
  initialData?: ProductWithImages;
}

export function ProductForm({ categories, initialData }: ProductFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<ImageItem[]>(
    initialData?.images?.map(img => ({
      id: img.id,
      url: img.url,
      altText: img.altText,
      displayOrder: img.displayOrder,
      isPrimary: img.isPrimary,
    })) || []
  );

  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    sku: initialData?.sku || '',
    categoryId: initialData?.categoryId || '',
    mrp: initialData?.mrp ? Number(initialData.mrp).toString() : '',
    sellingPrice: initialData?.sellingPrice ? Number(initialData.sellingPrice).toString() : '',
    discount: initialData?.discount ? Number(initialData.discount).toString() : '',
    shortDescription: initialData?.shortDescription || '',
    description: initialData?.description || '',
    packInfo: initialData?.packInfo || '',
    stockStatus: initialData?.stockStatus || 'IN_STOCK',
    featured: initialData?.featured || false,
    bestSeller: initialData?.bestSeller || false,
    newArrival: initialData?.newArrival || false,
    active: initialData?.active ?? true,
  });

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFormData(prev => ({
      ...prev,
      name,
      slug: !initialData ? generateSlug(name) : prev.slug, // Auto-generate slug only if new
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        mrp: Number(formData.mrp),
        sellingPrice: Number(formData.sellingPrice),
        discount: formData.discount ? Number(formData.discount) : null,
        sku: formData.sku?.trim() === '' ? null : formData.sku,
        images
      };

      const url = initialData ? `/api/admin/products/${initialData.id}` : '/api/admin/products';
      const method = initialData ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      
      if (!res.ok) {
        let errorMessage = 'Failed to save product';
        if (typeof data.error === 'string') {
          errorMessage = data.error;
        } else if (data.error?.details) {
          errorMessage = `Validation Error:\n${data.error.details.map((d: any) => d.message).join('\n')}`;
        } else if (data.error?.message) {
          errorMessage = data.error.message;
        }
        alert(errorMessage);
        return;
      }

      router.push('/admin/products');
      router.refresh();
    } catch (error) {
      console.error(error);
      alert('An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (categories.length === 0) {
    return (
      <div className="bg-card p-8 rounded-xl border shadow-sm text-center space-y-4 max-w-lg mx-auto mt-8">
        <div className="mx-auto w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-foreground">No Categories Found</h2>
        <p className="text-muted-foreground">You must create at least one category before you can add products.</p>
        <div className="pt-4 space-y-4">
          <Button asChild>
            <a href="/admin/categories/new">Create Category</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column (Main Info) */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-card p-6 rounded-xl border border-border shadow-sm space-y-4">
            <h2 className="text-lg font-semibold border-b border-border pb-2 mb-4 text-foreground">Basic Information</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleNameChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug *</Label>
                <Input id="slug" name="slug" value={formData.slug} onChange={handleChange} required />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sku">SKU</Label>
                <Input id="sku" name="sku" value={formData.sku} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="categoryId">Category *</Label>
                <select
                  id="categoryId"
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-foreground"
                >
                  <option value="" disabled>Select a category</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="shortDescription">Short Description</Label>
              <Input id="shortDescription" name="shortDescription" value={formData.shortDescription} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Full Description</Label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                className="flex w-full rounded-lg border border-input bg-background/50 backdrop-blur-sm px-4 py-3 text-sm ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary shadow-sm resize-y"
                placeholder="Detailed description of the product..."
              />
            </div>
          </div>

          <div className="bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-border/60 shadow-lg space-y-6">
            <h2 className="text-xl font-bold border-b border-border/50 pb-4 mb-2 text-foreground flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </span>
              Pricing
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="mrp" className="text-muted-foreground font-medium uppercase tracking-wider text-[10px]">MRP (₹) *</Label>
                <Input id="mrp" name="mrp" type="number" step="0.01" min="0" value={formData.mrp} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sellingPrice" className="text-muted-foreground font-medium uppercase tracking-wider text-[10px]">Selling Price (₹) *</Label>
                <Input id="sellingPrice" name="sellingPrice" type="number" step="0.01" min="0" value={formData.sellingPrice} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="discount" className="text-muted-foreground font-medium uppercase tracking-wider text-[10px]">Discount (₹)</Label>
                <Input id="discount" name="discount" type="number" step="0.01" min="0" value={formData.discount} onChange={handleChange} />
              </div>
            </div>
          </div>

          <div className="bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-border/60 shadow-lg space-y-6">
            <h2 className="text-xl font-bold border-b border-border/50 pb-4 mb-2 text-foreground flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </span>
              Product Images
            </h2>
            <ImageUploader images={images} onChange={setImages} />
          </div>
        </div>

        {/* Right Column (Status & Inventory) */}
        <div className="space-y-6">
          <div className="bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-border/60 shadow-lg space-y-6">
            <h2 className="text-xl font-bold border-b border-border/50 pb-4 mb-2 text-foreground flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </span>
              Status & Inventory
            </h2>
            <div className="space-y-2">
              <Label htmlFor="stockStatus" className="text-muted-foreground font-medium uppercase tracking-wider text-[10px]">Stock Status *</Label>
              <select
                id="stockStatus"
                name="stockStatus"
                value={formData.stockStatus}
                onChange={handleChange}
                className="flex h-11 w-full rounded-lg border border-input bg-background/50 backdrop-blur-sm px-4 py-2 text-sm ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary shadow-sm"
              >
                <option value="IN_STOCK">In Stock</option>
                <option value="OUT_OF_STOCK">Out of Stock</option>
              </select>
            </div>

            <div className="space-y-4 pt-4 border-t border-border/50">
              <label className="flex items-center space-x-3 p-3 border border-border/50 rounded-xl hover:bg-secondary/20 transition-colors cursor-pointer group">
                <input type="checkbox" name="active" checked={formData.active} onChange={handleChange} className="w-5 h-5 rounded border-input text-primary focus:ring-primary/50 bg-background cursor-pointer" />
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Active (Visible on store)</span>
              </label>
              <label className="flex items-center space-x-3 p-3 border border-border/50 rounded-xl hover:bg-secondary/20 transition-colors cursor-pointer group">
                <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} className="w-5 h-5 rounded border-input text-primary focus:ring-primary/50 bg-background cursor-pointer" />
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Featured Product</span>
              </label>
              <label className="flex items-center space-x-3 p-3 border border-border/50 rounded-xl hover:bg-secondary/20 transition-colors cursor-pointer group">
                <input type="checkbox" name="bestSeller" checked={formData.bestSeller} onChange={handleChange} className="w-5 h-5 rounded border-input text-primary focus:ring-primary/50 bg-background cursor-pointer" />
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Best Seller</span>
              </label>
              <label className="flex items-center space-x-3 p-3 border border-border/50 rounded-xl hover:bg-secondary/20 transition-colors cursor-pointer group">
                <input type="checkbox" name="newArrival" checked={formData.newArrival} onChange={handleChange} className="w-5 h-5 rounded border-input text-primary focus:ring-primary/50 bg-background cursor-pointer" />
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">New Arrival</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-6 border-t border-border">
        <Button variant="outline" type="button" onClick={() => router.back()} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : initialData ? 'Update Product' : 'Create Product'}
        </Button>
      </div>
    </form>
  );
}
