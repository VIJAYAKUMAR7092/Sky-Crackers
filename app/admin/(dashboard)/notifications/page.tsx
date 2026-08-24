import { Metadata } from 'next';
import { requireAdmin } from '@/lib/auth/server-auth';
import { getAdminNotifications, getUnreadAdminNotificationCount } from '@/lib/services/notifications/notification.service';
import NotificationsClient from './components/NotificationsClient';

export const metadata: Metadata = {
  title: 'Notifications | Sky Crackers Admin',
};

export default async function NotificationsPage(
  props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }
) {
  await requireAdmin();
  const searchParams = await props.searchParams;
  const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1;

  const data = await getAdminNotifications(page, 20);
  const unreadCount = await getUnreadAdminNotificationCount();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground dark:text-white">
          Notification Center
          {unreadCount > 0 && (
            <span className="ml-3 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
              {unreadCount} New
            </span>
          )}
        </h1>
      </div>
      <NotificationsClient initialData={data} />
    </div>
  );
}
