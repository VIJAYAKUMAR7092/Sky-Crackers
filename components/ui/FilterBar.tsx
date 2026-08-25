import React from 'react';
import { Search } from './Search';
import { cn } from './utils';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterBarProps {
  onSearch: (query: string) => void;
  searchPlaceholder?: string;
  filters?: {
    name: string;
    options: FilterOption[];
    value: string;
    onChange: (val: string) => void;
  }[];
  actions?: React.ReactNode;
  className?: string;
}

export const FilterBar = React.memo(function FilterBar({ onSearch, searchPlaceholder = 'Search...', filters = [], actions, className }: FilterBarProps) {
  return (
    <div className={cn("flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-card p-4 border border-border rounded-xl shadow-sm", className)}>
      <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full sm:w-auto min-w-0">
        <div className="w-full sm:w-72">
          <Search onSearch={onSearch} placeholder={searchPlaceholder} />
        </div>
        
        {filters.length > 0 && (
          <div className="flex gap-2 min-w-0 overflow-x-auto pb-1 sm:pb-0 scrollbar-hide max-w-full">
            {filters.map((filter, i) => (
              <select
                key={i}
                value={filter.value}
                onChange={(e) => filter.onChange(e.target.value)}
                className="h-10 px-3 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all text-foreground"
              >
                <option value="">{filter.name}</option>
                {filter.options.map((opt, j) => (
                  <option key={j} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ))}
          </div>
        )}
      </div>

      {actions && (
        <div className="flex items-center gap-2 shrink-0">
          {actions}
        </div>
      )}
    </div>
  );
});
