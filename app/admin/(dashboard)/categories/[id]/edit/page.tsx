import React from 'react';
import { requireAdmin } from '@/lib/auth/server-auth';
import { CategoryForm } from '../../components/CategoryForm';
import { getCategoryById } from '@/lib/services/categories/category.service';
import { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Edit Category | Sky Crackers Admin',
};

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  await requireAdmin();

  let category;
  try {
    category = await getCategoryById(resolvedParams.id);
  } catch (error) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 border-b pb-4">
        <Link href="/admin/categories" className="p-2 hover:bg-muted/50 dark:hover:bg-slate-800 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Edit Category</h1>
          <p className="text-sm text-muted-foreground">
            Make changes to the {category.name} category.
          </p>
        </div>
      </div>

      <CategoryForm initialData={category} />
    </div>
  );
}
