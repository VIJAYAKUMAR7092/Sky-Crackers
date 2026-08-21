import React from 'react';
import { PageHeader } from '@/components/admin/layout/PageHeader';
import { requireAdmin } from '@/lib/auth/server-auth';
import { getFullHomepageCMS, ensureDefaultSections } from '@/lib/services/homepage/homepage.service';
import CMSClient from './components/CMSClient';

export const metadata = {
  title: 'Homepage CMS | Sky Crackers Admin',
};

export default async function CMSPage() {
  await requireAdmin();
  await ensureDefaultSections();
  const cmsData = await getFullHomepageCMS();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Homepage CMS"
        description="Manage your storefront content and layout"
        breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'CMS' }]}
      />
      <CMSClient initialData={cmsData} />
    </div>
  );
}
