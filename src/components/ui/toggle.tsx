'use client';

import { cn } from '@/utils/cn';

interface ToggleProps {
  label?: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export function Toggle({ label, description, checked, onChange, className }: ToggleProps) {
  return (
    <label className={cn('flex items-start gap-3 cursor-pointer group', className)}>
      <div className="relative mt-0.5">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div
          className={cn(
            'w-10 h-6 rounded-full transition-colors duration-200',
            checked ? 'bg-spark-600' : 'bg-surface-300 group-hover:bg-surface-400'
          )}
        />
        <div
          className={cn(
            'absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200',
            checked && 'translate-x-4'
          )}
        />
      </div>
      {(label || description) && (
        <div>
          {label && <p className="text-sm font-medium text-surface-700">{label}</p>}
          {description && <p className="text-xs text-surface-500 mt-0.5">{description}</p>}
        </div>
      )}
    </label>
  );
}
