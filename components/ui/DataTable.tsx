import React from 'react';
import { cn } from './utils';

export interface ColumnDef<T> {
  header: string | React.ReactNode;
  accessorKey?: keyof T;
  cell?: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  keyExtractor: (item: T) => string;
  className?: string;
  isLoading?: boolean;
}

export function DataTable<T>({ data, columns, keyExtractor, className, isLoading }: DataTableProps<T>) {
  if (isLoading) {
    return (
      <div className="w-full border border-border/60 rounded-xl bg-card shadow-sm overflow-hidden animate-pulse">
        <div className="h-12 bg-secondary/40 border-b border-border/50"></div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-16 border-b border-border/50 flex items-center px-6 gap-4">
            <div className="h-4 bg-muted/60 rounded w-1/4"></div>
            <div className="h-4 bg-muted/60 rounded w-1/4"></div>
            <div className="h-4 bg-muted/60 rounded w-1/4"></div>
            <div className="h-8 bg-muted/60 rounded w-16 ml-auto"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("w-full overflow-auto border border-border/60 rounded-xl bg-card shadow-lg", className)}>
      <table className="w-full text-sm text-left border-collapse">
        <thead className="text-xs text-muted-foreground uppercase bg-secondary/30 backdrop-blur-sm border-b border-border/60 sticky top-0 z-10">
          <tr>
            {columns.map((col, i) => (
              <th key={i} className={cn("px-6 py-4 font-semibold tracking-wider whitespace-nowrap", col.className)}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border/60">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-12 text-center text-muted-foreground">
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="p-3 bg-secondary/50 rounded-full">
                    <svg className="w-6 h-6 text-muted-foreground/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                  </div>
                  <p>No results found.</p>
                </div>
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr 
                key={keyExtractor(item)} 
                className="hover:bg-primary/5 transition-colors group cursor-default"
              >
                {columns.map((col, j) => (
                  <td key={j} className={cn("px-6 py-4 text-foreground align-middle transition-colors group-hover:text-foreground/90", col.className)}>
                    {col.cell ? col.cell(item) : String(item[col.accessorKey as keyof T] ?? "")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
