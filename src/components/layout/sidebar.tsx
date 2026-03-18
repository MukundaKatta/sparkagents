'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils/cn';
import {
  Bot,
  Wrench,
  BookOpen,
  FlaskConical,
  Rocket,
  Store,
  Users,
  BarChart3,
  Shield,
  CreditCard,
  Zap,
  ChevronLeft,
  ChevronRight,
  Plus,
  Settings,
  HelpCircle,
} from 'lucide-react';

const navItems = [
  { label: 'Agents', href: '/agents', icon: Bot },
  { label: 'Agent Builder', href: '/agent-builder', icon: Plus },
  { label: 'Tool Library', href: '/tools', icon: Wrench },
  { label: 'Knowledge Base', href: '/knowledge', icon: BookOpen },
  { label: 'Guardrails', href: '/guardrails', icon: Shield },
  { label: 'Sandbox', href: '/sandbox', icon: FlaskConical },
  { label: 'Deploy', href: '/deploy', icon: Rocket },
  { label: 'Marketplace', href: '/marketplace', icon: Store },
  { label: 'Teams', href: '/teams', icon: Users },
  { label: 'Monitoring', href: '/monitoring', icon: BarChart3 },
  { label: 'Billing', href: '/billing', icon: CreditCard },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-screen bg-white border-r border-surface-200 z-40 flex flex-col transition-all duration-300',
        collapsed ? 'w-[68px]' : 'w-[240px]'
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 h-16 border-b border-surface-100 flex-shrink-0">
        <div className="w-8 h-8 bg-gradient-to-br from-spark-500 to-spark-700 rounded-lg flex items-center justify-center flex-shrink-0">
          <Zap className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <span className="text-lg font-bold bg-gradient-to-r from-spark-600 to-spark-800 bg-clip-text text-transparent">
            SparkAgents
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        <div className="space-y-0.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-spark-50 text-spark-700'
                    : 'text-surface-600 hover:bg-surface-50 hover:text-surface-900'
                )}
                title={collapsed ? item.label : undefined}
              >
                <item.icon className={cn('w-5 h-5 flex-shrink-0', isActive && 'text-spark-600')} />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom */}
      <div className="border-t border-surface-100 p-2 space-y-0.5">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-surface-600 hover:bg-surface-50 hover:text-surface-900 transition-colors"
        >
          <Settings className="w-5 h-5" />
          {!collapsed && <span>Settings</span>}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-surface-500 hover:bg-surface-50 hover:text-surface-700 transition-colors w-full"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
