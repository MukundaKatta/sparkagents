'use client';

import { useState, useRef, useEffect } from 'react';
import { useAgentStore } from '@/hooks/use-agent-store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Toggle } from '@/components/ui/toggle';
import { cn } from '@/utils/cn';
import {
  Send, Loader2, Wrench, Brain, RotateCcw, Copy, ThumbsUp, ThumbsDown,
  ChevronDown, ChevronRight, Clock, DollarSign, Zap,
} from 'lucide-react';
import { v4 as uuid } from 'uuid';

interface TestMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  toolCalls?: { name: string; input: string; output: string; duration: string }[];
  reasoning?: string[];
  tokens?: number;
  cost?: number;
  duration?: string;
}

// Demo responses for testing
const demoResponses: Record<string, TestMessage> = {
  default: {
    id: '',
    role: 'assistant',
    content: 'Hello! I\'m your new AI agent. I\'m ready to help with tasks based on the role, tools, and knowledge you\'ve configured. Try asking me a question related to my capabilities!',
    tokens: 42,
    cost: 0.0003,
    duration: '0.8s',
  },
  search: {
    id: '',
    role: 'assistant',
    content: 'Based on my search results, here are the key findings:\n\n1. **AI agents** are autonomous systems that can perceive, reason, and act on their environment.\n2. Recent advances in LLMs have made building capable agents much more accessible.\n3. Popular frameworks include LangChain, CrewAI, and AutoGen.\n\nWould you like me to dive deeper into any of these topics?',
    toolCalls: [
      {
        name: 'Google Search',
        input: '{"query": "latest AI agent frameworks 2024"}',
        output: '{"results": [{"title": "Top AI Agent Frameworks", "url": "..."}]}',
        duration: '340ms',
      },
    ],
    reasoning: [
      'The user wants information about AI agents. Let me search for the latest information.',
      'Found relevant results. Let me synthesize the key points.',
      'Presenting a structured summary with the most important findings.',
    ],
    tokens: 186,
    cost: 0.0014,
    duration: '2.1s',
  },
};

export function StepTest() {
  const { draft } = useAgentStore();
  const [messages, setMessages] = useState<TestMessage[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [showReasoning, setShowReasoning] = useState(true);
  const [showToolCalls, setShowToolCalls] = useState(true);
  const [expandedReasoning, setExpandedReasoning] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isStreaming) return;

    const userMessage: TestMessage = {
      id: uuid(),
      role: 'user',
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsStreaming(true);

    // Simulate agent response
    await new Promise((r) => setTimeout(r, 1500));

    const hasSearchTool = draft.tools.some((t) => t.tool_id === 'google-search');
    const template = hasSearchTool ? demoResponses.search : demoResponses.default;

    const response: TestMessage = {
      ...template,
      id: uuid(),
    };

    setMessages((prev) => [...prev, response]);
    setIsStreaming(false);
  };

  const clearChat = () => {
    setMessages([]);
  };

  const totalTokens = messages.reduce((sum, m) => sum + (m.tokens || 0), 0);
  const totalCost = messages.reduce((sum, m) => sum + (m.cost || 0), 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-surface-900">
            Test Your Agent
          </h3>
          <p className="text-sm text-surface-500">
            Chat with your agent to see how it responds. Check tool calls and reasoning.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Toggle
            label="Reasoning"
            checked={showReasoning}
            onChange={setShowReasoning}
          />
          <Toggle
            label="Tool Calls"
            checked={showToolCalls}
            onChange={setShowToolCalls}
          />
        </div>
      </div>

      {/* Agent info bar */}
      <div className="flex items-center gap-3 p-3 bg-spark-50 rounded-lg border border-spark-100">
        <Avatar name={draft.name || 'New Agent'} size="sm" />
        <div className="flex-1">
          <span className="text-sm font-medium text-spark-700">{draft.name || 'Unnamed Agent'}</span>
          <span className="text-xs text-spark-500 ml-2">{draft.model} | temp: {draft.temperature}</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-spark-600">
          <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5" />{totalTokens} tokens</span>
          <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" />${totalCost.toFixed(4)}</span>
        </div>
        <Button variant="ghost" size="sm" onClick={clearChat}>
          <RotateCcw className="w-3.5 h-3.5" />
          Clear
        </Button>
      </div>

      {/* Chat messages */}
      <div className="bg-white border border-surface-200 rounded-xl overflow-hidden">
        <div className="h-[400px] overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 rounded-2xl bg-surface-100 flex items-center justify-center mb-3">
                <Avatar name={draft.name || 'New Agent'} size="lg" />
              </div>
              <p className="text-sm font-medium text-surface-900 mb-1">Start a conversation</p>
              <p className="text-xs text-surface-500 max-w-sm">
                Type a message to test how {draft.name || 'your agent'} responds.
                Try asking something related to its role and tools.
              </p>
              <div className="flex gap-2 mt-4">
                {['Hello, what can you do?', 'Help me with a task', 'What tools do you have?'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setInput(suggestion)}
                    className="text-xs px-3 py-1.5 bg-surface-100 text-surface-600 rounded-full hover:bg-surface-200 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div key={message.id} className={cn('flex gap-3', message.role === 'user' && 'justify-end')}>
              {message.role === 'assistant' && (
                <Avatar name={draft.name || 'Agent'} size="sm" />
              )}
              <div className={cn('max-w-[75%] space-y-2', message.role === 'user' && 'order-first')}>
                <div
                  className={cn(
                    'rounded-2xl px-4 py-3 text-sm',
                    message.role === 'user'
                      ? 'bg-spark-600 text-white rounded-br-md'
                      : 'bg-surface-100 text-surface-900 rounded-bl-md'
                  )}
                >
                  <div className="prose-chat whitespace-pre-wrap">{message.content}</div>
                </div>

                {/* Reasoning */}
                {showReasoning && message.reasoning && message.reasoning.length > 0 && (
                  <div className="ml-1">
                    <button
                      onClick={() => setExpandedReasoning(expandedReasoning === message.id ? null : message.id)}
                      className="flex items-center gap-1.5 text-xs text-surface-500 hover:text-surface-700"
                    >
                      <Brain className="w-3.5 h-3.5" />
                      <span>Reasoning ({message.reasoning.length} steps)</span>
                      {expandedReasoning === message.id ? (
                        <ChevronDown className="w-3 h-3" />
                      ) : (
                        <ChevronRight className="w-3 h-3" />
                      )}
                    </button>
                    {expandedReasoning === message.id && (
                      <div className="mt-2 space-y-1.5 pl-5 border-l-2 border-surface-200">
                        {message.reasoning.map((step, i) => (
                          <p key={i} className="text-xs text-surface-600">{step}</p>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Tool calls */}
                {showToolCalls && message.toolCalls && message.toolCalls.length > 0 && (
                  <div className="space-y-1.5 ml-1">
                    {message.toolCalls.map((call, i) => (
                      <div key={i} className="bg-amber-50 border border-amber-100 rounded-lg p-2.5">
                        <div className="flex items-center gap-2 mb-1.5">
                          <Wrench className="w-3.5 h-3.5 text-amber-600" />
                          <span className="text-xs font-medium text-amber-800">{call.name}</span>
                          <Badge variant="warning" size="sm">{call.duration}</Badge>
                        </div>
                        <pre className="text-xs text-amber-700 bg-amber-100/50 rounded p-1.5 overflow-x-auto font-mono">
                          {call.input}
                        </pre>
                      </div>
                    ))}
                  </div>
                )}

                {/* Meta */}
                {message.role === 'assistant' && message.duration && (
                  <div className="flex items-center gap-3 ml-1">
                    <span className="text-xs text-surface-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />{message.duration}
                    </span>
                    <span className="text-xs text-surface-400">{message.tokens} tokens</span>
                    <span className="text-xs text-surface-400">${message.cost?.toFixed(4)}</span>
                    <div className="flex gap-1 ml-2">
                      <button className="p-1 text-surface-300 hover:text-success-500"><ThumbsUp className="w-3 h-3" /></button>
                      <button className="p-1 text-surface-300 hover:text-danger-500"><ThumbsDown className="w-3 h-3" /></button>
                      <button className="p-1 text-surface-300 hover:text-surface-600"><Copy className="w-3 h-3" /></button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isStreaming && (
            <div className="flex gap-3">
              <Avatar name={draft.name || 'Agent'} size="sm" />
              <div className="bg-surface-100 rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-surface-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-surface-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-surface-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-surface-200 p-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type a message to test your agent..."
              className="flex-1 px-4 py-2.5 text-sm bg-surface-50 border border-surface-200 rounded-lg
                placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-spark-500 focus:border-transparent"
            />
            <Button onClick={sendMessage} disabled={!input.trim() || isStreaming}>
              {isStreaming ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
