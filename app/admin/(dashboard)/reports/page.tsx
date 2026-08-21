import React from 'react';
import { PageHeader } from '@/components/admin/layout/PageHeader';
import { requireAdmin } from '@/lib/auth/server-auth';
import { getFullAnalytics, getDashboardSalesSummary } from '@/lib/services/reports/report.service';
import ReportClient from './components/ReportClient';

export const metadata = {
  title: 'Reports & Analytics | Sky Crackers Admin',
};

interface ReportsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ReportsPage(props: ReportsPageProps) {
  await requireAdmin();
  const searchParams = await props.searchParams;
  const preset = (searchParams?.preset as string) || '30days';
  
  // Sequential fetches
  const analytics = await getFullAnalytics(preset);
  const summary = await getDashboardSalesSummary();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports & Analytics"
        description="Comprehensive view of store performance"
        breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Reports' }]}
      />
      <ReportClient initialData={analytics} summaryData={summary} currentPreset={preset} />
    </div>
  );
}
