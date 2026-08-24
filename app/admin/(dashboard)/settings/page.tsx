import { Metadata } from 'next';
import { requireAdmin } from '@/lib/auth/server-auth';
import { getAllSettings } from '@/lib/services/settings/settings.service';
import SettingsClient from './components/SettingsClient';

export const metadata: Metadata = {
  title: 'Settings | Sky Crackers Admin',
};

export default async function SettingsPage() {
  await requireAdmin();
  const settings = await getAllSettings();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground dark:text-white">Settings Management</h1>
      </div>
      <SettingsClient initialData={settings} />
    </div>
  );
}
