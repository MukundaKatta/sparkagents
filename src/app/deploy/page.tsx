'use client';

import { useState } from 'react';
import { TopBar } from '@/components/layout/top-bar';
import { Card, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { cn } from '@/utils/cn';
import {
  Globe, MessageCircle, Clock, Hash, CheckCircle2, XCircle,
  Activity, Copy, ExternalLink, Settings, Pause, Play,
  BarChart3, Zap, ArrowUpRight,
} from 'lucide-react';

const deployments = [
  {
    id: '1', agent: 'Customer Support Bot', target: 'api' as const,
    endpoint: 'https://api.sparkagents.io/v1/agents/cs-bot/run',
    status: 'active' as const, requests24h: 1284, uptime: 99.9,
    lastActivity: '2 min ago',
  },
  {
    id: '2', agent: 'Customer Support Bot', target: 'widget' as const,
    endpoint: 'Embedded on support.example.com',
    status: 'active' as const, requests24h: 856, uptime: 99.9,
    lastActivity: '5 min ago',
  },
  {
    id: '3', agent: 'Research Assistant', target: 'api' as const,
    endpoint: 'https://api.sparkagents.io/v1/agents/researcher/run',
    status: 'active' as const, requests24h: 342, uptime: 99.8,
    lastActivity: '12 min ago',
  },
  {
    id: '4', agent: 'Email Summarizer', target: 'scheduled' as const,
    endpoint: 'Every weekday at 9:00 AM EST',
    status: 'active' as const, requests24h: 5, uptime: 100,
    lastActivity: '6 hours ago',
  },
  {
    id: '5', agent: 'Lead Qualifier', target: 'slack' as const,
    endpoint: '#sales-leads, DMs enabled',
    status: 'active' as const, requests24h: 156, uptime: 99.7,
    lastActivity: '8 min ago',
  },
  {
    id: '6', agent: 'Data Analyst', target: 'api' as const,
    endpoint: 'https://api.sparkagents.io/v1/agents/analyst/run',
    status: 'paused' as const, requests24h: 0, uptime: 0,
    lastActivity: '2 days ago',
  },
];

const targetConfig = {
  api: { label: 'API Endpoint', icon: <Globe className="w-4 h-4" />, color: 'bg-blue-50 text-blue-600' },
  widget: { label: 'Chat Widget', icon: <MessageCircle className="w-4 h-4" />, color: 'bg-purple-50 text-purple-600' },
  scheduled: { label: 'Scheduled', icon: <Clock className="w-4 h-4" />, color: 'bg-amber-50 text-amber-600' },
  slack: { label: 'Slack Bot', icon: <Hash className="w-4 h-4" />, color: 'bg-emerald-50 text-emerald-600' },
};

export default function DeployPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyEndpoint = (id: string, endpoint: string) => {
    navigator.clipboard.writeText(endpoint);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const activeCount = deployments.filter((d) => d.status === 'active').length;
  const totalRequests = deployments.reduce((sum, d) => sum + d.requests24h, 0);

  return (
    <div>
      <TopBar title="Deployments" subtitle="Manage all your agent deployments" />

      <div className="p-6 space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card padding="sm">
            <div className="p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success-50 text-success-500 flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-surface-500">Active</p>
                <p className="text-xl font-bold text-surface-900">{activeCount}</p>
              </div>
            </div>
          </Card>
          <Card padding="sm">
            <div className="p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-spark-50 text-spark-600 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-surface-500">Requests (24h)</p>
                <p className="text-xl font-bold text-surface-900">{totalRequests.toLocaleString()}</p>
              </div>
            </div>
          </Card>
          <Card padding="sm">
            <div className="p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-surface-500">Avg Uptime</p>
                <p className="text-xl font-bold text-surface-900">99.8%</p>
              </div>
            </div>
          </Card>
          <Card padding="sm">
            <div className="p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-surface-500">Deploy Types</p>
                <p className="text-xl font-bold text-surface-900">4</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Deployments List */}
        <div className="space-y-3">
          {deployments.map((dep) => {
            const target = targetConfig[dep.target];
            return (
              <Card key={dep.id}>
                <div className="p-4 flex items-center gap-4">
                  <Avatar name={dep.agent} size="md" />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-surface-900">{dep.agent}</h3>
                      <div className={cn('flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium', target.color)}>
                        {target.icon}
                        {target.label}
                      </div>
                      <Badge variant={dep.status === 'active' ? 'success' : 'danger'}>
                        {dep.status === 'active' ? 'Active' : 'Paused'}
                      </Badge>
                    </div>
                    <p className="text-xs text-surface-500 font-mono truncate">{dep.endpoint}</p>
                  </div>

                  <div className="flex items-center gap-6 text-right flex-shrink-0">
                    <div>
                      <p className="text-xs text-surface-500">Requests (24h)</p>
                      <p className="text-sm font-semibold text-surface-900">{dep.requests24h.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-surface-500">Uptime</p>
                      <p className="text-sm font-semibold text-surface-900">{dep.uptime}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-surface-500">Last Activity</p>
                      <p className="text-sm text-surface-700">{dep.lastActivity}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    {dep.target === 'api' && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyEndpoint(dep.id, dep.endpoint)}
                      >
                        {copiedId === dep.id ? <CheckCircle2 className="w-4 h-4 text-success-500" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    )}
                    <Button variant="ghost" size="icon">
                      {dep.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Settings className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <BarChart3 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
