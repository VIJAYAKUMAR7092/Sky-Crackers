import React from 'react';
import { Check } from 'lucide-react';

interface OrderTimelineProps {
  status: string;
}

const steps = [
  { id: 'PENDING', label: 'Pending' },
  { id: 'CONFIRMED', label: 'Confirmed' },
  { id: 'PACKED', label: 'Packed' },
  { id: 'SHIPPED', label: 'Shipped' },
  { id: 'DELIVERED', label: 'Delivered' },
];

export function OrderTimeline({ status }: OrderTimelineProps) {
  if (status === 'CANCELLED') {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 shadow-sm">
        <h3 className="font-semibold text-red-700 dark:text-red-400 text-lg mb-2">Order Cancelled</h3>
        <p className="text-red-600 dark:text-red-300 text-sm">This order has been cancelled and will not be processed.</p>
      </div>
    );
  }

  const currentStepIndex = steps.findIndex((s) => s.id === status);
  // Fallback if status is unrecognized, though our enums should prevent this
  const activeIndex = currentStepIndex >= 0 ? currentStepIndex : 0;

  return (
    <div className="bg-card border rounded-xl p-6 shadow-sm">
      <h3 className="font-semibold text-lg mb-6">Order Timeline</h3>
      
      <div className="relative">
        <div className="absolute left-0 top-1/2 -mt-px h-0.5 w-full bg-slate-200 dark:bg-slate-800 hidden sm:block" aria-hidden="true" />
        <ul className="relative flex flex-col sm:flex-row justify-between gap-6 sm:gap-0">
          {steps.map((step, index) => {
            const isCompleted = index < activeIndex;
            const isCurrent = index === activeIndex;

            return (
              <li key={step.id} className="relative flex items-center sm:block sm:text-center sm:flex-1">
                {/* Mobile line connecting steps */}
                {index !== steps.length - 1 && (
                  <div className="absolute left-4 top-10 -ml-px h-full w-0.5 bg-slate-200 dark:bg-slate-800 sm:hidden" aria-hidden="true" />
                )}
                
                <div className="flex items-center sm:justify-center sm:mb-3 relative z-10 w-8 sm:w-auto">
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full ring-4 ring-white dark:bg-slate-900 dark:ring-slate-900 ${
                      isCompleted
                        ? 'bg-blue-600 text-white'
                        : isCurrent
                        ? 'border-2 border-blue-600 bg-white text-blue-600'
                        : 'border-2 border-input bg-white text-slate-400'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="h-5 w-5" aria-hidden="true" />
                    ) : isCurrent ? (
                      <div className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                    ) : null}
                  </span>
                </div>
                <div className="ml-4 sm:ml-0 relative z-10 bg-card px-2">
                  <span
                    className={`text-sm font-medium ${
                      isCompleted || isCurrent ? 'text-slate-900 dark:text-slate-100' : 'text-muted-foreground'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
