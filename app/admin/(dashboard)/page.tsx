import * as React from "react"
import { PageHeader } from "../../../components/admin/layout/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/Card"
import { getDashboardStats, getRecentOrders, getInventoryAlerts } from "../../../lib/services/dashboard/dashboard.service"
import { IndianRupee, Package, ShoppingCart, Users, AlertCircle, Clock, TrendingUp, Ticket, Truck, MapPin, Briefcase, BarChart, FolderTree, ArrowRight, Activity, Bell } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Dashboard | Sky Crackers Admin",
}

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats()
  
  // Fetch extra dashboard data
  const recentOrders = await getRecentOrders()
  const inventoryAlerts = await getInventoryAlerts()

  return (
    <div className="flex-1 space-y-8 pb-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Premium Commerce Dashboard</span>
        </div>
      </div>

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
        <Card className="relative overflow-hidden group border-border/60 shadow-lg bg-card/50 backdrop-blur-sm hover-lift p-2" style={{ animationDelay: '100ms' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 relative z-10">
            <CardTitle className="text-xs font-bold tracking-widest text-muted-foreground uppercase">Total Orders</CardTitle>
            <div className="p-3 bg-primary/10 rounded-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_15px_rgba(197,160,89,0.2)] transition-all group-hover:scale-110">
              <ShoppingCart className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-4xl font-bold tracking-tight text-foreground">+{stats.totalOrders}</div>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center mt-3 font-medium bg-emerald-500/10 w-fit px-2.5 py-1 rounded-full">
              <TrendingUp className="h-3.5 w-3.5 mr-1.5" />
              {stats.trends.orders} vs last month
            </p>
          </CardContent>
        </Card>

        {/* Customers */}
        <Card className="relative overflow-hidden group border-border/60 shadow-lg bg-card/50 backdrop-blur-sm hover-lift p-2" style={{ animationDelay: '200ms' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 relative z-10">
            <CardTitle className="text-xs font-bold tracking-widest text-muted-foreground uppercase">Customers</CardTitle>
            <div className="p-3 bg-primary/10 rounded-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_15px_rgba(197,160,89,0.2)] transition-all group-hover:scale-110">
              <Users className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-4xl font-bold tracking-tight text-foreground">+{stats.totalCustomers}</div>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center mt-3 font-medium bg-emerald-500/10 w-fit px-2.5 py-1 rounded-full">
              <TrendingUp className="h-3.5 w-3.5 mr-1.5" />
              {stats.trends.customers} vs last month
            </p>
          </CardContent>
        </Card>

        {/* Products */}
        <Card className="relative overflow-hidden group border-border/60 shadow-lg bg-card/50 backdrop-blur-sm hover-lift p-2" style={{ animationDelay: '300ms' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 relative z-10">
            <CardTitle className="text-xs font-bold tracking-widest text-muted-foreground uppercase">Products</CardTitle>
            <div className="p-3 bg-primary/10 rounded-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_15px_rgba(197,160,89,0.2)] transition-all group-hover:scale-110">
              <Package className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-4xl font-bold tracking-tight text-foreground">{stats.totalProducts}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-3 font-medium bg-secondary/50 w-fit px-2.5 py-1 rounded-full">
              <Activity className="h-3.5 w-3.5 mr-1.5" />
              Active catalog
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 2. SALES OVERVIEW & 5. QUICK ACTIONS */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 fade-in-up" style={{ animationDelay: '400ms' }}>
        {/* Placeholder Chart Container */}
        <Card className="lg:col-span-4 border-border/60 shadow-lg bg-card/50 backdrop-blur-sm flex flex-col">
          <CardHeader className="border-b border-border/50 pb-4 mb-4">
            <CardTitle className="text-foreground tracking-tight flex items-center">
              <BarChart className="h-5 w-5 mr-2 text-primary" />
              Sales Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="h-full min-h-[300px] w-full flex flex-col items-center justify-center border border-dashed border-border/60 rounded-2xl bg-gradient-to-br from-secondary/5 to-secondary/10 hover:from-secondary/10 hover:to-secondary/20 transition-all duration-500">
              <div className="p-4 bg-background/50 rounded-full mb-4 shadow-sm border border-border/50">
                <BarChart className="h-8 w-8 text-primary/60" />
              </div>
              <span className="text-sm font-semibold text-foreground">Premium Chart Area</span>
              <span className="text-xs text-muted-foreground mt-1">Data visualization component will mount here</span>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="lg:col-span-3 border-border/60 shadow-lg bg-card/50 backdrop-blur-sm flex flex-col">
          <CardHeader className="border-b border-border/50 pb-4 mb-4">
            <CardTitle className="text-foreground tracking-tight flex items-center">
              <Activity className="h-5 w-5 mr-2 text-primary" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center">
            <div className="grid grid-cols-2 gap-4">
              <Link href="/admin/products/new" className="group flex flex-col items-center justify-center p-6 border border-border/60 rounded-2xl bg-card hover:border-primary/50 hover:bg-primary/5 hover:shadow-[0_0_15px_rgba(197,160,89,0.1)] transition-all">
                <div className="p-3 bg-secondary/50 rounded-xl group-hover:bg-primary/10 transition-colors mb-3">
                  <Package className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-all" />
                </div>
                <span className="text-xs font-bold text-foreground tracking-widest uppercase group-hover:text-primary transition-colors text-center">Add Product</span>
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

      {/* 3. RECENT ORDERS & 4. INVENTORY ALERTS */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 fade-in-up" style={{ animationDelay: '500ms' }}>
        
        {/* Recent Orders */}
        <Card className="lg:col-span-4 border-border/60 shadow-lg bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between border-b border-border/50 pb-4 mb-4">
            <CardTitle className="text-foreground tracking-tight flex items-center">
              <Clock className="h-5 w-5 mr-2 text-primary" />
              Recent Orders
            </CardTitle>
            <Link href="/admin/orders" className="text-xs font-semibold text-primary hover:text-primary/80 flex items-center uppercase tracking-wider">
              View All <ArrowRight className="h-3 w-3 ml-1" />
            </Link>
          </CardHeader>
          <CardContent>
            {recentOrders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="p-4 bg-secondary/30 rounded-full mb-4">
                  <ShoppingCart className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium text-foreground">No recent orders</p>
                <p className="text-xs text-muted-foreground mt-1">Orders will appear here once placed.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <Link href={`/admin/orders/${order.id}`} key={order.id} className="flex items-center justify-between p-4 border border-border/60 rounded-xl hover:bg-secondary/20 hover:border-primary/30 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                        {order.customer?.fullName?.charAt(0) || 'G'}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{order.customer?.fullName || 'Guest User'}</p>
                        <p className="text-xs text-muted-foreground">Order #{order.orderReference || order.id.slice(-6).toUpperCase()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-foreground">₹{Number(order.finalTotal).toFixed(2)}</p>
                      <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase
                        ${order.status === 'PENDING' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 
                          order.status === 'DELIVERED' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 
                          'bg-secondary text-secondary-foreground border border-border'}`}>
                        {order.status}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Inventory Alerts */}
        <Card className="lg:col-span-3 border-border/60 shadow-lg bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between border-b border-border/50 pb-4 mb-4">
            <CardTitle className="text-foreground tracking-tight flex items-center">
              <Bell className="h-5 w-5 mr-2 text-rose-500" />
              Inventory Alerts
            </CardTitle>
            <Link href="/admin/products" className="text-xs font-semibold text-primary hover:text-primary/80 flex items-center uppercase tracking-wider">
              Manage <ArrowRight className="h-3 w-3 ml-1" />
            </Link>
          </CardHeader>
          <CardContent>
            {inventoryAlerts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="p-4 bg-emerald-500/10 rounded-full mb-4">
                  <Package className="h-8 w-8 text-emerald-500" />
                </div>
                <p className="text-sm font-medium text-foreground">Inventory is healthy</p>
                <p className="text-xs text-muted-foreground mt-1">No products are currently out of stock.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {inventoryAlerts.map((product) => {
                  const isOutOfStock = product.stockStatus === 'OUT_OF_STOCK';
                  return (
                    <Link href={`/admin/products/${product.id}/edit`} key={product.id} className={`flex items-center justify-between p-4 border rounded-xl transition-all group ${isOutOfStock ? 'border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10' : 'border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10'}`}>
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${isOutOfStock ? 'bg-rose-500/10 text-rose-500' : 'bg-amber-500/10 text-amber-500'}`}>
                          <AlertCircle className="h-5 w-5" />
                        </div>
                        <div>
                          <p className={`text-sm font-semibold transition-colors ${isOutOfStock ? 'text-rose-600 dark:text-rose-400' : 'text-amber-600 dark:text-amber-400'}`}>{product.name}</p>
                          <p className="text-xs opacity-80 mt-0.5 text-foreground">{isOutOfStock ? 'No units remaining' : 'Low stock'}</p>
                        </div>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border ${isOutOfStock ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'}`}>
                        {isOutOfStock ? 'Empty' : 'Low'}
                      </span>
                    </Link>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
