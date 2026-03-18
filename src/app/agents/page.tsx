'use client';

import { useState } from 'react';
import { TopBar } from '@/components/layout/top-bar';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { SearchBar } from '@/components/ui/search-bar';
import { Tabs } from '@/components/ui/tabs';
import { EmptyState } from '@/components/ui/empty-state';
import {
  Bot, MoreVertical, Play, Pause, Copy, Trash2, Settings,
  ExternalLink, BarChart3, Wrench, Clock,
} from 'lucide-react';
import { formatRelativeTime } from '@/utils/format';
import type { AgentStatus } from '@/types/agent';

const mockAgents = [
  {
    id: '1', name: 'Customer Support Bot', description: 'Handles first-line customer support inquiries, FAQs, and ticket routing.',
    role: 'support', status: 'deployed' as AgentStatus, model: 'gpt-4o', tools: 3, runs: 12470,
    successRate: 94.2, cost: 42.18, created_at: '2024-01-15T10:00:00Z', updated_at: '2024-03-17T08:30:00Z',
  },
  {
    id: '2', name: 'Research Assistant', description: 'Searches the web and synthesizes findings into structured reports.',
    role: 'researcher', status: 'deployed' as AgentStatus, model: 'gpt-4o', tools: 4, runs: 8560,
    successRate: 91.8, cost: 89.32, created_at: '2024-02-01T14:00:00Z', updated_at: '2024-03-16T22:15:00Z',
  },
  {
    id: '3', name: 'Email Summarizer', description: 'Reads email threads and creates concise summaries with action items.',
    role: 'writer', status: 'testing' as AgentStatus, model: 'gpt-4o-mini', tools: 2, runs: 450,
    successRate: 88.5, cost: 3.21, created_at: '2024-03-10T09:00:00Z', updated_at: '2024-03-17T06:00:00Z',
  },
  {
    id: '4', name: 'Lead Qualifier', description: 'Evaluates incoming leads against ICP criteria and scores them.',
    role: 'sales', status: 'deployed' as AgentStatus, model: 'gpt-4o', tools: 5, runs: 6320,
    successRate: 96.1, cost: 28.45, created_at: '2024-02-15T11:00:00Z', updated_at: '2024-03-17T09:00:00Z',
  },
  {
    id: '5', name: 'Data Analyst', description: 'Analyzes spreadsheet data and generates insights with visualizations.',
    role: 'analyst', status: 'paused' as AgentStatus, model: 'gpt-4-turbo', tools: 3, runs: 2100,
    successRate: 87.3, cost: 15.67, created_at: '2024-03-01T16:00:00Z', updated_at: '2024-03-15T12:00:00Z',
  },
  {
    id: '6', name: 'Code Reviewer', description: 'Reviews pull requests and suggests improvements.',
    role: 'developer', status: 'draft' as AgentStatus, model: 'claude-3-5-sonnet', tools: 2, runs: 0,
    successRate: 0, cost: 0, created_at: '2024-03-16T20:00:00Z', updated_at: '2024-03-16T20:00:00Z',
  },
];

const statusConfig: Record<AgentStatus, { variant: 'success' | 'warning' | 'danger' | 'default' | 'info'; label: string }> = {
  deployed: { variant: 'success', label: 'Deployed' },
  testing: { variant: 'warning', label: 'Testing' },
  draft: { variant: 'default', label: 'Draft' },
  paused: { variant: 'danger', label: 'Paused' },
  archived: { variant: 'default', label: 'Archived' },
};

const filterTabs = [
  { id: 'all', label: 'All Agents' },
  { id: 'deployed', label: 'Deployed' },
  { id: 'testing', label: 'Testing' },
  { id: 'draft', label: 'Drafts' },
  { id: 'paused', label: 'Paused' },
];

export default function AgentsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  const filteredAgents = mockAgents.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(search.toLowerCase()) ||
      agent.description.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || agent.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      <TopBar
        title="Agents"
        subtitle={`${mockAgents.length} agents in your workspace`}
        action={{ label: 'New Agent', href: '/agent-builder' }}
      />

      <div className="p-6 space-y-4">
        <div className="flex items-center gap-4">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search agents..."
            className="flex-1 max-w-md"
          />
        </div>

        <Tabs tabs={filterTabs} activeTab={filter} onChange={setFilter} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAgents.map((agent) => (
            <Card key={agent.id} hover className="relative">
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={agent.name} size="lg" />
                    <div>
                      <h3 className="text-sm font-semibold text-surface-900">{agent.name}</h3>
                      <p className="text-xs text-surface-500 capitalize">{agent.role}</p>
                    </div>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => setMenuOpen(menuOpen === agent.id ? null : agent.id)}
                      className="p-1.5 text-surface-400 hover:text-surface-600 rounded-lg hover:bg-surface-100"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                    {menuOpen === agent.id && (
                      <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-surface-200 rounded-lg shadow-lg py-1 z-10 animate-fade-in">
                        <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-surface-700 hover:bg-surface-50">
                          <Settings className="w-4 h-4" /> Edit Agent
                        </button>
                        <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-surface-700 hover:bg-surface-50">
                          <Play className="w-4 h-4" /> Test in Sandbox
                        </button>
                        <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-surface-700 hover:bg-surface-50">
                          <Copy className="w-4 h-4" /> Duplicate
                        </button>
                        <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-surface-700 hover:bg-surface-50">
                          <BarChart3 className="w-4 h-4" /> View Stats
                        </button>
                        <div className="border-t border-surface-100 my-1" />
                        <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-danger-500 hover:bg-danger-50">
                          <Trash2 className="w-4 h-4" /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-xs text-surface-600 mb-4 line-clamp-2">{agent.description}</p>

                <div className="flex items-center gap-2 mb-4">
                  <Badge variant={statusConfig[agent.status].variant}>
                    {statusConfig[agent.status].label}
                  </Badge>
                  <Badge>{agent.model}</Badge>
                  <Badge>
                    <Wrench className="w-3 h-3 mr-1" />
                    {agent.tools} tools
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-surface-100">
                  <div className="text-center">
                    <p className="text-xs text-surface-500">Runs</p>
                    <p className="text-sm font-semibold text-surface-900">{agent.runs.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-surface-500">Success</p>
                    <p className="text-sm font-semibold text-surface-900">{agent.successRate}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-surface-500">Cost</p>
                    <p className="text-sm font-semibold text-surface-900">${agent.cost.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredAgents.length === 0 && (
          <EmptyState
            icon={<Bot className="w-8 h-8" />}
            title="No agents found"
            description="No agents match your search or filter. Try adjusting your criteria or create a new agent."
            action={{ label: 'Create Agent', onClick: () => {} }}
          />
        )}
      </div>
    </div>
  );
}
