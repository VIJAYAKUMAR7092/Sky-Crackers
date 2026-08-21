"use client"

import * as React from "react"
import { Menu, Bell, Sun, Moon, LogOut, ChevronDown, UserCircle2 } from "lucide-react"
import { useTheme } from "next-themes"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "../../ui/Button"
import { Search } from "../../ui/Search"
import { cn } from "../../ui/utils"

interface TopNavbarProps {
  onMenuClick: () => void
  adminName: string
  adminRole: string
  unreadCount?: number
}

export function TopNavbar({ onMenuClick, adminName, adminRole, unreadCount = 0 }: TopNavbarProps) {
  const { setTheme, resolvedTheme } = useTheme()
  const router = useRouter()
  const [mounted, setMounted] = React.useState(false)
  const [dropdownOpen, setDropdownOpen] = React.useState(false)

  // Use a ref to detect outside clicks
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  // Wait until mounted to avoid hydration mismatch on theme icons
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  // Close dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [dropdownOpen])

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-xl sm:px-6 shadow-sm">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden transition-colors"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </button>
        
        <div className="hidden md:flex">
          <Search placeholder="Search dashboard..." />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 relative">
        {mounted && (
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground hover:bg-muted/50"
            onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
            aria-label="Toggle theme"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        )}

        <Button 
          variant="ghost" 
          size="icon" 
          className="relative text-muted-foreground hover:text-foreground hover:bg-muted/50" 
          aria-label="Notifications"
          onClick={() => router.push("/admin/notifications")}
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground ring-2 ring-background">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </Button>

        <div className="h-6 w-px bg-border mx-1"></div>

        {/* Profile Dropdown Container */}
        <div className="relative" ref={dropdownRef}>
          <button 
            className="flex items-center gap-2 hover:bg-muted/50 p-1 pr-2 rounded-full transition-colors focus:outline-none group"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-expanded={dropdownOpen}
            aria-haspopup="true"
          >
            <div className="hidden flex-col items-end sm:flex px-2">
              <span className="text-sm font-semibold leading-none text-foreground">{adminName}</span>
              <span className="mt-1 text-[10px] uppercase tracking-wider font-medium leading-none text-muted-foreground">{adminRole}</span>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/20 shadow-sm group-hover:bg-primary group-hover:text-primary-foreground transition-all">
              <UserCircle2 className="h-5 w-5" />
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-popover shadow-lg ring-1 ring-black/5 focus:outline-none divide-y divide-border border border-border animate-in slide-in-from-top-2">
              <div className="px-4 py-3 sm:hidden">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Signed in as</p>
                <p className="truncate text-sm font-semibold text-foreground mt-1">{adminName}</p>
              </div>
              <div className="py-1">
                <button
                  onClick={() => {
                    setDropdownOpen(false)
                    router.push("/admin/settings")
                  }}
                  className="group flex w-full items-center px-4 py-2.5 text-sm text-foreground hover:bg-muted/50 transition-colors"
                >
                  Account Settings
                </button>
              </div>
              <div className="py-1">
                <button
                  onClick={() => signOut({ callbackUrl: "/admin/login" })}
                  className="group flex w-full items-center px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors font-medium"
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
