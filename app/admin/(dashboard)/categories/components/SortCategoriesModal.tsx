'use client';

import React, { useState, useEffect } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Category {
  id: string;
  name: string;
  displayOrder: number;
}

interface SortModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
}

export function SortCategoriesModal({ isOpen, onClose, onSaved }: SortModalProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selections, setSelections] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      setErrorMsg('');
      fetch('/api/admin/categories?limit=1000', { cache: 'no-store' })
        .then(r => r.json())
        .then(d => {
          const sorted = (d.data?.data || []).sort((a: Category, b: Category) => a.displayOrder - b.displayOrder);
          setCategories(sorted);
          
          const initialSelections: Record<number, string> = {};
          sorted.forEach((cat: Category, idx: number) => {
            initialSelections[idx] = cat.id;
          });
          setSelections(initialSelections);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [isOpen]);

  const handleSelectionChange = (position: number, categoryId: string) => {
    setSelections(prev => ({
      ...prev,
      [position]: categoryId
    }));
    setErrorMsg(''); // clear errors on change
  };

  const getOrdinal = (n: number) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  const handleSave = async () => {
    // Validation: Check for duplicates or missing
    const selectedIds = Object.values(selections);
    const uniqueIds = new Set(selectedIds);
    
    if (selectedIds.length < categories.length || uniqueIds.size !== categories.length) {
      setErrorMsg('Duplicate or missing selections! Every category must have a unique position.');
      return;
    }

    setSaving(true);
    setErrorMsg('');
    
    
    const payload = Array.from({ length: categories.length }).map((_, pos) => ({
      id: selections[pos],
      displayOrder: pos
    }));

    try {
      const res = await fetch('/api/admin/categories/reorder', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        alert('Category order saved successfully!');
        onSaved();
        onClose();
      } else {
        setErrorMsg('Failed to save category order.');
      }
    } catch (e) {
      setErrorMsg('An unexpected error occurred while saving.');
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-background rounded-xl shadow-2xl w-full max-w-lg max-h-[85vh] flex flex-col overflow-hidden">
        
        <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-background">
          <div>
            <h2 className="text-xl font-bold text-foreground">Category Order</h2>
            <p className="text-sm text-muted-foreground mt-1">Assign positions to your categories</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-red-50 rounded-full transition-colors group">
            <X className="w-5 h-5 text-gray-400 group-hover:text-red-600" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 bg-muted/50">
          {loading ? (
            <div className="text-center text-muted-foreground font-medium py-10">Loading categories...</div>
          ) : (
            <div className="space-y-5">
              {errorMsg && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg flex items-center gap-2 text-sm font-medium border border-red-100">
                  <AlertCircle className="w-4 h-4" />
                  {errorMsg}
                </div>
              )}

              {categories.map((_, index) => {
                const positionNum = index + 1;
                
                // Check if this specific dropdown has a duplicate selected value elsewhere
                const currentValue = selections[index];
                const isDuplicate = currentValue && Object.values(selections).filter(id => id === currentValue).length > 1;

                return (
                  <div key={index} className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-gray-700 flex justify-between">
                      <span>{getOrdinal(positionNum)} Position</span>
                      {isDuplicate && <span className="text-xs text-red-500 font-medium">Duplicate</span>}
                    </label>
                    <div className="relative">
                      <select
                        value={selections[index] || ''}
                        onChange={(e) => handleSelectionChange(index, e.target.value)}
                        className={`w-full p-3 bg-background border ${isDuplicate ? 'border-red-400 focus:ring-red-500' : 'border-border focus:ring-red-500 focus:border-red-500'} rounded-lg shadow-sm appearance-none outline-none transition-all cursor-pointer text-gray-700 font-medium`}
                      >
                        <option value="" disabled>Select Category ▼</option>
                        {categories.map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-400">
                        ▼
                      </div>
                    </div>
                  </div>
                );
              })}

              {categories.length === 0 && (
                <div className="text-center text-muted-foreground py-4">No categories found.</div>
              )}
            </div>
          )}
        </div>

        <div className="p-5 border-t border-gray-100 bg-background flex justify-end gap-3 shadow-[0_-4px_10px_-4px_rgba(0,0,0,0.05)]">
           <Button variant="outline" onClick={onClose} className="border-border hover:bg-muted">Cancel</Button>
           <Button 
             className="bg-red-600 hover:bg-red-700 text-white min-w-[120px] shadow-sm shadow-red-200" 
             onClick={handleSave} 
             disabled={saving || categories.length === 0}
           >
             {saving ? 'Saving...' : 'Save Order'}
           </Button>
        </div>
        
      </div>
    </div>
  );
}
