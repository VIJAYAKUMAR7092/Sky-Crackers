import React, { Suspense } from 'react';
import { PageHeader } from '@/components/admin/layout/PageHeader';
import { requireAdmin } from '@/lib/auth/server-auth';
import { getFullAnalytics, getDashboardSalesSummary } from '@/lib/services/reports/report.service';
import ReportClient from './components/ReportClient';
import { Loader2 } from 'lucide-react';

export const metadata = {
  title: 'Reports & Analytics | Sky Crackers Admin',
};

interface ReportsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

function ReportSkeleton() {
  return (
    <div className="w-full space-y-4 animate-pulse">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-32 bg-card border border-border/50 rounded-xl" />
        ))}
      </div>
      <div className="h-96 w-full bg-card border border-border/50 rounded-xl flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary/50" />
      </div>
    </div>
  );
}

async function ReportDataWrapper({ preset }: { preset: string }) {
  const [analytics, summary] = await Promise.all([
    getFullAnalytics(preset),
    getDashboardSalesSummary()
  ]);

  return <ReportClient initialData={analytics} summaryData={summary} currentPreset={preset} />;
}

export default async function ReportsPage(props: ReportsPageProps) {
  await requireAdmin();
  const searchParams = await props.searchParams;
  const preset = (searchParams?.preset as string) || '30days';

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports & Analytics"
        description="Comprehensive view of store performance"
        breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Reports' }]}
      />
      <Suspense fallback={<ReportSkeleton />}>
        <ReportDataWrapper preset={preset} />
      </Suspense>
    </div>
  );
}
