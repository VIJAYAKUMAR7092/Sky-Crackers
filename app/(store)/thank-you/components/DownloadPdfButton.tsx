'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { FileText, Loader2 } from 'lucide-react';

interface DownloadPdfButtonProps {
  orderId: string;
  orderReference: string;
}

export function DownloadPdfButton({ orderId, orderReference }: DownloadPdfButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      const res = await fetch(`/api/orders/${orderId}/pdf`);
      
      if (!res.ok) {
        throw new Error('Failed to generate PDF');
      }
      
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `SKYCRACKERS-ORDER-${orderReference}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
    } catch (error) {
      console.error('PDF download error:', error);
      alert('Failed to download PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Button 
      onClick={handleDownload} 
      disabled={isDownloading}
      size="lg"
      className="w-full sm:w-auto min-w-[200px]"
    >
      {isDownloading ? (
        <>
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          Generating PDF...
        </>
      ) : (
        <>
          <FileText className="w-5 h-5 mr-2" />
          Download Order PDF
        </>
      )}
    </Button>
  );
}
