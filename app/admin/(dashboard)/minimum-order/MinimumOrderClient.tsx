"use client";

import React, { useState } from "react";
import { updateMinimumOrder } from "./actions";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { Save, IndianRupee } from "lucide-react";

export function MinimumOrderClient({ initialZones, defaultMinOrder }: { initialZones: any[], defaultMinOrder: number }) {
  const router = useRouter();
  const [zones, setZones] = useState(initialZones);
  const [isSaving, setIsSaving] = useState<string | null>(null);

  const handleUpdate = async (id: string, amount: string) => {
    setIsSaving(id);
    const num = Number(amount);
    if (isNaN(num) || num < 0) {
      alert("Please enter a valid amount");
      setIsSaving(null);
      return;
    }
    
    try {
      const res = await updateMinimumOrder(id, num);
      if (res.success) {
        alert("Minimum order updated!");
        router.refresh();
      } else {
        alert("Failed: " + res.error);
      }
    } catch (e) {
      alert("Error saving");
    } finally {
      setIsSaving(null);
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border/60 shadow-sm overflow-hidden">
      <table className="w-full text-sm text-left">
        <thead className="bg-secondary/30 text-xs uppercase text-muted-foreground">
          <tr>
            <th className="px-6 py-4 font-semibold">State / Zone</th>
            <th className="px-6 py-4 font-semibold">Current Minimum Order (₹)</th>
            <th className="px-6 py-4 font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          <ZoneRow 
            zone={{ id: "default", name: "Default (Rest of India)", state: "All unconfigured states", minimumOrder: defaultMinOrder }} 
            isSaving={isSaving === "default"} 
            onSave={handleUpdate} 
          />
          {zones.map((zone, i) => (
            <ZoneRow key={zone.id} zone={zone} isSaving={isSaving === zone.id} onSave={handleUpdate} />
          ))}
          {zones.length === 0 && (
            <tr>
              <td colSpan={3} className="px-6 py-8 text-center text-muted-foreground">
                No delivery zones configured. Add zones in the Delivery section first.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function ZoneRow({ zone, isSaving, onSave }: { zone: any, isSaving: boolean, onSave: (id: string, amt: string) => void }) {
  const [val, setVal] = useState(zone.minimumOrder?.toString() || "0");
  
  return (
    <tr className="group hover:bg-muted/30 transition-colors">
      <td className="px-6 py-4">
        <div className="font-medium text-foreground">{zone.name}</div>
        <div className="text-xs text-muted-foreground">{zone.state || 'All States'}</div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2 max-w-[200px]">
          <IndianRupee className="w-4 h-4 text-muted-foreground" />
          <input 
            type="number" 
            value={val}
            onChange={(e) => setVal(e.target.value)}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </td>
      <td className="px-6 py-4 text-right">
        <Button 
          size="sm" 
          onClick={() => onSave(zone.id, val)}
          disabled={isSaving || val === zone.minimumOrder?.toString()}
          className="bg-primary hover:bg-primary/90"
        >
          {isSaving ? "Saving..." : <><Save className="w-4 h-4 mr-1" /> Save</>}
        </Button>
      </td>
    </tr>
  );
}
