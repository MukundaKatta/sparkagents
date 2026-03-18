'use client';

import { create } from 'zustand';
import type { ToolCall, ReasoningStep } from '@/types/agent';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  tool_calls?: ToolCall[];
  reasoning_steps?: ReasoningStep[];
  timestamp: string;
  tokens?: number;
  cost?: number;
  duration_ms?: number;
}

interface SandboxState {
  messages: ChatMessage[];
  isStreaming: boolean;
  showReasoning: boolean;
  showToolCalls: boolean;
  totalTokens: number;
  totalCost: number;

  addMessage: (message: ChatMessage) => void;
  updateLastMessage: (updates: Partial<ChatMessage>) => void;
  clearMessages: () => void;
  setStreaming: (streaming: boolean) => void;
  toggleReasoning: () => void;
  toggleToolCalls: () => void;
}

export const useSandboxStore = create<SandboxState>((set) => ({
  messages: [],
  isStreaming: false,
  showReasoning: true,
  showToolCalls: true,
  totalTokens: 0,
  totalCost: 0,

  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
      totalTokens: state.totalTokens + (message.tokens || 0),
      totalCost: state.totalCost + (message.cost || 0),
    })),

  updateLastMessage: (updates) =>
    set((state) => {
      const messages = [...state.messages];
      if (messages.length > 0) {
        messages[messages.length - 1] = { ...messages[messages.length - 1], ...updates };
      }
      return { messages };
    }),

  clearMessages: () =>
    set({ messages: [], totalTokens: 0, totalCost: 0 }),

  setStreaming: (streaming) => set({ isStreaming: streaming }),
  toggleReasoning: () => set((state) => ({ showReasoning: !state.showReasoning })),
  toggleToolCalls: () => set((state) => ({ showToolCalls: !state.showToolCalls })),
}));

export type { ChatMessage };
