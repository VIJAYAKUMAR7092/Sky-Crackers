'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

interface ReportClientProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialData: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  summaryData: any;
  currentPreset: string;
}

export default function ReportClient({ initialData, summaryData, currentPreset }: ReportClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'revenue', label: 'Revenue' },
    { id: 'products', label: 'Products' },
    { id: 'orders', label: 'Orders' },
    { id: 'customers', label: 'Customers' },
  ];

  const presets = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
    { value: 'thisMonth', label: 'This Month' },
    { value: 'thisYear', label: 'This Year' },
  ];

  const handlePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(`/admin/reports?preset=${e.target.value}`);
  };

  const handleExport = () => {
    // Generate simple CSV from overview data
    const csvContent = [
      ['Metric', 'Value'],
      ['Total Revenue', initialData.revenue.totalRevenue],
      ['Total Orders', initialData.revenue.totalOrders],
      ['Average Order Value', initialData.revenue.averageOrderValue],
      ['Products Sold', initialData.products.totalProductsSold],
      ['New Customers', initialData.customers.newCustomers],
      ['Free Shipping Orders', initialData.logistics.freeShippingCount],
    ].map(e => e.join(",")).join("\n");
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `report_${currentPreset}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex space-x-2 border-b border-border pb-2 overflow-x-auto w-full sm:w-auto scrollbar-hide">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 text-sm font-semibold rounded-lg whitespace-nowrap transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-primary/10 text-primary border-b-2 border-primary'
                  : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex space-x-2">
          <select 
            className="h-10 px-3 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all text-foreground"
            value={currentPreset}
            onChange={(e) => router.push(`/admin/reports?preset=${e.target.value}`)}
          >
            {presets.map(p => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
          <Button variant="outline" onClick={handleExport}>Export CSV</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {activeTab === 'overview' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="border-border/60 shadow-lg bg-card/50 backdrop-blur-sm hover-lift fade-in-up">
                <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground font-semibold">Sales Today</CardTitle></CardHeader>
                <CardContent><div className="text-2xl font-bold text-foreground">₹{summaryData.today.totalRevenue.toFixed(2)}</div></CardContent>
              </Card>
              <Card className="border-border/60 shadow-lg bg-card/50 backdrop-blur-sm hover-lift fade-in-up">
                <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground font-semibold">Sales This Week</CardTitle></CardHeader>
                <CardContent><div className="text-2xl font-bold text-foreground">₹{summaryData.thisWeek.totalRevenue.toFixed(2)}</div></CardContent>
              </Card>
              <Card className="border-border/60 shadow-lg bg-card/50 backdrop-blur-sm hover-lift fade-in-up">
                <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground font-semibold">Sales This Month</CardTitle></CardHeader>
                <CardContent><div className="text-2xl font-bold text-foreground">₹{summaryData.thisMonth.totalRevenue.toFixed(2)}</div></CardContent>
              </Card>
              <Card className="border-border/60 shadow-lg bg-card/50 backdrop-blur-sm hover-lift fade-in-up">
                <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground font-semibold">Sales This Year</CardTitle></CardHeader>
                <CardContent><div className="text-2xl font-bold text-foreground">₹{summaryData.thisYear.totalRevenue.toFixed(2)}</div></CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <Card className="border-border/60 shadow-lg bg-card/50 backdrop-blur-sm fade-in-up">
                 <CardHeader><CardTitle className="text-foreground">Order Status Breakdown</CardTitle></CardHeader>
                 <CardContent>
                   <ul className="space-y-3">
                     <li className="flex justify-between items-center p-2 rounded-lg bg-secondary/30"><span className="text-muted-foreground font-medium">Pending</span> <span className="font-bold text-foreground">{initialData.orders.PENDING}</span></li>
                     <li className="flex justify-between items-center p-2 rounded-lg bg-secondary/30"><span className="text-muted-foreground font-medium">Confirmed</span> <span className="font-bold text-foreground">{initialData.orders.CONFIRMED}</span></li>
                     <li className="flex justify-between items-center p-2 rounded-lg bg-secondary/30"><span className="text-muted-foreground font-medium">Delivered</span> <span className="font-bold text-foreground">{initialData.orders.DELIVERED}</span></li>
                     <li className="flex justify-between items-center p-2 rounded-lg bg-destructive/10 text-destructive"><span className="font-medium">Cancelled</span> <span className="font-bold">{initialData.orders.CANCELLED}</span></li>
                   </ul>
                 </CardContent>
               </Card>

               <Card className="border-border/60 shadow-lg bg-card/50 backdrop-blur-sm fade-in-up">
                 <CardHeader><CardTitle className="text-foreground">Logistics Overview</CardTitle></CardHeader>
                 <CardContent>
                   <ul className="space-y-3">
                     <li className="flex justify-between items-center p-2 rounded-lg bg-secondary/30"><span className="text-muted-foreground font-medium">Total Delivery Collected</span> <span className="font-bold text-foreground">₹{Number(initialData.logistics.deliveryStats._sum.deliveryCharge || 0).toFixed(2)}</span></li>
                     <li className="flex justify-between items-center p-2 rounded-lg bg-secondary/30"><span className="text-muted-foreground font-medium">Free Shipping Orders</span> <span className="font-bold text-foreground">{initialData.logistics.freeShippingCount}</span></li>
                   </ul>
                 </CardContent>
               </Card>
            </div>
          </>
        )}

        {activeTab === 'revenue' && (
          <Card className="border-border/60 shadow-lg bg-card/50 backdrop-blur-sm fade-in-up">
            <CardHeader><CardTitle className="text-foreground">Revenue Analytics ({currentPreset})</CardTitle></CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-primary mb-2">
                ₹{initialData.revenue.totalRevenue.toFixed(2)}
              </div>
              <p className="text-muted-foreground">From {initialData.revenue.totalOrders} orders. Average value: ₹{initialData.revenue.averageOrderValue.toFixed(2)}</p>
            </CardContent>
          </Card>
        )}

        {activeTab === 'products' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-border/60 shadow-lg bg-card/50 backdrop-blur-sm fade-in-up">
              <CardHeader><CardTitle className="text-foreground">Top 10 Best Selling Products</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {initialData.products.bestSelling.map((p: { productId: string, productName: string, _sum: { quantity: number } }, i: number) => (
                    <li key={p.productId} className="flex justify-between border-b border-border pb-3 last:border-0 last:pb-0">
                      <span className="text-foreground font-medium">{i+1}. {p.productName}</span>
                      <span className="font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-md text-sm">{p._sum.quantity} units</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/60 shadow-lg bg-card/50 backdrop-blur-sm fade-in-up">
              <CardHeader><CardTitle className="text-foreground">Out of Stock Items</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {initialData.products.outOfStock.map((p: { id: string, name: string }) => (
                    <li key={p.id} className="flex justify-between items-center text-destructive border-b border-border pb-3 last:border-0 last:pb-0">
                      <span className="font-medium">{p.name}</span>
                      <span className="font-bold bg-destructive/10 px-2 py-0.5 rounded-md text-xs uppercase tracking-wide">0 in stock</span>
                    </li>
                  ))}
                  {initialData.products.outOfStock.length === 0 && <p className="text-orange-600 dark:text-orange-400 font-medium">All products are well stocked!</p>}
                </ul>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'customers' && (
          <Card className="border-border/60 shadow-lg bg-card/50 backdrop-blur-sm fade-in-up">
            <CardHeader><CardTitle className="text-foreground">Top Customers ({currentPreset})</CardTitle></CardHeader>
            <CardContent>
               <div className="bg-secondary/30 p-4 rounded-xl mb-6">
                 <p className="text-muted-foreground font-medium">New Customers Registered: <strong className="text-foreground text-lg">{initialData.customers.newCustomers}</strong></p>
               </div>
               <h4 className="font-bold text-foreground mb-4">Highest Spending:</h4>
               <ul className="space-y-4">
                  {initialData.customers.topCustomers.map((c: { customer: string, email: string, phone: string, spent: number, orders: number }, i: number) => (
                    <li key={i} className="flex flex-col sm:flex-row justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                      <div>
                        <p className="font-bold text-foreground text-lg">{c.customer}</p>
                        <p className="text-sm text-muted-foreground mt-1">{c.email} • {c.phone}</p>
                      </div>
                      <div className="text-right sm:text-left mt-2 sm:mt-0 flex flex-col sm:items-end justify-center">
                        <p className="font-bold text-primary text-xl">₹{c.spent.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground font-medium">{c.orders} orders</p>
                      </div>
                    </li>
                  ))}
                </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
