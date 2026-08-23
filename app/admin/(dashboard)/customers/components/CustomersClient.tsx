'use client';
import { format } from 'date-fns';

import React from 'react';
import { useRouter } from 'next/navigation';
import { DataTable, ColumnDef } from '@/components/ui/DataTable';
import { FilterBar } from '@/components/ui/FilterBar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Eye } from 'lucide-react';
import Link from 'next/link';

interface CustomersClientProps {
  initialData: any;
  searchParams: Record<string, any>;
}

export function CustomersClient({ initialData, searchParams }: CustomersClientProps) {
  const router = useRouter();

  const statusFilters = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
  ];

  const sortOptions = [
    { label: 'Newest', value: 'newest' },
    { label: 'Oldest', value: 'oldest' },
    { label: 'Highest Orders', value: 'orders_desc' },
    { label: 'Highest Spending', value: 'spending_desc' },
  ];

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams as Record<string, string>);
    if (value && value !== 'all') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    // reset to page 1 on filter change
    if (key !== 'page') {
      params.delete('page');
    }
    router.push(`/admin/customers?${params.toString()}`);
  };

  const columns: ColumnDef<any>[] = [
    {
      header: 'Customer',
      accessorKey: 'fullName',
      cell: (item: any) => (
        <div>
          <div className="font-medium text-foreground">{item.fullName}</div>
          <div className="text-xs text-muted-foreground">Joined {format(new Date(item.createdAt), 'dd/MM/yyyy')}</div>
        </div>
      ),
    },
    {
      header: 'Contact',
      accessorKey: 'email',
      cell: (item: any) => (
        <div className="text-sm">
          <div>{item.email || '-'}</div>
          <div className="text-muted-foreground">{item.phone}</div>
        </div>
      ),
    },
    {
      header: 'Total Orders',
      accessorKey: 'totalOrders',
    },
    {
      header: 'Total Spending',
      accessorKey: 'totalSpending',
      cell: (item: any) => `,1${Number(item.totalSpending).toFixed(2)}`,
    },
    {
      header: 'Status',
      accessorKey: 'active',
      cell: (item: any) => (
        <Badge variant={item.active ? 'success' : 'secondary'}>
          {item.active ? 'Active' : 'Inactive'}
        </Badge>
      ),
    },
    {
      header: 'Actions',
      accessorKey: 'id',
      cell: (item: any) => (
        <Link href={`/admin/customers/${item.id}`}>
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            View
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <FilterBar
        searchPlaceholder="Search name, email, phone..."
        onSearch={(val: string) => handleFilterChange('search', val)}
        filters={[
          {
            name: 'Status',
            options: statusFilters,
            value: searchParams.status || 'all',
            onChange: (val: string) => handleFilterChange('status', val),
          },
          {
            name: 'Sort By',
            options: sortOptions,
            value: searchParams.sortBy || 'newest',
            onChange: (val: string) => handleFilterChange('sortBy', val),
          }
        ]}
      />

      <DataTable 
        columns={columns} 
        data={initialData} 
        keyExtractor={(item: any) => item.id as string} 
      />
    </div>
  );
}
