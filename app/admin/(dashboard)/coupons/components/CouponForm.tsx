'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { couponFormSchema } from '@/lib/validations/coupon';

import { Coupon } from '@prisma/client';

interface CouponFormProps {
  initialData?: Coupon;
}

export function CouponForm({ initialData }: CouponFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    code: initialData?.code || '',
    description: initialData?.description || '',
    discountType: initialData?.discountType || 'PERCENTAGE',
    discountValue: initialData?.discountValue ? Number(initialData.discountValue) : 0,
    minOrderValue: initialData?.minOrderValue ? Number(initialData.minOrderValue) : 0,
    maxDiscount: initialData?.maxDiscount ? Number(initialData.maxDiscount) : '',
    usageLimit: initialData?.usageLimit || '',
    perCustomerLimit: initialData?.perCustomerLimit || '',
    startDate: initialData?.startDate ? new Date(initialData.startDate).toISOString().split('T')[0] : '',
    expiryDate: initialData?.expiryDate ? new Date(initialData.expiryDate).toISOString().split('T')[0] : '',
    active: initialData ? initialData.active : true,
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
      maxDiscount: formData.maxDiscount === '' ? null : Number(formData.maxDiscount),
      usageLimit: formData.usageLimit === '' ? null : Number(formData.usageLimit),
      perCustomerLimit: formData.perCustomerLimit === '' ? null : Number(formData.perCustomerLimit),
      startDate: formData.startDate || null,
      expiryDate: formData.expiryDate || null,
    };

    const validationResult = couponFormSchema.safeParse(formattedData);
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
      const url = initialData ? `/api/admin/coupons/${initialData.id}` : '/api/admin/coupons';
      const method = initialData ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validationResult.data),
      });

      if (res.ok) {
        router.push('/admin/coupons');
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
          <label className="block text-sm font-medium mb-1">Coupon Code *</label>
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            className={`w-full border rounded-lg px-3 py-2 uppercase ${errors.code ? 'border-red-500' : 'border-input bg-card'}`}
            placeholder="SUMMER2026"
          />
          {errors.code && <p className="text-red-500 text-xs mt-1">{errors.code}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <label className="flex items-center space-x-2 mt-2">
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleChange}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <span>Active</span>
          </label>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 border-input bg-card"
            rows={2}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Discount Type *</label>
          <select
            name="discountType"
            value={formData.discountType}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 border-input bg-card"
          >
            <option value="PERCENTAGE">Percentage (%)</option>
            <option value="FIXED">Fixed Amount (₹)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Discount Value *</label>
          <input
            type="number"
            name="discountValue"
            value={formData.discountValue}
            onChange={handleChange}
            className={`w-full border rounded-lg px-3 py-2 ${errors.discountValue ? 'border-red-500' : 'border-input bg-card'}`}
            min="0"
            step="0.01"
          />
          {errors.discountValue && <p className="text-red-500 text-xs mt-1">{errors.discountValue}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Minimum Order Value</label>
          <input
            type="number"
            name="minOrderValue"
            value={formData.minOrderValue}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 border-input bg-card"
            min="0"
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Max Discount Amount</label>
          <input
            type="number"
            name="maxDiscount"
            value={formData.maxDiscount}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 border-input bg-card"
            min="0"
            step="0.01"
            placeholder="Leave empty for no limit"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Total Usage Limit</label>
          <input
            type="number"
            name="usageLimit"
            value={formData.usageLimit}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 border-input bg-card"
            min="1"
            placeholder="Leave empty for no limit"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Per Customer Limit</label>
          <input
            type="number"
            name="perCustomerLimit"
            value={formData.perCustomerLimit}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 border-input bg-card"
            min="1"
            placeholder="Leave empty for no limit"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Valid From</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 border-input bg-card"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Valid Until</label>
          <input
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            className={`w-full border rounded-lg px-3 py-2 ${errors.expiryDate ? 'border-red-500' : 'border-input bg-card'}`}
          />
          {errors.expiryDate && <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-border">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin/coupons')}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : (initialData ? 'Update Coupon' : 'Create Coupon')}
        </Button>
      </div>
    </form>
  );
}
