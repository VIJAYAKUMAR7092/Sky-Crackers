import React, { Suspense } from 'react';
import { PageHeader } from '@/components/admin/layout/PageHeader';
import { requireAdmin } from '@/lib/auth/server-auth';
import { getFullHomepageCMS, ensureDefaultSections } from '@/lib/services/homepage/homepage.service';
import CMSClient from './components/CMSClient';
import { Loader2 } from 'lucide-react';

export const metadata = {
  title: 'Homepage CMS | Sky Crackers Admin',
};

function TableSkeleton() {
  return (
    <div className="w-full space-y-4 animate-pulse">
      <div className="h-16 w-full bg-card border border-border/50 rounded-xl" />
      <div className="h-64 w-full bg-card border border-border/50 rounded-xl flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary/50" />
      </div>
    </div>
  );
}

async function CMSDataWrapper() {
  await ensureDefaultSections();
  const cmsData = await getFullHomepageCMS();
  return <CMSClient initialData={cmsData} />;
}

export default async function CMSPage() {
  await requireAdmin();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Homepage CMS"
        description="Manage your storefront content and layout"
        breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'CMS' }]}
      />
      <Suspense fallback={<TableSkeleton />}>
        <CMSDataWrapper />
      </Suspense>
    </div>
  );
}
