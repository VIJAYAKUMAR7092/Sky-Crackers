"use client"
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ArrowUp, ArrowDown, Save } from "lucide-react";
import { updateOrder } from "./actions";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function HomePageCategoryClient({ initialCategories }: { initialCategories: any[] }) {
  const [items, setItems] = useState(initialCategories);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const moveItem = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === items.length - 1) return;

    const newItems = [...items];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;

    setItems(newItems);
  };

  const handleSave = async () => {
    setIsSaving(true);
    const updates = items.map((item, index) => ({
      id: item.id,
      sortOrder: index
    }));
    
    const res = await updateOrder(updates);
    if (!res.success) {
      alert("Error: " + res.error);
    } else {
      alert("Order updated successfully!");
      router.refresh();
    }
    setIsSaving(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">Change the order of categories displayed on the Home Page.</p>
        <Button onClick={handleSave} disabled={isSaving}>
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? "Saving..." : "Save Order"}
        </Button>
      </div>
      
      <div className="border rounded-md divide-y">
        {items.map((cat, idx) => (
          <div key={cat.id} className="flex items-center justify-between p-4 bg-card">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 relative rounded-md overflow-hidden bg-muted">
                {cat.image && <Image src={cat.image} alt={cat.name} fill className="object-cover" />}
              </div>
              <span className="font-medium">{cat.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => moveItem(idx, 'up')}
                disabled={idx === 0}
              >
                <ArrowUp className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => moveItem(idx, 'down')}
                disabled={idx === items.length - 1}
              >
                <ArrowDown className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
