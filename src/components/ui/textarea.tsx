'use client';

import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-surface-700">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          className={cn(
            'w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-surface-900',
            'placeholder:text-surface-400',
            'focus:outline-none focus:ring-2 focus:ring-spark-500 focus:border-transparent',
            'transition-all duration-200 resize-y min-h-[80px]',
            error
              ? 'border-danger-500 focus:ring-danger-500'
              : 'border-surface-200 hover:border-surface-300',
            className
          )}
          {...props}
        />
        {error && <p className="text-sm text-danger-500">{error}</p>}
        {hint && !error && <p className="text-sm text-surface-500">{hint}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
