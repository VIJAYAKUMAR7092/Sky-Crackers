import { Metadata } from 'next';
import { requireAdmin } from '@/lib/auth/server-auth';
import { getAllSettings } from '@/lib/services/settings/settings.service';
import SettingsClient from './components/SettingsClient';
import { Loader2 } from 'lucide-react';
import React, { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Settings | Sky Crackers Admin',
};

function SettingsSkeleton() {
  return (
    <div className="w-full space-y-4 animate-pulse">
      <div className="h-16 w-full bg-card border border-border/50 rounded-xl" />
      <div className="h-64 w-full bg-card border border-border/50 rounded-xl flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary/50" />
      </div>
    </div>
  );
}

async function SettingsDataWrapper() {
  const settings = await getAllSettings();
  return <SettingsClient initialData={settings} />;
}

export default async function SettingsPage() {
  await requireAdmin();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground dark:text-white">Settings Management</h1>
      </div>
      <Suspense fallback={<SettingsSkeleton />}>
        <SettingsDataWrapper />
      </Suspense>
    </div>
  );
}
