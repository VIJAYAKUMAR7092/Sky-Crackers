'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DataTable, ColumnDef } from '@/components/ui/DataTable';
import { FilterBar } from '@/components/ui/FilterBar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { DeliveryZone } from '@prisma/client';

interface DeliveryClientProps {
  initialData: DeliveryZone[];
  searchParams: Record<string, string | string[] | undefined>;
}

export function DeliveryClient({ initialData, searchParams }: DeliveryClientProps) {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const statusFilters = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
  ];

  const stateFilters = [
    { label: 'All States', value: 'all' },
    { label: 'Tamil Nadu', value: 'Tamil Nadu' },
    { label: 'Puducherry', value: 'Puducherry' },
    { label: 'Karnataka', value: 'Karnataka' },
    { label: 'Andhra Pradesh', value: 'Andhra Pradesh' },
    { label: 'Telangana', value: 'Telangana' },
    { label: 'Maharashtra', value: 'Maharashtra' },
    { label: 'Others', value: 'Others' },
  ];

  const courierFilters = [
    { label: 'All Transports', value: 'all' },
    { label: 'Mettur Transports (MSS)', value: 'Mettur Transports (MSS)' },
    { label: 'A1 Parcel Service', value: 'A1 Parcel Service' },
    { label: 'Rathimeena Parcel Service', value: 'Rathimeena Parcel Service' },
    { label: 'Local Lorry Service', value: 'Local Lorry Service' },
    { label: 'Other Transports', value: 'Other Transports' },
  ];

  const sortOptions = [
    { label: 'Newest', value: 'newest' },
    { label: 'Oldest', value: 'oldest' },
    { label: 'Name (A-Z)', value: 'name_asc' },
    { label: 'Name (Z-A)', value: 'name_desc' },
  ];

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams as Record<string, string>);
    if (value && value !== 'all') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    if (key !== 'page') {
      params.delete('page');
    }
    router.push(`/admin/delivery?${params.toString()}`);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/delivery/${deleteId}`, { method: 'DELETE' });
      if (res.ok) {
        router.refresh();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  const toggleStatus = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/delivery/${id}`, { 
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: true }) // The server checks if 'active' key exists and toggles it
      });
      if (res.ok) {
        router.refresh();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const columns: ColumnDef<DeliveryZone>[] = [
    {
      header: 'Zone & State',
      accessorKey: 'name',
      cell: (item: DeliveryZone) => (
        <div>
          <div className="font-bold text-foreground">{item.name}</div>
          <div className="text-xs text-muted-foreground">{item.state || 'All States'}</div>
          {item.notes && <div className="text-xs text-slate-400 truncate max-w-[150px]">{item.notes}</div>}
        </div>
      ),
    },
    {
      header: 'Logistics',
      accessorKey: 'courier',
      cell: (item: DeliveryZone) => (
        <div>
          <div className="font-medium text-sm">{item.courier}</div>
          <div className="text-xs text-muted-foreground">Pri: {item.priority === 1 ? 'High' : item.priority === 2 ? 'Medium' : 'Low'}</div>
        </div>
      )
    },
    {
      header: 'Pincodes',
      accessorKey: 'pincodes',
      cell: (item: DeliveryZone) => (
        <div className="text-sm max-w-[150px] truncate">
          {item.pincodes.length > 2 
            ? `${item.pincodes.slice(0, 2).join(', ')} + ${item.pincodes.length - 2} more`
            : item.pincodes.join(', ')}
        </div>
      ),
    },
    {
      header: 'Pricing',
      accessorKey: 'deliveryCharge',
      cell: (item: DeliveryZone) => (
        <div className="text-sm">
          <div className="font-medium">₹{Number(item.deliveryCharge).toFixed(2)}</div>
          {item.freeDeliveryThreshold !== null && (
            <div className="text-xs text-orange-600 dark:text-orange-400">
              Free &gt; ₹{Number(item.freeDeliveryThreshold).toFixed(2)}
            </div>
          )}
        </div>
      ),
    },
    {
      header: 'Availability',
      accessorKey: 'deliverable',
      cell: (item: DeliveryZone) => (
        <div>
          <Badge variant={item.deliverable ? 'success' : 'destructive'}>
            {item.deliverable ? 'Deliverable' : 'No Service'}
          </Badge>
          <div className="text-xs mt-1 text-muted-foreground">{item.estimatedTime || '-'}</div>
        </div>
      )
    },
    {
      header: 'Status',
      accessorKey: 'active',
      cell: (item: DeliveryZone) => (
        <button onClick={() => toggleStatus(item.id)} className="focus:outline-none">
          <Badge variant={item.active ? 'success' : 'secondary'}>
            {item.active ? 'Active' : 'Inactive'}
          </Badge>
        </button>
      ),
    },
    {
      header: 'Actions',
      accessorKey: 'id',
      cell: (item: DeliveryZone) => (
        <div className="flex items-center gap-2">
          <Link href={`/admin/delivery/${item.id}/edit`}>
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </Link>
          <Button 
            variant="destructive" 
            size="sm"
            onClick={() => setDeleteId(item.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <FilterBar
        searchPlaceholder="Search zone, state, courier, pincode..."
        onSearch={(val: string) => handleFilterChange('search', val)}
        filters={[
          {
            name: 'State',
            options: stateFilters,
            value: (searchParams.state as string) || 'all',
            onChange: (val: string) => handleFilterChange('state', val),
          },
          {
            name: 'Courier',
            options: courierFilters,
            value: (searchParams.courier as string) || 'all',
            onChange: (val: string) => handleFilterChange('courier', val),
          },
          {
            name: 'Status',
            options: statusFilters,
            value: (searchParams.status as string) || 'all',
            onChange: (val: string) => handleFilterChange('status', val),
          },
          {
            name: 'Sort By',
            options: sortOptions,
            value: (searchParams.sortBy as string) || 'newest',
            onChange: (val: string) => handleFilterChange('sortBy', val),
          }
        ]}
      />

      <DataTable 
        columns={columns} 
        data={initialData} 
        keyExtractor={(item: DeliveryZone) => item.id} 
      />

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Delivery Zone"
        description="Are you sure you want to delete this zone? This action cannot be undone."
        confirmText={isDeleting ? 'Deleting...' : 'Delete'}
        variant="danger"
      />
    </div>
  );
}
