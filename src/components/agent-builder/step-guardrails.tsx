'use client';

import { useState } from 'react';
import { useAgentStore } from '@/hooks/use-agent-store';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/utils/cn';
import { Shield, Filter, Ban, FileCheck, Timer, DollarSign, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { v4 as uuid } from 'uuid';
import type { Guardrail } from '@/types/agent';

const guardrailTemplates: { type: Guardrail['type']; name: string; description: string; icon: React.ReactNode; defaultConfig: Record<string, unknown> }[] = [
  {
    type: 'content_filter',
    name: 'Content Filter',
    description: 'Block harmful, offensive, or inappropriate content from agent responses.',
    icon: <Filter className="w-5 h-5" />,
    defaultConfig: {
      block_categories: ['hate_speech', 'violence', 'adult_content', 'self_harm'],
      sensitivity: 'medium',
    },
  },
  {
    type: 'topic_restriction',
    name: 'Topic Restriction',
    description: 'Prevent the agent from discussing specific topics or providing certain types of advice.',
    icon: <Ban className="w-5 h-5" />,
    defaultConfig: {
      blocked_topics: [],
      allowed_topics: [],
      mode: 'blocklist',
    },
  },
  {
    type: 'output_format',
    name: 'Output Format',
    description: 'Enforce a specific output format or structure for agent responses.',
    icon: <FileCheck className="w-5 h-5" />,
    defaultConfig: {
      format: 'text',
      max_length: 2000,
      require_sources: false,
    },
  },
  {
    type: 'rate_limit',
    name: 'Rate Limit',
    description: 'Limit how many requests can be made to this agent in a given time period.',
    icon: <Timer className="w-5 h-5" />,
    defaultConfig: {
      max_requests_per_minute: 10,
      max_requests_per_hour: 100,
      max_requests_per_day: 1000,
    },
  },
  {
    type: 'cost_limit',
    name: 'Cost Limit',
    description: 'Set a maximum spend per run and per day to prevent unexpected charges.',
    icon: <DollarSign className="w-5 h-5" />,
    defaultConfig: {
      max_cost_per_run: 0.50,
      max_cost_per_day: 50,
      max_tokens_per_run: 8000,
    },
  },
];

export function StepGuardrails() {
  const { draft, addGuardrailToDraft, removeGuardrailFromDraft } = useAgentStore();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [blockedTopics, setBlockedTopics] = useState('');

  const addGuardrail = (template: (typeof guardrailTemplates)[0]) => {
    const guardrail: Guardrail = {
      id: uuid(),
      type: template.type,
      name: template.name,
      description: template.description,
      config: { ...template.defaultConfig },
      enabled: true,
    };
    addGuardrailToDraft(guardrail);
    setExpandedId(guardrail.id);
  };

  const activeTypes = draft.guardrails.map((g) => g.type);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-semibold text-surface-900 mb-1">
          Guardrails
        </h3>
        <p className="text-sm text-surface-500">
          Define safety boundaries and limits for your agent. Guardrails help ensure your agent
          stays on topic, within budget, and produces appropriate content.
        </p>
      </div>

      {/* Active guardrails */}
      {draft.guardrails.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-surface-700">Active Guardrails</h4>
          {draft.guardrails.map((guardrail) => {
            const isExpanded = expandedId === guardrail.id;
            const template = guardrailTemplates.find((t) => t.type === guardrail.type);
            return (
              <div key={guardrail.id} className="border border-surface-200 rounded-xl overflow-hidden">
                <div className="flex items-center gap-3 p-4">
                  <div className="w-10 h-10 rounded-lg bg-spark-50 text-spark-600 flex items-center justify-center flex-shrink-0">
                    {template?.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-surface-900">{guardrail.name}</p>
                    <p className="text-xs text-surface-500">{guardrail.description}</p>
                  </div>
                  <Badge variant="success" size="sm">Active</Badge>
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : guardrail.id)}
                    className="text-surface-400 hover:text-surface-600"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => removeGuardrailFromDraft(guardrail.id)}
                    className="text-surface-400 hover:text-danger-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {isExpanded && (
                  <div className="border-t border-surface-100 p-4 bg-surface-50 space-y-3">
                    {guardrail.type === 'content_filter' && (
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-surface-600">Blocked Categories:</p>
                        <div className="flex flex-wrap gap-2">
                          {['hate_speech', 'violence', 'adult_content', 'self_harm', 'medical_advice', 'financial_advice', 'legal_advice'].map((cat) => (
                            <button
                              key={cat}
                              className={cn(
                                'text-xs px-2.5 py-1 rounded-full border transition-colors',
                                (guardrail.config.block_categories as string[])?.includes(cat)
                                  ? 'bg-danger-50 border-danger-200 text-danger-700'
                                  : 'bg-white border-surface-200 text-surface-600 hover:border-surface-300'
                              )}
                            >
                              {cat.replace(/_/g, ' ')}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    {guardrail.type === 'topic_restriction' && (
                      <div className="space-y-2">
                        <Input
                          label="Blocked Topics (comma-separated)"
                          placeholder="e.g., competitors, pricing, internal processes"
                          value={blockedTopics}
                          onChange={(e) => setBlockedTopics(e.target.value)}
                        />
                      </div>
                    )}
                    {guardrail.type === 'rate_limit' && (
                      <div className="grid grid-cols-3 gap-3">
                        <Input label="Per Minute" type="number" defaultValue="10" />
                        <Input label="Per Hour" type="number" defaultValue="100" />
                        <Input label="Per Day" type="number" defaultValue="1000" />
                      </div>
                    )}
                    {guardrail.type === 'cost_limit' && (
                      <div className="grid grid-cols-3 gap-3">
                        <Input label="Max $/Run" type="number" step="0.01" defaultValue="0.50" />
                        <Input label="Max $/Day" type="number" step="1" defaultValue="50" />
                        <Input label="Max Tokens/Run" type="number" step="100" defaultValue="8000" />
                      </div>
                    )}
                    {guardrail.type === 'output_format' && (
                      <div className="space-y-3">
                        <Input label="Max Response Length (chars)" type="number" defaultValue="2000" />
                        <Toggle label="Require source citations" checked={false} onChange={() => {}} />
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Available guardrails */}
      <div>
        <h4 className="text-sm font-medium text-surface-700 mb-3">Available Guardrails</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {guardrailTemplates
            .filter((t) => !activeTypes.includes(t.type))
            .map((template) => (
              <button
                key={template.type}
                onClick={() => addGuardrail(template)}
                className="flex items-start gap-3 p-4 rounded-xl border-2 border-dashed border-surface-200 text-left hover:border-spark-400 hover:bg-spark-50/30 transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-lg bg-surface-100 text-surface-500 flex items-center justify-center flex-shrink-0">
                  {template.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-surface-900">{template.name}</span>
                    <Plus className="w-3.5 h-3.5 text-surface-400" />
                  </div>
                  <p className="text-xs text-surface-500 mt-0.5">{template.description}</p>
                </div>
              </button>
            ))}
        </div>
      </div>

      {guardrailTemplates.every((t) => activeTypes.includes(t.type)) && (
        <p className="text-sm text-success-700 bg-success-50 rounded-lg p-3 text-center">
          All available guardrails have been added.
        </p>
      )}
    </div>
  );
}
