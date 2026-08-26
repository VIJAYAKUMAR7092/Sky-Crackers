"use client"
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ArrowUp, ArrowDown, Save, Plus, Trash2 } from "lucide-react";
import { saveBanners } from "./actions";
import { useRouter } from "next/navigation";

export function TopBannerClient({ initialBanners }: { initialBanners: any[] }) {
  const [items, setItems] = useState(initialBanners);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const handleAdd = () => {
    setItems([...items, { id: `new-${Date.now()}`, text: "", sortOrder: items.length }]);
  };

  const handleRemove = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleChange = (index: number, val: string) => {
    const newItems = [...items];
    newItems[index].text = val;
    setItems(newItems);
  };

  const moveItem = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === items.length - 1) return;

    const newItems = [...items];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;

    setItems(newItems);
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Sanitize and reassign sortOrder
    const updates = items.filter(i => i.text.trim() !== "").map((item, index) => ({
      id: item.id,
      text: item.text,
      sortOrder: index
    }));
    
    const res = await saveBanners(updates);
    if (!res.success) {
      alert("Error: " + res.error);
    } else {
      alert("Banners updated successfully!");
      router.refresh();
    }
    setIsSaving(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">Manage the scrolling text messages on the top of the home page.</p>
        <Button onClick={handleSave} disabled={isSaving}>
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
      
      <div className="border rounded-md divide-y bg-card">
        {items.length === 0 && <div className="p-4 text-center text-muted-foreground">No banners configured. Add one below.</div>}
        {items.map((item, idx) => (
          <div key={item.id} className="flex items-center justify-between p-4 gap-4">
            <input 
              type="text" 
              value={item.text}
              onChange={(e) => handleChange(idx, e.target.value)}
              placeholder="e.g. Welcome to Sky Crackers"
              className="flex-1 flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => moveItem(idx, "up")} disabled={idx === 0}>
                <ArrowUp className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => moveItem(idx, "down")} disabled={idx === items.length - 1}>
                <ArrowDown className="w-4 h-4" />
              </Button>
              <Button variant="destructive" size="icon" onClick={() => handleRemove(idx)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <Button variant="outline" onClick={handleAdd} className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        Add New Banner
      </Button>
    </div>
  );
}
