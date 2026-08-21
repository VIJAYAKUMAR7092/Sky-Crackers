'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { ImageUploader, ImageItem } from '@/components/ui/ImageUploader';
import { Category } from '@prisma/client';

interface CategoryFormProps {
  initialData?: Category;
}

export function CategoryForm({ initialData }: CategoryFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Reuse ImageUploader format
  const [images, setImages] = useState<ImageItem[]>(
    initialData?.image ? [{ id: '1', url: initialData.image, isPrimary: true, displayOrder: 0 }] : []
  );

  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    description: initialData?.description || '',
    displayOrder: initialData?.displayOrder?.toString() || '0',
    active: initialData?.active ?? true,
  });

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFormData((prev) => ({
      ...prev,
      name,
      slug: !initialData ? generateSlug(name) : prev.slug,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        displayOrder: Number(formData.displayOrder),
        image: images.length > 0 ? images[0].url : null,
      };

      const url = initialData ? `/api/admin/categories/${initialData.id}` : '/api/admin/categories';
      const method = initialData ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.error?.details) {
          alert(`Validation Error:\n${data.error.details.map((d: { message: string }) => d.message).join('\n')}`);
        } else {
          alert(`Error: ${data.error?.message || 'Failed to save category'}`);
        }
        return;
      }

      router.push('/admin/categories');
      router.refresh();
    } catch (error) {
      console.error(error);
      alert('An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column (Main Info) */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-card p-6 rounded-xl border shadow-sm space-y-4">
            <h2 className="text-lg font-semibold border-b pb-2 mb-4">Basic Information</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Category Name *</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleNameChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug *</Label>
                <Input id="slug" name="slug" value={formData.slug} onChange={handleChange} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="flex w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300"
              />
            </div>
          </div>

          <div className="bg-card p-6 rounded-xl border shadow-sm space-y-4">
            <h2 className="text-lg font-semibold border-b pb-2 mb-4">Category Image</h2>
            <ImageUploader images={images} onChange={setImages} />
            <p className="text-sm text-muted-foreground mt-2">Only the first image will be used for the category.</p>
          </div>
        </div>

        {/* Right Column (Status, etc) */}
        <div className="space-y-6">
          <div className="bg-card p-6 rounded-xl border shadow-sm space-y-4">
            <h2 className="text-lg font-semibold border-b pb-2 mb-4">Settings</h2>
            <div className="space-y-2">
              <Label htmlFor="displayOrder">Display Order</Label>
              <Input id="displayOrder" name="displayOrder" type="number" min="0" value={formData.displayOrder} onChange={handleChange} />
              <p className="text-xs text-muted-foreground">Lower numbers appear first.</p>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <label className="flex items-center space-x-2">
                <input type="checkbox" name="active" checked={formData.active} onChange={handleChange} className="rounded border-gray-300 text-primary focus:ring-primary" />
                <span className="text-sm font-medium">Active (Visible on store)</span>
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
          {isSubmitting ? 'Saving...' : initialData ? 'Update Category' : 'Create Category'}
        </Button>
      </div>
    </form>
  );
}
