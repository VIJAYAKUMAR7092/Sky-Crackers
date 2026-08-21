"use client"

import * as React from "react"
import { Sidebar } from "./Sidebar"
import { TopNavbar } from "./TopNavbar"

interface AdminLayoutClientProps {
  children: React.ReactNode
  adminName: string
  adminRole: string
  unreadCount?: number
}

export function AdminLayoutClient({ children, adminName, adminRole, unreadCount = 0 }: AdminLayoutClientProps) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)

  // Close sidebar on route change automatically if we were using a real layout,
  // but Sidebar.tsx already handles onClick={() => setIsOpen(false)} on links.

  return (
    <div className="flex min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      <Sidebar 
        userRole={adminRole} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
      />
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        <TopNavbar 
          onMenuClick={() => setIsSidebarOpen(true)} 
          adminName={adminName} 
          adminRole={adminRole} 
          unreadCount={unreadCount}
        />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
