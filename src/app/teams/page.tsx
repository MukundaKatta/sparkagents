'use client';

import { useState } from 'react';
import { TopBar } from '@/components/layout/top-bar';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { EmptyState } from '@/components/ui/empty-state';
import { cn } from '@/utils/cn';
import {
  Users, Play, Pause, Settings, ArrowRight, GitBranch, Layers,
  Plus, Clock, CheckCircle2, XCircle, Workflow,
} from 'lucide-react';

const mockTeams = [
  {
    id: '1',
    name: 'Customer Success Pipeline',
    description: 'Multi-agent team that handles customer inquiries: triage, research, respond, and follow up.',
    agents: [
      { name: 'Triage Agent', role: 'Classifies incoming requests' },
      { name: 'Research Agent', role: 'Looks up relevant information' },
      { name: 'Response Agent', role: 'Drafts customer responses' },
      { name: 'Follow-up Agent', role: 'Schedules follow-up actions' },
    ],
    executionMode: 'sequential' as const,
    status: 'active' as const,
    totalRuns: 2340,
    successRate: 92.5,
    avgDuration: '8.2s',
    lastRun: '5 min ago',
  },
  {
    id: '2',
    name: 'Content Creation Team',
    description: 'Parallel team that creates multi-channel content: blog posts, social media, and email campaigns.',
    agents: [
      { name: 'Blog Writer', role: 'Long-form content creation' },
      { name: 'Social Media Agent', role: 'Platform-specific posts' },
      { name: 'Email Campaign Agent', role: 'Email newsletter content' },
    ],
    executionMode: 'parallel' as const,
    status: 'active' as const,
    totalRuns: 890,
    successRate: 95.1,
    avgDuration: '12.5s',
    lastRun: '1 hour ago',
  },
  {
    id: '3',
    name: 'Sales Intelligence Team',
    description: 'Hierarchical team with a manager agent that coordinates lead research, scoring, and outreach.',
    agents: [
      { name: 'Lead Manager', role: 'Coordinates the team' },
      { name: 'Lead Researcher', role: 'Researches prospects' },
      { name: 'Lead Scorer', role: 'Evaluates lead quality' },
      { name: 'Outreach Agent', role: 'Personalizes messaging' },
    ],
    executionMode: 'hierarchical' as const,
    status: 'paused' as const,
    totalRuns: 1560,
    successRate: 88.3,
    avgDuration: '15.1s',
    lastRun: '2 days ago',
  },
];

const modeLabels = {
  sequential: { label: 'Sequential', variant: 'info' as const, icon: <ArrowRight className="w-3 h-3" /> },
  parallel: { label: 'Parallel', variant: 'purple' as const, icon: <Layers className="w-3 h-3" /> },
  hierarchical: { label: 'Hierarchical', variant: 'warning' as const, icon: <GitBranch className="w-3 h-3" /> },
};

export default function TeamsPage() {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div>
      <TopBar
        title="Teams"
        subtitle="Multiple agents working together on tasks"
        action={{ label: 'New Team', onClick: () => setShowCreate(true) }}
      />

      <div className="p-6 space-y-6">
        {/* Team Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {mockTeams.map((team) => (
            <Card key={team.id}>
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-base font-semibold text-surface-900">{team.name}</h3>
                    <p className="text-xs text-surface-500 mt-0.5">{team.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={team.status === 'active' ? 'success' : 'danger'}>
                      {team.status === 'active' ? 'Active' : 'Paused'}
                    </Badge>
                    <Badge variant={modeLabels[team.executionMode].variant}>
                      {modeLabels[team.executionMode].icon}
                      <span className="ml-1">{modeLabels[team.executionMode].label}</span>
                    </Badge>
                  </div>
                </div>

                {/* Agent Pipeline Visual */}
                <div className="flex items-center gap-1.5 py-4 overflow-x-auto">
                  {team.agents.map((agent, i) => (
                    <div key={i} className="flex items-center gap-1.5 flex-shrink-0">
                      <div className="flex items-center gap-2 bg-surface-50 rounded-lg px-3 py-2 border border-surface-200">
                        <Avatar name={agent.name} size="sm" />
                        <div>
                          <p className="text-xs font-medium text-surface-900 whitespace-nowrap">{agent.name}</p>
                          <p className="text-[10px] text-surface-500 whitespace-nowrap">{agent.role}</p>
                        </div>
                      </div>
                      {i < team.agents.length - 1 && (
                        <div className="text-surface-300">
                          {team.executionMode === 'parallel' ? (
                            <Layers className="w-4 h-4" />
                          ) : (
                            <ArrowRight className="w-4 h-4" />
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-3 pt-3 border-t border-surface-100">
                  <div>
                    <p className="text-xs text-surface-500">Total Runs</p>
                    <p className="text-sm font-semibold text-surface-900">{team.totalRuns.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-surface-500">Success Rate</p>
                    <p className="text-sm font-semibold text-surface-900">{team.successRate}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-surface-500">Avg Duration</p>
                    <p className="text-sm font-semibold text-surface-900">{team.avgDuration}</p>
                  </div>
                  <div>
                    <p className="text-xs text-surface-500">Last Run</p>
                    <p className="text-sm font-semibold text-surface-900">{team.lastRun}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-3 mt-3 border-t border-surface-100">
                  <Button variant="primary" size="sm">
                    <Play className="w-3.5 h-3.5" />
                    Run Team
                  </Button>
                  <Button variant="outline" size="sm">
                    <Workflow className="w-3.5 h-3.5" />
                    Edit Workflow
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Settings className="w-3.5 h-3.5" />
                    Settings
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Modal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        title="Create Agent Team"
        description="Set up a team of agents that work together."
        size="lg"
      >
        <div className="p-6 space-y-5">
          <Input label="Team Name" placeholder="e.g., Customer Success Pipeline" />
          <Textarea label="Description" placeholder="What does this team do?" rows={2} />
          <Select
            label="Execution Mode"
            options={[
              { value: 'sequential', label: 'Sequential - Agents run one after another' },
              { value: 'parallel', label: 'Parallel - Agents run simultaneously' },
              { value: 'hierarchical', label: 'Hierarchical - Manager agent coordinates others' },
            ]}
          />

          <div className="border border-surface-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-surface-700">Team Agents</h4>
              <Button variant="ghost" size="sm"><Plus className="w-4 h-4" /> Add Agent</Button>
            </div>
            <div className="text-sm text-surface-500 text-center py-8 bg-surface-50 rounded-lg">
              No agents added yet. Click "Add Agent" to select agents for this team.
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="secondary" onClick={() => setShowCreate(false)}>Cancel</Button>
            <Button>Create Team</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
