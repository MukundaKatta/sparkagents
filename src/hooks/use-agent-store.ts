'use client';

import { create } from 'zustand';
import type { Agent, AgentDraft, AgentRun, AgentRole, Guardrail, AgentTool } from '@/types/agent';

interface AgentState {
  agents: Agent[];
  currentAgent: Agent | null;
  agentRuns: AgentRun[];
  isLoading: boolean;
  error: string | null;

  // Draft for wizard
  draft: AgentDraft;
  wizardStep: number;

  // Actions
  setAgents: (agents: Agent[]) => void;
  setCurrentAgent: (agent: Agent | null) => void;
  setAgentRuns: (runs: AgentRun[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Wizard actions
  setWizardStep: (step: number) => void;
  updateDraft: (updates: Partial<AgentDraft>) => void;
  resetDraft: () => void;
  addToolToDraft: (tool: AgentTool) => void;
  removeToolFromDraft: (toolId: string) => void;
  addGuardrailToDraft: (guardrail: Guardrail) => void;
  removeGuardrailFromDraft: (guardrailId: string) => void;
  addKnowledgeBaseToDraft: (kbId: string) => void;
  removeKnowledgeBaseFromDraft: (kbId: string) => void;
}

const defaultDraft: AgentDraft = {
  name: '',
  description: '',
  role: 'assistant',
  system_prompt: '',
  model: 'gpt-4o',
  temperature: 0.7,
  max_tokens: 4096,
  tools: [],
  knowledge_bases: [],
  guardrails: [],
};

export const useAgentStore = create<AgentState>((set) => ({
  agents: [],
  currentAgent: null,
  agentRuns: [],
  isLoading: false,
  error: null,
  draft: { ...defaultDraft },
  wizardStep: 0,

  setAgents: (agents) => set({ agents }),
  setCurrentAgent: (agent) => set({ currentAgent: agent }),
  setAgentRuns: (runs) => set({ agentRuns: runs }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),

  setWizardStep: (step) => set({ wizardStep: step }),
  updateDraft: (updates) =>
    set((state) => ({ draft: { ...state.draft, ...updates } })),
  resetDraft: () => set({ draft: { ...defaultDraft }, wizardStep: 0 }),

  addToolToDraft: (tool) =>
    set((state) => ({
      draft: { ...state.draft, tools: [...state.draft.tools, tool] },
    })),
  removeToolFromDraft: (toolId) =>
    set((state) => ({
      draft: {
        ...state.draft,
        tools: state.draft.tools.filter((t) => t.tool_id !== toolId),
      },
    })),

  addGuardrailToDraft: (guardrail) =>
    set((state) => ({
      draft: {
        ...state.draft,
        guardrails: [...state.draft.guardrails, guardrail],
      },
    })),
  removeGuardrailFromDraft: (guardrailId) =>
    set((state) => ({
      draft: {
        ...state.draft,
        guardrails: state.draft.guardrails.filter((g) => g.id !== guardrailId),
      },
    })),

  addKnowledgeBaseToDraft: (kbId) =>
    set((state) => ({
      draft: {
        ...state.draft,
        knowledge_bases: [...state.draft.knowledge_bases, kbId],
      },
    })),
  removeKnowledgeBaseFromDraft: (kbId) =>
    set((state) => ({
      draft: {
        ...state.draft,
        knowledge_bases: state.draft.knowledge_bases.filter((id) => id !== kbId),
      },
    })),
}));
