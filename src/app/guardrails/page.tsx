'use client';

import { useState } from 'react';
import { TopBar } from '@/components/layout/top-bar';
import { Card, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/utils/cn';
import {
  Shield, Filter, Ban, FileCheck, Timer, DollarSign, Plus,
  Settings, Trash2, ChevronDown, ChevronUp, AlertTriangle, Code,
  Bot, Check,
} from 'lucide-react';

const guardrailSets = [
  {
    id: '1',
    name: 'Standard Safety',
    description: 'Default safety guardrails for all agents. Blocks harmful content and enforces rate limits.',
    rules: [
      { type: 'content_filter', name: 'Content Filter', enabled: true, icon: <Filter className="w-4 h-4" /> },
      { type: 'rate_limit', name: 'Rate Limit (60 req/min)', enabled: true, icon: <Timer className="w-4 h-4" /> },
      { type: 'cost_limit', name: 'Cost Limit ($1/run)', enabled: true, icon: <DollarSign className="w-4 h-4" /> },
    ],
    appliedTo: 8,
  },
  {
    id: '2',
    name: 'Customer Support Rules',
    description: 'Specialized rules for customer-facing agents. Includes topic restrictions and output formatting.',
    rules: [
      { type: 'content_filter', name: 'Content Filter', enabled: true, icon: <Filter className="w-4 h-4" /> },
      { type: 'topic_restriction', name: 'No competitor mentions', enabled: true, icon: <Ban className="w-4 h-4" /> },
      { type: 'topic_restriction', name: 'No pricing discussions', enabled: true, icon: <Ban className="w-4 h-4" /> },
      { type: 'output_format', name: 'Professional tone required', enabled: true, icon: <FileCheck className="w-4 h-4" /> },
      { type: 'cost_limit', name: 'Cost Limit ($0.50/run)', enabled: true, icon: <DollarSign className="w-4 h-4" /> },
    ],
    appliedTo: 3,
  },
  {
    id: '3',
    name: 'Research Agent Policy',
    description: 'Rules for research and analysis agents. Requires citations and limits response length.',
    rules: [
      { type: 'output_format', name: 'Require source citations', enabled: true, icon: <FileCheck className="w-4 h-4" /> },
      { type: 'output_format', name: 'Max 2000 words', enabled: true, icon: <FileCheck className="w-4 h-4" /> },
      { type: 'cost_limit', name: 'Cost Limit ($2/run)', enabled: true, icon: <DollarSign className="w-4 h-4" /> },
      { type: 'rate_limit', name: 'Rate Limit (30 req/min)', enabled: true, icon: <Timer className="w-4 h-4" /> },
    ],
    appliedTo: 2,
  },
];

export default function GuardrailsPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [expandedSet, setExpandedSet] = useState<string | null>('1');

  return (
    <div>
      <TopBar
        title="Guardrails"
        subtitle="Define safety rules and boundaries for your agents"
        action={{ label: 'New Rule Set', onClick: () => setShowCreate(true) }}
      />

      <div className="p-6 space-y-6">
        {/* Info */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-amber-600 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-semibold text-amber-900">About Guardrails</h3>
              <p className="text-sm text-amber-700 mt-1">
                Guardrails define what your agents can and cannot do. Create rule sets and apply them
                to multiple agents. Rules include content filters, topic restrictions, output formatting,
                rate limits, and cost limits.
              </p>
            </div>
          </div>
        </div>

        {/* Guardrail Sets */}
        <div className="space-y-4">
          {guardrailSets.map((set) => {
            const isExpanded = expandedSet === set.id;
            return (
              <Card key={set.id}>
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                        <Shield className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-surface-900">{set.name}</h3>
                        <p className="text-xs text-surface-500 mt-0.5">{set.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge size="sm">{set.rules.length} rules</Badge>
                          <Badge variant="info" size="sm">
                            <Bot className="w-3 h-3 mr-1" />
                            {set.appliedTo} agents
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => setExpandedSet(isExpanded ? null : set.id)}>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-surface-100 space-y-2">
                      {set.rules.map((rule, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-surface-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="text-surface-500">{rule.icon}</div>
                            <div>
                              <p className="text-sm font-medium text-surface-700">{rule.name}</p>
                              <p className="text-xs text-surface-500 capitalize">{rule.type.replace(/_/g, ' ')}</p>
                            </div>
                          </div>
                          <Toggle checked={rule.enabled} onChange={() => {}} />
                        </div>
                      ))}
                      <div className="flex gap-2 pt-2">
                        <Button variant="ghost" size="sm">
                          <Plus className="w-3.5 h-3.5" /> Add Rule
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Bot className="w-3.5 h-3.5" /> Apply to Agents
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      <Modal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        title="Create Guardrail Rule Set"
        description="Define a reusable set of rules for your agents."
        size="lg"
      >
        <div className="p-6 space-y-5">
          <Input label="Rule Set Name" placeholder="e.g., Customer Support Rules" />
          <Textarea label="Description" placeholder="Describe the purpose of this rule set" rows={2} />

          <div className="border border-surface-200 rounded-lg p-4 space-y-3">
            <h4 className="text-sm font-medium text-surface-700">Rules</h4>
            <p className="text-xs text-surface-500">Add rules to this set. You can configure each rule after creation.</p>

            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: <Filter className="w-4 h-4" />, label: 'Content Filter' },
                { icon: <Ban className="w-4 h-4" />, label: 'Topic Restriction' },
                { icon: <FileCheck className="w-4 h-4" />, label: 'Output Format' },
                { icon: <Timer className="w-4 h-4" />, label: 'Rate Limit' },
                { icon: <DollarSign className="w-4 h-4" />, label: 'Cost Limit' },
                { icon: <Code className="w-4 h-4" />, label: 'Custom Rule' },
              ].map((rule) => (
                <button
                  key={rule.label}
                  className="flex items-center gap-2 p-3 rounded-lg border border-surface-200 hover:border-spark-300 hover:bg-spark-50 transition-colors text-left"
                >
                  <div className="text-surface-500">{rule.icon}</div>
                  <span className="text-sm text-surface-700">{rule.label}</span>
                  <Plus className="w-3.5 h-3.5 text-surface-400 ml-auto" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="secondary" onClick={() => setShowCreate(false)}>Cancel</Button>
            <Button>Create Rule Set</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
