import * as React from "react"
import { redirect } from "next/navigation"
import { getCurrentAdmin } from "../../../lib/auth/server-auth"
import { AdminLayoutClient } from "../../../components/admin/layout/AdminLayoutClient"

export const metadata = {
  title: "Admin Dashboard | Sky Crackers",
  description: "Sky Crackers Admin Dashboard",
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const admin = await getCurrentAdmin()

  // Although middleware protects /admin routes, we explicitly check here as well for type safety
  // and double protection.
  if (!admin) {
    redirect("/admin/login")
  }

  // Ensure notification service uses proper caching or is light enough
  const { getUnreadAdminNotificationCount } = await import('../../../lib/services/notifications/notification.service');
  const unreadCount = await getUnreadAdminNotificationCount();

  return (
    <AdminLayoutClient adminName={admin.email} adminRole={admin.role} unreadCount={unreadCount}>
      {children}
    </AdminLayoutClient>
  )
}
