'use client';

import { cn } from '@/utils/cn';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change?: number;
  trend?: 'up' | 'down' | 'stable';
  icon?: React.ReactNode;
  className?: string;
}

export function StatCard({ title, value, change, trend, icon, className }: StatCardProps) {
  return (
    <div className={cn('bg-white rounded-xl border border-surface-200 p-5', className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-surface-500 mb-1">{title}</p>
          <p className="text-2xl font-bold text-surface-900">{value}</p>
        </div>
        {icon && (
          <div className="w-10 h-10 rounded-lg bg-spark-50 flex items-center justify-center text-spark-600">
            {icon}
          </div>
        )}
      </div>
      {change !== undefined && trend && (
        <div className="flex items-center gap-1 mt-3">
          {trend === 'up' && <TrendingUp className="w-4 h-4 text-success-500" />}
          {trend === 'down' && <TrendingDown className="w-4 h-4 text-danger-500" />}
          {trend === 'stable' && <Minus className="w-4 h-4 text-surface-400" />}
          <span
            className={cn(
              'text-sm font-medium',
              trend === 'up' && 'text-success-500',
              trend === 'down' && 'text-danger-500',
              trend === 'stable' && 'text-surface-400'
            )}
          >
            {change > 0 ? '+' : ''}{change}%
          </span>
          <span className="text-xs text-surface-400 ml-1">vs last period</span>
        </div>
      )}
    </div>
  );
}
