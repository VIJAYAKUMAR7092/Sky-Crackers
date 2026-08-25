import React from 'react';
import { Loader2 } from 'lucide-react';

export default function AdminLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full animate-in fade-in duration-500">
      <div className="flex flex-col items-center gap-4 text-muted-foreground p-8 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/50 shadow-sm">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm font-medium tracking-wider uppercase text-primary/80 animate-pulse">Loading data...</p>
      </div>
    </div>
  );
}
