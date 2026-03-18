'use client';

import { TopBar } from '@/components/layout/top-bar';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import Link from 'next/link';
import {
  Bot,
  Zap,
  TrendingUp,
  DollarSign,
  Activity,
  Clock,
  ArrowRight,
  Plus,
  Play,
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from 'lucide-react';

const recentAgents = [
  { id: '1', name: 'Customer Support Bot', role: 'support', status: 'deployed' as const, runs: 1247, successRate: 94.2 },
  { id: '2', name: 'Research Assistant', role: 'researcher', status: 'deployed' as const, runs: 856, successRate: 91.8 },
  { id: '3', name: 'Email Summarizer', role: 'writer', status: 'testing' as const, runs: 45, successRate: 88.5 },
  { id: '4', name: 'Lead Qualifier', role: 'sales', status: 'deployed' as const, runs: 632, successRate: 96.1 },
];

const recentRuns = [
  { id: '1', agent: 'Customer Support Bot', input: 'How do I reset my password?', status: 'completed' as const, cost: 0.003, duration: '1.2s', time: '2 min ago' },
  { id: '2', agent: 'Research Assistant', input: 'Find recent papers on RAG architectures', status: 'completed' as const, cost: 0.012, duration: '4.8s', time: '5 min ago' },
  { id: '3', agent: 'Lead Qualifier', input: 'Evaluate lead: john@company.com', status: 'failed' as const, cost: 0.001, duration: '0.3s', time: '8 min ago' },
  { id: '4', agent: 'Email Summarizer', input: 'Summarize inbox from today', status: 'completed' as const, cost: 0.008, duration: '3.1s', time: '12 min ago' },
  { id: '5', agent: 'Customer Support Bot', input: 'I need to update my billing info', status: 'completed' as const, cost: 0.004, duration: '1.5s', time: '15 min ago' },
];

const statusBadge = {
  deployed: { variant: 'success' as const, label: 'Deployed' },
  testing: { variant: 'warning' as const, label: 'Testing' },
  draft: { variant: 'default' as const, label: 'Draft' },
  paused: { variant: 'danger' as const, label: 'Paused' },
  archived: { variant: 'default' as const, label: 'Archived' },
};

const runStatusIcon = {
  completed: <CheckCircle2 className="w-4 h-4 text-success-500" />,
  failed: <XCircle className="w-4 h-4 text-danger-500" />,
  running: <Activity className="w-4 h-4 text-spark-500 animate-pulse" />,
  cancelled: <AlertTriangle className="w-4 h-4 text-warning-500" />,
};

export default function DashboardPage() {
  return (
    <div>
      <TopBar
        title="Dashboard"
        subtitle="Overview of your AI agent workforce"
        action={{ label: 'New Agent', href: '/agent-builder' }}
      />

      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Active Agents"
            value="12"
            change={8.3}
            trend="up"
            icon={<Bot className="w-5 h-5" />}
          />
          <StatCard
            title="Total Runs Today"
            value="2,847"
            change={12.5}
            trend="up"
            icon={<Zap className="w-5 h-5" />}
          />
          <StatCard
            title="Success Rate"
            value="94.2%"
            change={1.8}
            trend="up"
            icon={<TrendingUp className="w-5 h-5" />}
          />
          <StatCard
            title="Cost Today"
            value="$14.82"
            change={-5.2}
            trend="down"
            icon={<DollarSign className="w-5 h-5" />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Agent List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Your Agents</CardTitle>
                <Link href="/agents">
                  <Button variant="ghost" size="sm">
                    View All <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </CardHeader>
              <div className="space-y-3">
                {recentAgents.map((agent) => (
                  <div
                    key={agent.id}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar name={agent.name} size="md" />
                      <div>
                        <p className="text-sm font-medium text-surface-900">{agent.name}</p>
                        <p className="text-xs text-surface-500 capitalize">{agent.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium text-surface-900">{agent.runs.toLocaleString()} runs</p>
                        <p className="text-xs text-surface-500">{agent.successRate}% success</p>
                      </div>
                      <Badge variant={statusBadge[agent.status].variant}>
                        {statusBadge[agent.status].label}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card>
              <CardTitle className="mb-4">Quick Actions</CardTitle>
              <div className="space-y-2">
                <Link href="/agent-builder" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Plus className="w-4 h-4" />
                    Create New Agent
                  </Button>
                </Link>
                <Link href="/sandbox" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Play className="w-4 h-4" />
                    Test in Sandbox
                  </Button>
                </Link>
                <Link href="/marketplace" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Zap className="w-4 h-4" />
                    Browse Marketplace
                  </Button>
                </Link>
              </div>
            </Card>

            <Card>
              <CardTitle className="mb-4">Cost Overview</CardTitle>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-surface-500">This month</span>
                  <span className="font-semibold text-surface-900">$142.38</span>
                </div>
                <div className="w-full bg-surface-100 rounded-full h-2">
                  <div className="bg-spark-600 h-2 rounded-full" style={{ width: '47%' }} />
                </div>
                <div className="flex justify-between text-xs text-surface-500">
                  <span>$142.38 used</span>
                  <span>$300 budget</span>
                </div>
                <div className="pt-2 border-t border-surface-100">
                  <div className="flex justify-between text-sm">
                    <span className="text-surface-500">Projected</span>
                    <span className="font-semibold text-surface-900">$284.76</span>
                  </div>
                  <p className="text-xs text-success-500 mt-1">Under budget by ~$15</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Recent Runs */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Runs</CardTitle>
            <Link href="/monitoring">
              <Button variant="ghost" size="sm">
                View All <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-surface-100">
                  <th className="text-left text-xs font-medium text-surface-500 pb-3 pl-3">Status</th>
                  <th className="text-left text-xs font-medium text-surface-500 pb-3">Agent</th>
                  <th className="text-left text-xs font-medium text-surface-500 pb-3">Input</th>
                  <th className="text-right text-xs font-medium text-surface-500 pb-3">Cost</th>
                  <th className="text-right text-xs font-medium text-surface-500 pb-3">Duration</th>
                  <th className="text-right text-xs font-medium text-surface-500 pb-3 pr-3">Time</th>
                </tr>
              </thead>
              <tbody>
                {recentRuns.map((run) => (
                  <tr key={run.id} className="border-b border-surface-50 hover:bg-surface-50 transition-colors">
                    <td className="py-3 pl-3">{runStatusIcon[run.status]}</td>
                    <td className="py-3 text-sm font-medium text-surface-900">{run.agent}</td>
                    <td className="py-3 text-sm text-surface-600 max-w-xs truncate">{run.input}</td>
                    <td className="py-3 text-sm text-surface-600 text-right font-mono">${run.cost.toFixed(3)}</td>
                    <td className="py-3 text-sm text-surface-500 text-right">{run.duration}</td>
                    <td className="py-3 text-xs text-surface-400 text-right pr-3">{run.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
