'use client';

import { useAgentStore } from '@/hooks/use-agent-store';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { cn } from '@/utils/cn';
import type { AgentRole } from '@/types/agent';
import {
  Bot, Search, PenTool, BarChart3, HeadphonesIcon, Briefcase, Code, Sparkles,
} from 'lucide-react';

const roles: { value: AgentRole; label: string; description: string; icon: React.ReactNode }[] = [
  { value: 'assistant', label: 'Assistant', description: 'General-purpose helpful AI', icon: <Bot className="w-5 h-5" /> },
  { value: 'researcher', label: 'Researcher', description: 'Finds and analyzes information', icon: <Search className="w-5 h-5" /> },
  { value: 'writer', label: 'Writer', description: 'Creates and edits content', icon: <PenTool className="w-5 h-5" /> },
  { value: 'analyst', label: 'Analyst', description: 'Processes and interprets data', icon: <BarChart3 className="w-5 h-5" /> },
  { value: 'support', label: 'Support Agent', description: 'Handles customer inquiries', icon: <HeadphonesIcon className="w-5 h-5" /> },
  { value: 'sales', label: 'Sales Agent', description: 'Qualifies leads and follows up', icon: <Briefcase className="w-5 h-5" /> },
  { value: 'developer', label: 'Developer', description: 'Helps with code and technical tasks', icon: <Code className="w-5 h-5" /> },
  { value: 'custom', label: 'Custom', description: 'Define your own agent role', icon: <Sparkles className="w-5 h-5" /> },
];

const modelOptions = [
  { value: 'gpt-4o', label: 'GPT-4o (Recommended)' },
  { value: 'gpt-4o-mini', label: 'GPT-4o Mini (Faster, cheaper)' },
  { value: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
  { value: 'claude-3-5-sonnet', label: 'Claude 3.5 Sonnet' },
  { value: 'claude-3-opus', label: 'Claude 3 Opus' },
];

const promptTemplates: Record<AgentRole, string> = {
  assistant: 'You are a helpful AI assistant. Answer questions clearly and concisely. If you are unsure about something, say so rather than guessing.',
  researcher: 'You are an expert research assistant. When given a topic, search for relevant information, synthesize findings, and present well-organized summaries with sources.',
  writer: 'You are a skilled content writer. Create engaging, well-structured content tailored to the target audience. Follow brand voice guidelines and maintain consistency.',
  analyst: 'You are a data analyst. Analyze information systematically, identify patterns and trends, and present insights with clear explanations and actionable recommendations.',
  support: 'You are a friendly customer support agent. Help users resolve issues efficiently while maintaining a positive tone. Escalate complex issues when needed.',
  sales: 'You are a professional sales assistant. Qualify leads, answer product questions, and guide prospects through the decision process. Be helpful without being pushy.',
  developer: 'You are an expert software developer assistant. Help with code reviews, debugging, architecture decisions, and technical documentation.',
  custom: '',
};

export function StepNameRole() {
  const { draft, updateDraft } = useAgentStore();

  const handleRoleSelect = (role: AgentRole) => {
    updateDraft({
      role,
      system_prompt: draft.system_prompt || promptTemplates[role],
    });
  };

  return (
    <div className="space-y-8">
      {/* Name & Description */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2 flex items-center gap-4">
          <Avatar name={draft.name || 'New Agent'} size="xl" />
          <div className="flex-1">
            <Input
              label="Agent Name"
              placeholder="e.g., Customer Support Bot"
              value={draft.name}
              onChange={(e) => updateDraft({ name: e.target.value })}
              hint="Choose a descriptive name for your agent"
            />
          </div>
        </div>
        <div className="md:col-span-2">
          <Textarea
            label="Description"
            placeholder="What does this agent do? Who is it for?"
            value={draft.description}
            onChange={(e) => updateDraft({ description: e.target.value })}
            rows={2}
            hint="A brief description to help you and your team understand this agent's purpose"
          />
        </div>
      </div>

      {/* Role Selection */}
      <div>
        <h3 className="text-sm font-medium text-surface-700 mb-3">Agent Role</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {roles.map((role) => (
            <button
              key={role.value}
              onClick={() => handleRoleSelect(role.value)}
              className={cn(
                'flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 text-center',
                draft.role === role.value
                  ? 'border-spark-500 bg-spark-50 shadow-sm'
                  : 'border-surface-200 hover:border-surface-300 hover:bg-surface-50'
              )}
            >
              <div
                className={cn(
                  'w-10 h-10 rounded-lg flex items-center justify-center',
                  draft.role === role.value
                    ? 'bg-spark-100 text-spark-600'
                    : 'bg-surface-100 text-surface-500'
                )}
              >
                {role.icon}
              </div>
              <span className="text-sm font-medium text-surface-900">{role.label}</span>
              <span className="text-xs text-surface-500">{role.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* System Prompt */}
      <div>
        <Textarea
          label="System Prompt"
          placeholder="Define your agent's personality, instructions, and behavior..."
          value={draft.system_prompt}
          onChange={(e) => updateDraft({ system_prompt: e.target.value })}
          rows={6}
          hint="This is the core instruction that defines how your agent behaves. Be specific about what it should and shouldn't do."
        />
      </div>

      {/* Model & Parameters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="AI Model"
          options={modelOptions}
          value={draft.model}
          onChange={(e) => updateDraft({ model: e.target.value })}
          hint="Different models offer different speed/quality tradeoffs"
        />
        <div className="space-y-4">
          <Slider
            label="Temperature (Creativity)"
            value={draft.temperature}
            onChange={(value) => updateDraft({ temperature: value })}
            min={0}
            max={2}
            step={0.1}
          />
          <Slider
            label="Max Tokens (Response Length)"
            value={draft.max_tokens}
            onChange={(value) => updateDraft({ max_tokens: value })}
            min={256}
            max={16384}
            step={256}
          />
        </div>
      </div>
    </div>
  );
}
