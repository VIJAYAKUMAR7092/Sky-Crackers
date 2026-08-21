import React from 'react';
import { requireAdmin } from '@/lib/auth/server-auth';
import { CategoryForm } from '../components/CategoryForm';
import { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Add Category | Sky Crackers Admin',
};

export default async function NewCategoryPage() {
  await requireAdmin();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 border-b pb-4">
        <Link href="/admin/categories" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Add Category</h1>
          <p className="text-sm text-muted-foreground">
            Create a new category for your products.
          </p>
        </div>
      </div>

      <CategoryForm />
    </div>
  );
}
