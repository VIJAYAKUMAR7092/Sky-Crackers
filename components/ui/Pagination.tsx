import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { buttonVariants } from './Button';
import { cn } from './utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  searchParams?: Record<string, string | string[] | undefined>;
}

export function Pagination({ currentPage, totalPages, baseUrl, searchParams = {} }: PaginationProps) {
  if (totalPages <= 1) return null;

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) => {
      if (typeof value === 'string') {
        params.append(key, value);
      } else if (Array.isArray(value)) {
        value.forEach(v => params.append(key, v));
      }
    });
    params.set('page', page.toString());
    return `${baseUrl}?${params.toString()}`;
  };

  return (
    <div className="flex items-center justify-between px-2 py-4">
      <div className="text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </div>
      <div className="flex space-x-2">
        <Link
          href={currentPage > 1 ? createPageUrl(currentPage - 1) : '#'}
          className={cn(
            buttonVariants({ variant: 'outline', size: 'sm' }),
            currentPage <= 1 && 'pointer-events-none opacity-50'
          )}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </Link>
        <Link
          href={currentPage < totalPages ? createPageUrl(currentPage + 1) : '#'}
          className={cn(
            buttonVariants({ variant: 'outline', size: 'sm' }),
            currentPage >= totalPages && 'pointer-events-none opacity-50'
          )}
        >
          Next
          <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </div>
  );
}
