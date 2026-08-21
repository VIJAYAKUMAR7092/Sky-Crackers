'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { UserCheck, UserX } from 'lucide-react';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';

interface CustomerDetailClientProps {
  customerId: string;
  currentActive: boolean;
}

export function CustomerDetailClient({ customerId, currentActive }: CustomerDetailClientProps) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleUpdate = async () => {
    setIsUpdating(true);
    setIsConfirmOpen(false);
    try {
      const res = await fetch(`/api/admin/customers/${customerId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !currentActive }),
      });
      if (res.ok) {
        router.refresh();
      } else {
        alert('Failed to update customer status');
      }
    } catch (e) {
      console.error(e);
      alert('An error occurred');
    } finally {
      setIsUpdating(false);
    }
  };

  const newStatus = currentActive ? 'Inactive' : 'Active';

  return (
    <>
      <Button 
        variant={currentActive ? 'destructive' : 'default'}
        onClick={() => setIsConfirmOpen(true)}
        disabled={isUpdating}
      >
        {currentActive ? <UserX className="w-4 h-4 mr-2" /> : <UserCheck className="w-4 h-4 mr-2" />}
        {isUpdating ? 'Updating...' : `Mark as ${newStatus}`}
      </Button>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleUpdate}
        title={`Mark Customer as ${newStatus}`}
        description={`Are you sure you want to mark this customer as ${newStatus.toLowerCase()}? ${currentActive ? 'They will no longer be able to log in or place orders.' : 'They will regain access to their account.'}`}
        confirmText={`Yes, Mark ${newStatus}`}
        variant={currentActive ? 'danger' : 'info'}
      />
    </>
  );
}
