'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  orderId?: string | null;
}

interface NotificationsClientProps {
  initialData: {
    notifications: Notification[];
    total: number;
    totalPages: number;
    currentPage: number;
  };
}

export default function NotificationsClient({ initialData }: NotificationsClientProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleMarkAsRead = async (id: string) => {
    setIsSubmitting(true);
    try {
      await fetch(`/api/admin/notifications/${id}`, { method: 'PATCH' });
      router.refresh();
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMarkAllAsRead = async () => {
    setIsSubmitting(true);
    try {
      await fetch('/api/admin/notifications', { method: 'PATCH' });
      router.refresh();
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsSubmitting(true);
    try {
      await fetch(`/api/admin/notifications/${deleteId}`, { method: 'DELETE' });
      setDeleteId(null);
      router.refresh();
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button variant="outline" onClick={handleMarkAllAsRead} disabled={isSubmitting || initialData.notifications.length === 0}>
          Mark all as read
        </Button>
      </div>

      <Card className="border-border/60 shadow-lg bg-card/50 backdrop-blur-sm overflow-hidden fade-in-up">
        <CardContent className="p-0">
          {initialData.notifications.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">No notifications found.</div>
          ) : (
            <ul className="divide-y divide-border">
              {initialData.notifications.map((notif) => (
                <li key={notif.id} className={`p-4 flex flex-col sm:flex-row gap-4 justify-between transition-colors ${notif.isRead ? 'bg-card' : 'bg-primary/5 border-l-4 border-l-primary'}`}>
                  <div className="flex-1 space-y-1 pl-1">
                    <div className="flex items-center gap-2">
                      {!notif.isRead && <span className="w-2 h-2 rounded-full bg-primary shrink-0"></span>}
                      <h4 className={`text-sm font-semibold ${notif.isRead ? 'text-muted-foreground' : 'text-foreground'}`}>
                        {notif.title}
                      </h4>
                      <span className="text-xs font-medium text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-md">
                        {notif.type.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground pt-1">
                      {notif.message}
                    </p>
                    {notif.orderId && (
                      <div className="pt-2">
                        <a href={`/admin/orders/${notif.orderId}`} className="text-xs font-semibold text-primary hover:underline">
                          View Order #{notif.orderId.slice(-8)}
                        </a>
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground/60 pt-1">
                      {format(new Date(notif.createdAt), 'MMM dd, yyyy HH:mm')}
                    </p>
                  </div>
                  
                  <div className="flex space-x-2 shrink-0 items-start">
                    {!notif.isRead && (
                      <Button variant="outline" size="sm" onClick={() => handleMarkAsRead(notif.id)} disabled={isSubmitting}>
                        Mark Read
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10" onClick={() => setDeleteId(notif.id)} disabled={isSubmitting}>
                      Delete
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {/* Basic pagination controls */}
      {initialData.totalPages > 1 && (
        <div className="flex justify-between items-center mt-4 bg-card border border-border p-3 rounded-xl shadow-sm">
          <Button 
            variant="outline" 
            disabled={initialData.currentPage === 1}
            onClick={() => router.push(`/admin/notifications?page=${initialData.currentPage - 1}`)}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground font-medium">
            Page {initialData.currentPage} of {initialData.totalPages}
          </span>
          <Button 
            variant="outline" 
            disabled={initialData.currentPage === initialData.totalPages}
            onClick={() => router.push(`/admin/notifications?page=${initialData.currentPage + 1}`)}
          >
            Next
          </Button>
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Notification"
        description="Are you sure you want to delete this notification? This action cannot be undone."
        isLoading={isSubmitting}
      />
    </div>
  );
}
