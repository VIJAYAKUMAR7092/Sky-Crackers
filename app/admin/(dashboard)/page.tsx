import * as React from "react"
import { PageHeader } from "../../../components/admin/layout/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/Card"
import { getDashboardStats } from "../../../lib/services/dashboard/dashboard.service"
import { Sparkles, IndianRupee, Package, ShoppingCart, Users, AlertCircle, Clock, TrendingUp, Ticket, Truck, MapPin, Briefcase, BarChart, FolderTree, ArrowRight, Activity, Bell, Loader2 } from "lucide-react"
import Link from "next/link"
import SalesOverviewChart from '../../../components/admin/dashboard/SalesOverviewChart';


export const metadata = {
  title: "Dashboard | Sky Crackers Admin",
}

function DashboardSkeleton() {
  return (
    <div className="w-full space-y-8 animate-pulse">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-32 bg-card border border-border/50 rounded-xl" />
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-5 h-[350px] bg-card border border-border/50 rounded-xl flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary/50" />
        </div>
        <div className="lg:col-span-2 h-[350px] bg-card border border-border/50 rounded-xl" />
      </div>
    </div>
  );
}

async function DashboardDataWrapper() {
  const stats = await getDashboardStats()

  return (
    <>
      {/* 1. HERO ANALYTICS SECTION */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 fade-in-up">
        {/* Revenue */}
        <Card className="relative overflow-hidden group border-border/60 shadow-lg bg-card/50 backdrop-blur-sm hover-lift p-2">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 relative z-10">
            <CardTitle className="text-xs font-bold tracking-widest text-muted-foreground uppercase">Total Revenue</CardTitle>
            <div className="p-3 bg-primary/10 rounded-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_15px_rgba(197,160,89,0.2)] transition-all group-hover:scale-110">
              <IndianRupee className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-4xl font-bold tracking-tight text-foreground">₹{stats.revenue.toLocaleString()}</div>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center mt-3 font-medium bg-emerald-500/10 w-fit px-2.5 py-1 rounded-full">
              <TrendingUp className="h-3.5 w-3.5 mr-1.5" />
              {stats.trends.revenue} vs last month
            </p>
          </CardContent>
        </Card>

        {/* Total Orders */}
        <Card className="relative overflow-hidden group border-border/60 shadow-lg bg-card/50 backdrop-blur-sm hover-lift p-2">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 relative z-10">
            <CardTitle className="text-xs font-bold tracking-widest text-muted-foreground uppercase">Total Orders</CardTitle>
            <div className="p-3 bg-emerald-500/10 rounded-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all group-hover:scale-110">
              <ShoppingCart className="h-5 w-5 text-emerald-500" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-4xl font-bold tracking-tight text-foreground">{stats.totalOrders.toLocaleString()}</div>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center mt-3 font-medium bg-emerald-500/10 w-fit px-2.5 py-1 rounded-full">
              <TrendingUp className="h-3.5 w-3.5 mr-1.5" />
              {stats.trends.orders} vs last month
            </p>
          </CardContent>
        </Card>

        {/* Active Products */}
        <Card className="relative overflow-hidden group border-border/60 shadow-lg bg-card/50 backdrop-blur-sm hover-lift p-2">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 relative z-10">
            <CardTitle className="text-xs font-bold tracking-widest text-muted-foreground uppercase">Active Products</CardTitle>
            <div className="p-3 bg-amber-500/10 rounded-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_15px_rgba(245,158,11,0.2)] transition-all group-hover:scale-110">
              <Package className="h-5 w-5 text-amber-500" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-4xl font-bold tracking-tight text-foreground">{stats.totalProducts.toLocaleString()}</div>
            <p className="text-xs text-amber-600 dark:text-amber-400 flex items-center mt-3 font-medium bg-amber-500/10 w-fit px-2.5 py-1 rounded-full">
              <Activity className="h-3.5 w-3.5 mr-1.5" />
              Inventory Active
            </p>
          </CardContent>
        </Card>

        {/* Total Customers */}
        <Card className="relative overflow-hidden group border-border/60 shadow-lg bg-card/50 backdrop-blur-sm hover-lift p-2">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 relative z-10">
            <CardTitle className="text-xs font-bold tracking-widest text-muted-foreground uppercase">Total Customers</CardTitle>
            <div className="p-3 bg-blue-500/10 rounded-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all group-hover:scale-110">
              <Users className="h-5 w-5 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-4xl font-bold tracking-tight text-foreground">{stats.totalCustomers.toLocaleString()}</div>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center mt-3 font-medium bg-emerald-500/10 w-fit px-2.5 py-1 rounded-full">
              <TrendingUp className="h-3.5 w-3.5 mr-1.5" />
              {stats.trends.customers} vs last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 2. SALES OVERVIEW & QUICK ACTIONS */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 fade-in-up" style={{ animationDelay: '300ms' }}>
        
        {/* Sales Overview Chart */}
        <Card className="lg:col-span-5 border-border/60 shadow-lg bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between border-b border-border/50 pb-4 mb-4">
            <div>
              <CardTitle className="text-foreground tracking-tight">Revenue Overview</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">Monthly performance breakdown</p>
            </div>
          </CardHeader>
          <CardContent className="h-[350px]">
            <SalesOverviewChart />
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="lg:col-span-2 border-border/60 shadow-lg bg-card/50 backdrop-blur-sm">
          <CardHeader className="border-b border-border/50 pb-4 mb-4">
            <CardTitle className="text-foreground tracking-tight flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-primary" />
              Quick Access
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-1">Frequently used tools</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/admin/products/new" className="group flex flex-col items-center justify-center p-6 border border-border/60 rounded-2xl bg-card hover:border-primary/50 hover:bg-primary/5 hover:shadow-[0_0_15px_rgba(197,160,89,0.1)] transition-all">
                <div className="p-3 bg-secondary/50 rounded-xl group-hover:bg-primary/10 transition-colors mb-3">
                  <Package className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-all" />
                </div>
                <span className="text-xs font-bold text-foreground tracking-widest uppercase group-hover:text-primary transition-colors text-center">New Product</span>
              </Link>
              <Link href="/admin/products" className="group flex flex-col items-center justify-center p-6 border border-border/60 rounded-2xl bg-card hover:border-primary/50 hover:bg-primary/5 hover:shadow-[0_0_15px_rgba(197,160,89,0.1)] transition-all">
                <div className="p-3 bg-secondary/50 rounded-xl group-hover:bg-primary/10 transition-colors mb-3">
                  <FolderTree className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-all" />
                </div>
                <span className="text-xs font-bold text-foreground tracking-widest uppercase group-hover:text-primary transition-colors text-center">Manage Products</span>
              </Link>
              <Link href="/admin/orders" className="group flex flex-col items-center justify-center p-6 border border-border/60 rounded-2xl bg-card hover:border-primary/50 hover:bg-primary/5 hover:shadow-[0_0_15px_rgba(197,160,89,0.1)] transition-all">
                <div className="p-3 bg-secondary/50 rounded-xl group-hover:bg-primary/10 transition-colors mb-3">
                  <ShoppingCart className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-all" />
                </div>
                <span className="text-xs font-bold text-foreground tracking-widest uppercase group-hover:text-primary transition-colors text-center">Orders</span>
              </Link>
              <Link href="/admin/reports" className="group flex flex-col items-center justify-center p-6 border border-border/60 rounded-2xl bg-card hover:border-primary/50 hover:bg-primary/5 hover:shadow-[0_0_15px_rgba(197,160,89,0.1)] transition-all">
                <div className="p-3 bg-secondary/50 rounded-xl group-hover:bg-primary/10 transition-colors mb-3">
                  <BarChart className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-all" />
                </div>
                <span className="text-xs font-bold text-foreground tracking-widest uppercase group-hover:text-primary transition-colors text-center">Reports</span>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 3. BUSINESS METRICS */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 fade-in-up" style={{ animationDelay: '400ms' }}>
        <Card className="border-border/60 bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Categories</CardTitle>
            <FolderTree className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.totalCategories}</div>
            <p className="text-xs text-muted-foreground mt-1">Active categories</p>
          </CardContent>
        </Card>
        
        <Card className="border-border/60 bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Pending Orders</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.pendingOrders}</div>
            <p className="text-xs text-muted-foreground mt-1">Awaiting processing</p>
          </CardContent>
        </Card>
        
        <Card className="border-border/60 bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Out of Stock</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.outOfStock}</div>
            <p className="text-xs text-muted-foreground mt-1">Requires restock</p>
          </CardContent>
        </Card>
        
        <Card className="border-border/60 bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Active Coupons</CardTitle>
            <Ticket className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.activeCoupons}</div>
            <p className="text-xs text-muted-foreground mt-1">Currently running</p>
          </CardContent>
        </Card>
      </div>

      {/* 4. DELIVERY METRICS */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 fade-in-up" style={{ animationDelay: '500ms' }}>
        <Card className="border-border/60 bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Delivery Zones</CardTitle>
            <MapPin className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.activeDeliveryZones}</div>
            <p className="text-xs text-muted-foreground mt-1">Active configured zones</p>
          </CardContent>
        </Card>
        
        <Card className="border-border/60 bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Covered Pincodes</CardTitle>
            <Truck className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.coveredPincodes}</div>
            <p className="text-xs text-muted-foreground mt-1">Total serviceable areas</p>
          </CardContent>
        </Card>
        
        <Card className="border-border/60 bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Serviceable States</CardTitle>
            <Briefcase className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.deliverableStates}</div>
            <p className="text-xs text-muted-foreground mt-1">States with active delivery</p>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default function AdminDashboardPage() {
  return (
    <div className="flex-1 space-y-8 pb-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Premium Commerce Dashboard</span>
        </div>
      </div>

      <React.Suspense fallback={<DashboardSkeleton />}>
        <DashboardDataWrapper />
      </React.Suspense>
    </div>
  )
}
