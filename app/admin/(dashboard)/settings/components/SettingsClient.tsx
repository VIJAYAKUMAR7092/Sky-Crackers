'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { useRouter } from 'next/navigation';

interface SettingsClientProps {
  initialData: {
    general: any;
    business: any;
    delivery: any;
    payment: any;
    seo: any;
  };
}

export default function SettingsClient({ initialData }: SettingsClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('general');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'business', label: 'Business' },
    { id: 'delivery', label: 'Delivery' },
    { id: 'payment', label: 'Payment' },
    { id: 'seo', label: 'SEO' },
  ];

  const handleSave = async (e: React.FormEvent<HTMLFormElement>, type: string) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget);
      const payload = Object.fromEntries(formData.entries());
      
      // Parse booleans correctly if needed
      if (type === 'PAYMENT_SETTINGS') {
        payload.codEnabled = payload.codEnabled === 'on' ? 'true' : 'false';
      }

      const res = await fetch(`/api/admin/settings/${type}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Failed to save settings');
      router.refresh();
      alert('Settings saved successfully!');
    } catch (err: any) {
      alert(err.message || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex space-x-2 border-b border-border pb-2 overflow-x-auto scrollbar-hide">
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

      <div className="grid grid-cols-1 gap-6">
        {activeTab === 'general' && (
          <Card className="border-border/60 shadow-lg bg-card/50 backdrop-blur-sm fade-in-up">
            <CardHeader>
              <CardTitle>General Store Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => handleSave(e, 'GENERAL_SETTINGS')} className="space-y-4 max-w-xl">
                <div className="space-y-2">
                  <Label>Store Name</Label>
                  <Input name="storeName" defaultValue={initialData.general.storeName} required />
                </div>
                <div className="space-y-2">
                  <Label>Contact Number</Label>
                  <Input name="contactNumber" defaultValue={initialData.general.contactNumber} required />
                </div>
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input name="email" type="email" defaultValue={initialData.general.email} required />
                </div>
                <div className="space-y-2">
                  <Label>Physical Address</Label>
                  <Input name="address" defaultValue={initialData.general.address} />
                </div>
                <div className="space-y-2">
                  <Label>Logo URL</Label>
                  <Input name="logo" defaultValue={initialData.general.logo} />
                </div>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Save Settings'}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {activeTab === 'business' && (
          <Card className="border-border/60 shadow-lg bg-card/50 backdrop-blur-sm fade-in-up">
            <CardHeader>
              <CardTitle>Business & GST Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => handleSave(e, 'BUSINESS_SETTINGS')} className="space-y-4 max-w-xl">
                <div className="space-y-2">
                  <Label>GST Number</Label>
                  <Input name="gstNumber" defaultValue={initialData.business.gstNumber} />
                </div>
                <div className="space-y-2">
                  <Label>Invoice Prefix (e.g. INV-)</Label>
                  <Input name="invoicePrefix" defaultValue={initialData.business.invoicePrefix} />
                </div>
                <div className="space-y-2">
                  <Label>Order Prefix (e.g. ORD-)</Label>
                  <Input name="orderPrefix" defaultValue={initialData.business.orderPrefix} />
                </div>
                <div className="space-y-2">
                  <Label>Currency Default</Label>
                  <Input name="currency" defaultValue={initialData.business.currency || 'INR'} />
                </div>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Save Settings'}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {activeTab === 'delivery' && (
          <Card className="border-border/60 shadow-lg bg-card/50 backdrop-blur-sm fade-in-up">
            <CardHeader>
              <CardTitle>Delivery Configurations</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => handleSave(e, 'DELIVERY_SETTINGS')} className="space-y-4 max-w-xl">
                <div className="space-y-2">
                  <Label>Base Delivery Charge</Label>
                  <Input name="baseDeliveryCharge" type="number" defaultValue={initialData.delivery.baseDeliveryCharge || 0} />
                </div>
                <div className="space-y-2">
                  <Label>Free Shipping Threshold</Label>
                  <Input name="freeShippingThreshold" type="number" defaultValue={initialData.delivery.freeShippingThreshold || 0} />
                </div>
                <div className="space-y-2">
                  <Label>Service Areas (Comma separated Pincodes/States)</Label>
                  <Input name="serviceAreas" defaultValue={initialData.delivery.serviceAreas} />
                </div>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Save Settings'}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {activeTab === 'payment' && (
          <Card className="border-border/60 shadow-lg bg-card/50 backdrop-blur-sm fade-in-up">
            <CardHeader>
              <CardTitle>Payment & Gateway Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => handleSave(e, 'PAYMENT_SETTINGS')} className="space-y-4 max-w-xl">
                <div className="flex items-center space-x-2 pb-4">
                  <input type="checkbox" id="codEnabled" name="codEnabled" defaultChecked={initialData.payment.codEnabled !== 'false'} className="w-4 h-4" />
                  <Label htmlFor="codEnabled">Enable Cash on Delivery (COD)</Label>
                </div>
                <div className="space-y-2">
                  <Label>Razorpay API Key (Placeholder)</Label>
                  <Input name="razorpayKey" type="password" defaultValue={initialData.payment.razorpayKey} placeholder="rzp_test_..." />
                </div>
                <div className="space-y-2">
                  <Label>Razorpay Secret (Placeholder)</Label>
                  <Input name="razorpaySecret" type="password" defaultValue={initialData.payment.razorpaySecret} placeholder="secret..." />
                </div>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Save Settings'}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {activeTab === 'seo' && (
          <Card className="border-border/60 shadow-lg bg-card/50 backdrop-blur-sm fade-in-up">
            <CardHeader>
              <CardTitle>Global SEO Configurations</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => handleSave(e, 'SEO_CONFIG')} className="space-y-4 max-w-xl">
                <div className="space-y-2">
                  <Label>Default Meta Title</Label>
                  <Input name="homepageTitle" defaultValue={initialData.seo.homepageTitle} />
                </div>
                <div className="space-y-2">
                  <Label>Default Meta Description</Label>
                  <Input name="metaDescription" defaultValue={initialData.seo.metaDescription} />
                </div>
                <div className="space-y-2">
                  <Label>Default Keywords</Label>
                  <Input name="keywords" defaultValue={initialData.seo.keywords} />
                </div>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Save Settings'}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
