'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { deliveryFormSchema } from '@/lib/validations/delivery';
import { DeliveryZone } from '@prisma/client';

interface DeliveryFormProps {
  initialData?: DeliveryZone;
}

export function DeliveryForm({ initialData }: DeliveryFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    state: initialData?.state || '',
    pincodes: initialData?.pincodes ? initialData.pincodes.join(', ') : '',
    deliveryCharge: initialData?.deliveryCharge ? Number(initialData.deliveryCharge) : 0,
    freeDeliveryThreshold: initialData?.freeDeliveryThreshold ? Number(initialData.freeDeliveryThreshold) : '',
    estimatedTime: initialData?.estimatedTime || '',
    notes: initialData?.notes || '',
    courier: initialData?.courier || 'Mettur Transports (MSS)',
    priority: initialData?.priority || 2,
    deliverable: initialData ? initialData.deliverable : true,
    active: initialData ? initialData.active : true,
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let finalValue: string | number | boolean = value;
    
    if (type === 'number') {
      finalValue = value === '' ? '' : Number(value);
    } else if (type === 'checkbox') {
      finalValue = (e.target as HTMLInputElement).checked;
    }

    setFormData(prev => ({ ...prev, [name]: finalValue }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const formattedData = {
      ...formData,
      state: formData.state || null,
      freeDeliveryThreshold: formData.freeDeliveryThreshold === '' ? null : Number(formData.freeDeliveryThreshold),
      estimatedTime: formData.estimatedTime || null,
      notes: formData.notes || null,
      priority: Number(formData.priority),
    };

    const validationResult = deliveryFormSchema.safeParse(formattedData);
    if (!validationResult.success) {
      const formattedErrors: Record<string, string> = {};
      validationResult.error.issues.forEach((err: any) => {
        if (err.path[0]) {
          formattedErrors[err.path[0].toString()] = err.message;
        }
      });
      setErrors(formattedErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const url = initialData ? `/api/admin/delivery/${initialData.id}` : '/api/admin/delivery';
      const method = initialData ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validationResult.data),
      });

      if (res.ok) {
        router.push('/admin/delivery');
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.error || 'Something went wrong');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">Zone Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full border rounded-lg px-3 py-2 ${errors.name ? 'border-red-500' : 'border-input bg-card'}`}
            placeholder="e.g., South Chennai"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">State</label>
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 border-input bg-card"
          >
            <option value="">Select a state</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Puducherry">Puducherry</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Telangana">Telangana</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Others">Others</option>
          </select>
          {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Pincodes * (Comma separated)</label>
          <textarea
            name="pincodes"
            value={formData.pincodes}
            onChange={handleChange}
            className={`w-full border rounded-lg px-3 py-2 ${errors.pincodes ? 'border-red-500' : 'border-input bg-card'}`}
            rows={3}
            placeholder="600001, 600002, 600003"
          />
          {errors.pincodes && <p className="text-red-500 text-xs mt-1">{errors.pincodes}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Delivery Charge (,1) *</label>
          <input
            type="number"
            name="deliveryCharge"
            value={formData.deliveryCharge}
            onChange={handleChange}
            className={`w-full border rounded-lg px-3 py-2 ${errors.deliveryCharge ? 'border-red-500' : 'border-input bg-card'}`}
            min="0"
            step="0.01"
          />
          {errors.deliveryCharge && <p className="text-red-500 text-xs mt-1">{errors.deliveryCharge}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Free Delivery Above (,1)</label>
          <input
            type="number"
            name="freeDeliveryThreshold"
            value={formData.freeDeliveryThreshold}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 border-input bg-card"
            min="0"
            step="0.01"
            placeholder="Leave empty if not applicable"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Estimated Delivery Time</label>
          <input
            type="text"
            name="estimatedTime"
            value={formData.estimatedTime}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 border-input bg-card"
            placeholder="e.g., 2-3 Business Days"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Courier Partner</label>
          <select
            name="courier"
            value={formData.courier}
            onChange={handleChange}
            className={`w-full border rounded-lg px-3 py-2 ${errors.courier ? 'border-red-500' : 'border-input bg-card'}`}
          >
            <option value="Mettur Transports (MSS)">Mettur Transports (MSS)</option>
            <option value="A1 Parcel Service">A1 Parcel Service</option>
            <option value="Rathimeena Parcel Service">Rathimeena Parcel Service</option>
            <option value="Local Lorry Service">Local Lorry Service</option>
            <option value="Other Transports">Other Transports</option>
          </select>
          {errors.courier && <p className="text-red-500 text-xs mt-1">{errors.courier}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Priority (1=High, 3=Low)</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className={`w-full border rounded-lg px-3 py-2 ${errors.priority ? 'border-red-500' : 'border-input bg-card'}`}
          >
            <option value={1}>1 - High Priority</option>
            <option value={2}>2 - Medium Priority</option>
            <option value={3}>3 - Low Priority</option>
          </select>
          {errors.priority && <p className="text-red-500 text-xs mt-1">{errors.priority}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 border-input bg-card"
            rows={2}
          />
        </div>

        <div className="md:col-span-2 flex space-x-6">
          <label className="flex items-center space-x-2 mt-2">
            <input
              type="checkbox"
              name="deliverable"
              checked={formData.deliverable}
              onChange={handleChange}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <span className="font-medium">Service Available (Deliverable)</span>
          </label>
          <label className="flex items-center space-x-2 mt-2">
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleChange}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <span className="font-medium">Rule Active</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-border">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin/delivery')}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : (initialData ? 'Update Zone' : 'Create Zone')}
        </Button>
      </div>
    </form>
  );
}
