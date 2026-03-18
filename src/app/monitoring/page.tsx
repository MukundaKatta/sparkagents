'use client';

import { useState } from 'react';
import { TopBar } from '@/components/layout/top-bar';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { Badge } from '@/components/ui/badge';
import { Tabs } from '@/components/ui/tabs';
import { Select } from '@/components/ui/select';
import { cn } from '@/utils/cn';
import {
  Activity, CheckCircle2, XCircle, Clock, DollarSign, Zap,
  TrendingUp, TrendingDown, BarChart3, PieChart, AlertTriangle,
  Bot, Search, RefreshCw,
} from 'lucide-react';

const timeRanges = [
  { value: '1h', label: 'Last Hour' },
  { value: '24h', label: 'Last 24 Hours' },
  { value: '7d', label: 'Last 7 Days' },
  { value: '30d', label: 'Last 30 Days' },
];

const recentRuns = [
  { id: '1', agent: 'Customer Support Bot', input: 'How do I reset my password?', status: 'completed' as const, cost: 0.003, duration: 1200, tokens: 156, time: '2 min ago', source: 'API' },
  { id: '2', agent: 'Research Assistant', input: 'Find recent papers on RAG', status: 'completed' as const, cost: 0.012, duration: 4800, tokens: 520, time: '5 min ago', source: 'Widget' },
  { id: '3', agent: 'Lead Qualifier', input: 'Evaluate lead: john@co.com', status: 'failed' as const, cost: 0.001, duration: 300, tokens: 42, time: '8 min ago', source: 'API' },
  { id: '4', agent: 'Email Summarizer', input: 'Summarize inbox from today', status: 'completed' as const, cost: 0.008, duration: 3100, tokens: 380, time: '12 min ago', source: 'Scheduled' },
  { id: '5', agent: 'Customer Support Bot', input: 'Update billing information', status: 'completed' as const, cost: 0.004, duration: 1500, tokens: 198, time: '15 min ago', source: 'Widget' },
  { id: '6', agent: 'Research Assistant', input: 'Competitor analysis Q1 2024', status: 'completed' as const, cost: 0.015, duration: 6200, tokens: 680, time: '18 min ago', source: 'Sandbox' },
  { id: '7', agent: 'Data Analyst', input: 'Sales trends last quarter', status: 'failed' as const, cost: 0.002, duration: 800, tokens: 85, time: '22 min ago', source: 'API' },
  { id: '8', agent: 'Customer Support Bot', input: 'Shipping status for order #1234', status: 'completed' as const, cost: 0.005, duration: 1800, tokens: 210, time: '25 min ago', source: 'Slack' },
];

const agentPerformance = [
  { name: 'Customer Support Bot', runs: 1247, success: 94.2, avgDuration: '1.4s', cost: 42.18, trend: 'up' as const },
  { name: 'Research Assistant', runs: 856, success: 91.8, avgDuration: '4.2s', cost: 89.32, trend: 'up' as const },
  { name: 'Lead Qualifier', runs: 632, success: 96.1, avgDuration: '1.8s', cost: 28.45, trend: 'stable' as const },
  { name: 'Email Summarizer', runs: 450, success: 88.5, avgDuration: '3.0s', cost: 18.90, trend: 'down' as const },
  { name: 'Data Analyst', runs: 210, success: 87.3, avgDuration: '5.1s', cost: 15.67, trend: 'down' as const },
];

const topQueries = [
  { query: 'Password reset help', count: 342, cost: 1.02 },
  { query: 'Billing/payment questions', count: 218, cost: 0.87 },
  { query: 'Product feature inquiries', count: 186, cost: 0.74 },
  { query: 'Shipping status', count: 156, cost: 0.62 },
  { query: 'Account setup help', count: 124, cost: 0.50 },
];

const errorBreakdown = [
  { type: 'Rate limit exceeded', count: 23, pct: 38 },
  { type: 'Tool execution failed', count: 18, pct: 30 },
  { type: 'Token limit exceeded', count: 12, pct: 20 },
  { type: 'Timeout', count: 7, pct: 12 },
];

export default function MonitoringPage() {
  const [timeRange, setTimeRange] = useState('24h');
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'runs', label: 'Runs', icon: <Activity className="w-4 h-4" />, count: 2847 },
    { id: 'agents', label: 'Agents', icon: <Bot className="w-4 h-4" /> },
    { id: 'errors', label: 'Errors', icon: <AlertTriangle className="w-4 h-4" />, count: 60 },
  ];

  return (
    <div>
      <TopBar title="Monitoring" subtitle="Track agent runs, performance, and costs" />

      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
          <Select
            options={timeRanges}
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="w-40"
          />
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard title="Total Runs" value="2,847" change={12.5} trend="up" icon={<Zap className="w-5 h-5" />} />
              <StatCard title="Success Rate" value="93.4%" change={1.8} trend="up" icon={<CheckCircle2 className="w-5 h-5" />} />
              <StatCard title="Avg Duration" value="2.8s" change={-8.3} trend="down" icon={<Clock className="w-5 h-5" />} />
              <StatCard title="Total Cost" value="$194.52" change={5.2} trend="up" icon={<DollarSign className="w-5 h-5" />} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Hourly Distribution Chart Placeholder */}
              <Card className="lg:col-span-2">
                <div className="p-5">
                  <CardTitle className="mb-4">Runs Over Time</CardTitle>
                  <div className="h-64 flex items-end gap-1.5 px-2">
                    {Array.from({ length: 24 }, (_, i) => {
                      const height = Math.max(10, Math.random() * 100);
                      const isNow = i === 14;
                      return (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                          <div
                            className={cn(
                              'w-full rounded-t transition-all',
                              isNow ? 'bg-spark-500' : 'bg-spark-200 hover:bg-spark-300'
                            )}
                            style={{ height: `${height}%` }}
                          />
                          {i % 4 === 0 && (
                            <span className="text-[10px] text-surface-400">{`${i}:00`}</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Card>

              {/* Top Queries */}
              <Card>
                <div className="p-5">
                  <CardTitle className="mb-4">Top Queries</CardTitle>
                  <div className="space-y-3">
                    {topQueries.map((q, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="text-xs font-medium text-surface-400 w-5">{i + 1}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-surface-700 truncate">{q.query}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs text-surface-500">{q.count} runs</span>
                            <span className="text-xs text-surface-400">${q.cost.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Agent Performance */}
              <Card>
                <div className="p-5">
                  <CardTitle className="mb-4">Agent Performance</CardTitle>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-surface-100">
                          <th className="text-left text-xs font-medium text-surface-500 pb-2">Agent</th>
                          <th className="text-right text-xs font-medium text-surface-500 pb-2">Runs</th>
                          <th className="text-right text-xs font-medium text-surface-500 pb-2">Success</th>
                          <th className="text-right text-xs font-medium text-surface-500 pb-2">Avg Time</th>
                          <th className="text-right text-xs font-medium text-surface-500 pb-2">Cost</th>
                        </tr>
                      </thead>
                      <tbody>
                        {agentPerformance.map((agent) => (
                          <tr key={agent.name} className="border-b border-surface-50">
                            <td className="py-2.5">
                              <div className="flex items-center gap-2">
                                <Avatar name={agent.name} size="sm" />
                                <span className="text-sm font-medium text-surface-900">{agent.name}</span>
                              </div>
                            </td>
                            <td className="py-2.5 text-sm text-surface-700 text-right">{agent.runs.toLocaleString()}</td>
                            <td className="py-2.5 text-right">
                              <span className={cn('text-sm font-medium', agent.success >= 90 ? 'text-success-500' : 'text-warning-500')}>
                                {agent.success}%
                              </span>
                            </td>
                            <td className="py-2.5 text-sm text-surface-600 text-right font-mono">{agent.avgDuration}</td>
                            <td className="py-2.5 text-sm text-surface-600 text-right font-mono">${agent.cost.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Card>

              {/* Error Breakdown */}
              <Card>
                <div className="p-5">
                  <CardTitle className="mb-4">Error Breakdown</CardTitle>
                  <div className="space-y-4">
                    {errorBreakdown.map((err) => (
                      <div key={err.type}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-surface-700">{err.type}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-surface-900">{err.count}</span>
                            <span className="text-xs text-surface-400">{err.pct}%</span>
                          </div>
                        </div>
                        <div className="w-full bg-surface-100 rounded-full h-2">
                          <div
                            className="bg-danger-500 rounded-full h-2 transition-all duration-500"
                            style={{ width: `${err.pct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'runs' && (
          <Card>
            <div className="p-5">
              <CardTitle className="mb-4">Recent Runs</CardTitle>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-surface-100">
                      <th className="text-left text-xs font-medium text-surface-500 pb-3">Status</th>
                      <th className="text-left text-xs font-medium text-surface-500 pb-3">Agent</th>
                      <th className="text-left text-xs font-medium text-surface-500 pb-3">Input</th>
                      <th className="text-left text-xs font-medium text-surface-500 pb-3">Source</th>
                      <th className="text-right text-xs font-medium text-surface-500 pb-3">Tokens</th>
                      <th className="text-right text-xs font-medium text-surface-500 pb-3">Cost</th>
                      <th className="text-right text-xs font-medium text-surface-500 pb-3">Duration</th>
                      <th className="text-right text-xs font-medium text-surface-500 pb-3">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentRuns.map((run) => (
                      <tr key={run.id} className="border-b border-surface-50 hover:bg-surface-50 cursor-pointer">
                        <td className="py-3">
                          {run.status === 'completed' ? (
                            <CheckCircle2 className="w-4 h-4 text-success-500" />
                          ) : (
                            <XCircle className="w-4 h-4 text-danger-500" />
                          )}
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <Avatar name={run.agent} size="sm" />
                            <span className="text-sm font-medium text-surface-900">{run.agent}</span>
                          </div>
                        </td>
                        <td className="py-3 text-sm text-surface-600 max-w-xs truncate">{run.input}</td>
                        <td className="py-3"><Badge size="sm">{run.source}</Badge></td>
                        <td className="py-3 text-sm text-surface-600 text-right font-mono">{run.tokens}</td>
                        <td className="py-3 text-sm text-surface-600 text-right font-mono">${run.cost.toFixed(3)}</td>
                        <td className="py-3 text-sm text-surface-500 text-right">{(run.duration / 1000).toFixed(1)}s</td>
                        <td className="py-3 text-xs text-surface-400 text-right">{run.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        )}

        {activeTab === 'agents' && (
          <Card>
            <div className="p-5">
              <CardTitle className="mb-4">Agent Performance</CardTitle>
              <div className="space-y-4">
                {agentPerformance.map((agent) => (
                  <div key={agent.name} className="flex items-center gap-4 p-4 bg-surface-50 rounded-xl">
                    <Avatar name={agent.name} size="lg" />
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-surface-900">{agent.name}</h4>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs text-surface-500">{agent.runs.toLocaleString()} runs</span>
                        <span className={cn('text-xs font-medium', agent.success >= 90 ? 'text-success-500' : 'text-warning-500')}>
                          {agent.success}% success
                        </span>
                        <span className="text-xs text-surface-500">{agent.avgDuration} avg</span>
                        <span className="text-xs text-surface-500">${agent.cost.toFixed(2)} total</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {agent.trend === 'up' && <TrendingUp className="w-4 h-4 text-success-500" />}
                      {agent.trend === 'down' && <TrendingDown className="w-4 h-4 text-danger-500" />}
                      {agent.trend === 'stable' && <span className="text-xs text-surface-400">Stable</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}

        {activeTab === 'errors' && (
          <div className="space-y-4">
            <Card>
              <div className="p-5">
                <CardTitle className="mb-4">Error Breakdown</CardTitle>
                <div className="space-y-4">
                  {errorBreakdown.map((err) => (
                    <div key={err.type} className="flex items-center gap-4 p-3 bg-danger-50 rounded-lg border border-danger-100">
                      <AlertTriangle className="w-5 h-5 text-danger-500 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-danger-700">{err.type}</p>
                        <p className="text-xs text-danger-500">{err.count} occurrences ({err.pct}% of all errors)</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
