'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Loader2 } from 'lucide-react';
import { format, parseISO } from 'date-fns';

type Preset = '7days' | 'yesterday' | '30days' | 'thisMonth';

export default function SalesOverviewChart() {
  const [preset, setPreset] = useState<Preset>('7days');
  const [data, setData] = useState<{ createdAt: string; finalTotal: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/admin/dashboard/sales-chart?preset=${preset}`);
        const json = await res.json();
        if (json.success) {
          setData(json.data);
        }
      } catch (error) {
        console.error('Failed to fetch sales chart data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [preset]);

  // Sales trend analytics visualization
  // Calculates revenue movement based on order history
  const chartData = useMemo(() => {
    if (!data.length) return [];
    
    // Group by date
    const grouped = data.reduce((acc, order) => {
      let dateKey = format(parseISO(order.createdAt), 'MMM dd');
      if (preset === 'yesterday') {
        // If yesterday, group by hour instead
        dateKey = format(parseISO(order.createdAt), 'hh a');
      }
      
      if (!acc[dateKey]) {
        acc[dateKey] = { date: dateKey, sales: 0, orders: 0 };
      }
      acc[dateKey].sales += order.finalTotal;
      acc[dateKey].orders += 1;
      return acc;
    }, {} as Record<string, { date: string; sales: number; orders: number }>);

    return Object.values(grouped);
  }, [data, preset]);

  return (
    <div className="flex flex-col h-full min-h-[350px] w-full">
      {/* Filters */}
      <div className="flex items-center space-x-2 mb-6 overflow-x-auto scrollbar-hide pb-2">
        {[
          { id: '7days', label: 'Last 7 Days' },
          { id: 'yesterday', label: 'Yesterday' },
          { id: '30days', label: 'Last 30 Days' },
          { id: 'thisMonth', label: 'This Month' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setPreset(tab.id as Preset)}
            className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-full whitespace-nowrap transition-all duration-300 ${
              preset === tab.id
                ? 'bg-primary text-white shadow-md'
                : 'bg-secondary/20 text-muted-foreground hover:bg-secondary/40 hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Chart Area */}
      <div className="flex-1 relative w-full h-full min-h-[250px]">
        {loading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm z-10 rounded-xl">
            <Loader2 className="h-8 w-8 text-primary animate-spin mb-2" />
            <span className="text-sm font-medium text-muted-foreground animate-pulse">Loading analytics...</span>
          </div>
        ) : chartData.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center border border-dashed border-border/60 rounded-xl bg-gray-50/50">
            <span className="text-sm text-muted-foreground">No sales data found for this period.</span>
          </div>
        ) : (
          <div className="w-full h-full animate-[fadeIn_0.5s_ease-out]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#dc2626" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                  tickFormatter={(val) => `₹${val.toLocaleString()}`}
                  width={60}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', fontWeight: 500 }}
                  itemStyle={{ color: '#111827', fontWeight: 700 }}
                  formatter={(value: any, name: any) => [
                    name === 'sales' ? `₹${value.toLocaleString()}` : value, 
                    name === 'sales' ? 'Sales' : 'Orders'
                  ]}
                  labelStyle={{ color: '#6b7280', marginBottom: '4px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#dc2626" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorSales)" 
                  activeDot={{ r: 6, fill: '#dc2626', stroke: '#fff', strokeWidth: 2 }}
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
