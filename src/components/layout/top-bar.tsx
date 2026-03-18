'use client';

import { Bell, Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import Link from 'next/link';

interface TopBarProps {
  title: string;
  subtitle?: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}

export function TopBar({ title, subtitle, action }: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-surface-100">
      <div className="flex items-center justify-between h-16 px-6">
        <div>
          <h1 className="text-xl font-bold text-surface-900">{title}</h1>
          {subtitle && <p className="text-sm text-surface-500">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-3">
          {action && (
            action.href ? (
              <Link href={action.href}>
                <Button size="sm">
                  <Plus className="w-4 h-4" />
                  {action.label}
                </Button>
              </Link>
            ) : (
              <Button size="sm" onClick={action.onClick}>
                <Plus className="w-4 h-4" />
                {action.label}
              </Button>
            )
          )}

          <button className="relative p-2 text-surface-400 hover:text-surface-600 hover:bg-surface-50 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger-500 rounded-full" />
          </button>

          <div className="w-px h-8 bg-surface-200" />

          <button className="flex items-center gap-2 hover:bg-surface-50 rounded-lg p-1.5 pr-3 transition-colors">
            <Avatar name="User" size="sm" />
            <span className="text-sm font-medium text-surface-700">My Account</span>
          </button>
        </div>
      </div>
    </header>
  );
}
