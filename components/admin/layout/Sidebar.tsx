import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "../../ui/utils"
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingCart,
  Users,
  Ticket,
  Truck,
  LayoutTemplate,
  Settings,
  Bell,
  BarChart,
  LogOut,
  X,
  Sparkles,
  Gift,
  FileText
} from "lucide-react"

export interface NavItem {
  title: string
  href: string
  icon: React.ElementType
  allowedRoles?: string[]
}

export const sidebarConfig = [
  {
    group: "Overview",
    items: [
      { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
      { title: "Reports", href: "/admin/reports", icon: BarChart },
    ]
  },
  {
    group: "E-Commerce",
    items: [
      { title: "Orders", href: "/admin/orders", icon: ShoppingCart },
      { title: "Products", href: "/admin/products", icon: Package },
      { title: "Categories", href: "/admin/categories", icon: FolderTree },
      { title: "Combo Management", href: "/admin/combos", icon: Gift },
      { title: "Customers", href: "/admin/customers", icon: Users },
      { title: "Coupons", href: "/admin/coupons", icon: Ticket },
      { title: "Price List", href: "/admin/pricelist", icon: FileText },
    ]
  },
  {
    group: "Configuration",
    items: [
      { title: "Delivery", href: "/admin/delivery", icon: Truck },
      { title: "Homepage CMS", href: "/admin/cms", icon: LayoutTemplate },
      { title: "Notifications", href: "/admin/notifications", icon: Bell },
      { title: "Settings", href: "/admin/settings", icon: Settings },
    ]
  }
]

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  userRole?: string
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export function Sidebar({ userRole, isOpen, setIsOpen, className, ...props }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col border-r border-border bg-background backdrop-blur-xl transition-transform duration-300 ease-in-out shadow-2xl lg:static lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          className
        )}
        {...props}
      >
        <div className="flex h-[72px] items-center justify-between px-6 border-b border-border bg-background">
          <Link href="/admin" className="flex items-center gap-3 font-bold text-lg tracking-wider text-foreground uppercase group">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.3)] group-hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] transition-all duration-500">
              <Sparkles className="w-4 h-4 text-white" />
              <div className="absolute inset-0 rounded-lg ring-1 ring-white/20"></div>
            </div>
            <span className="bg-clip-text text-foreground">
              Sky Crackers
            </span>
          </Link>
          <button 
            className="lg:hidden text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 custom-scrollbar">
          <nav className="flex flex-col gap-6">
            {sidebarConfig.map((group, groupIdx) => (
              <div key={groupIdx}>
                <h4 className="mb-2 px-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground/70">
                  {group.group}
                </h4>
                <div className="grid gap-1">
                  {group.items.map((item, index) => {
                    const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)
                    const isExactDashboard = item.href === "/admin" && pathname !== "/admin"
                    const actualIsActive = isExactDashboard ? false : isActive

                    return (
                      <Link
                        key={index}
                        href={item.href}
                        className={cn(
                          "group relative flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-300 overflow-hidden",
                          actualIsActive
                            ? "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        {actualIsActive && (
                          <div className="absolute inset-y-0 left-0 w-1 bg-red-600 rounded-r-full shadow-[0_0_10px_var(--primary)]" />
                        )}
                        <item.icon className={cn(
                          "h-5 w-5 transition-all duration-300", 
                          actualIsActive ? "text-red-600 dark:text-red-500 scale-110 drop-shadow-[0_0_8px_rgba(220,38,38,0.5)]" : "text-muted-foreground group-hover:text-foreground group-hover:scale-110"
                        )} />
                        {item.title}
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </>
  )
}
