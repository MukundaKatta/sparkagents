'use client';

import { useState, useRef, useEffect } from 'react';
import { TopBar } from '@/components/layout/top-bar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select } from '@/components/ui/select';
import { Toggle } from '@/components/ui/toggle';
import { Avatar } from '@/components/ui/avatar';
import { cn } from '@/utils/cn';
import {
  Send, Loader2, Wrench, Brain, RotateCcw, Copy, ThumbsUp, ThumbsDown,
  ChevronDown, ChevronRight, Clock, DollarSign, Zap, Settings2, Maximize2,
  Bot, Search, PanelRightClose, PanelRightOpen,
} from 'lucide-react';
import { v4 as uuid } from 'uuid';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  toolCalls?: { name: string; input: string; output: string; duration: string }[];
  reasoning?: string[];
  tokens?: number;
  cost?: number;
  duration?: string;
  timestamp: string;
}

const mockAgents = [
  { value: 'agent-1', label: 'Customer Support Bot' },
  { value: 'agent-2', label: 'Research Assistant' },
  { value: 'agent-3', label: 'Email Summarizer' },
  { value: 'agent-4', label: 'Lead Qualifier' },
];

export default function SandboxPage() {
  const [selectedAgent, setSelectedAgent] = useState('agent-1');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [showPanel, setShowPanel] = useState(true);
  const [showReasoning, setShowReasoning] = useState(true);
  const [showToolCalls, setShowToolCalls] = useState(true);
  const [expandedReasoning, setExpandedReasoning] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => { scrollToBottom(); }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isStreaming) return;

    const userMsg: ChatMessage = {
      id: uuid(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsStreaming(true);

    await new Promise((r) => setTimeout(r, 2000));

    const assistantMsg: ChatMessage = {
      id: uuid(),
      role: 'assistant',
      content: `Based on my analysis, here are the key points:\n\n1. **Result A** - First finding with detailed explanation and context.\n2. **Result B** - Second finding that builds on the first.\n3. **Recommendation** - Based on the above, I recommend taking the following action.\n\nWould you like me to elaborate on any of these points?`,
      toolCalls: [
        { name: 'Google Search', input: `{"query": "${input.trim().slice(0, 30)}..."}`, output: '{"results": [...3 results]}', duration: '420ms' },
        { name: 'Text Summarizer', input: '{"text": "...extracted content..."}', output: '{"summary": "..."}', duration: '180ms' },
      ],
      reasoning: [
        'Analyzing the user request to determine the best approach.',
        'Searching for relevant information using Google Search.',
        'Found 3 relevant results. Extracting and summarizing key information.',
        'Synthesizing findings into a structured response.',
      ],
      tokens: 248,
      cost: 0.0019,
      duration: '2.4s',
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, assistantMsg]);
    setIsStreaming(false);
  };

  const totalTokens = messages.reduce((sum, m) => sum + (m.tokens || 0), 0);
  const totalCost = messages.reduce((sum, m) => sum + (m.cost || 0), 0);

  return (
    <div>
      <TopBar title="Agent Sandbox" subtitle="Test and debug your agents in real-time" />

      <div className="flex h-[calc(100vh-64px)]">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Agent selector bar */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-surface-200 bg-white">
            <Select
              options={mockAgents}
              value={selectedAgent}
              onChange={(e) => setSelectedAgent(e.target.value)}
              className="w-64"
            />
            <div className="flex-1" />
            <div className="flex items-center gap-3 text-xs text-surface-500">
              <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5" />{totalTokens} tokens</span>
              <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" />${totalCost.toFixed(4)}</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{messages.length} messages</span>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" onClick={() => setMessages([])}>
                <RotateCcw className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setShowPanel(!showPanel)}>
                {showPanel ? <PanelRightClose className="w-4 h-4" /> : <PanelRightOpen className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-spark-100 to-violet-100 flex items-center justify-center mb-4">
                  <Bot className="w-10 h-10 text-spark-600" />
                </div>
                <h3 className="text-lg font-semibold text-surface-900 mb-2">Agent Sandbox</h3>
                <p className="text-sm text-surface-500 max-w-md mb-6">
                  Select an agent and start a conversation. You can see tool calls, reasoning steps,
                  and performance metrics in real-time.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {['What can you help me with?', 'Search for AI news', 'Analyze this data', 'Draft an email'].map((s) => (
                    <button
                      key={s}
                      onClick={() => setInput(s)}
                      className="text-sm px-4 py-2 bg-surface-100 text-surface-600 rounded-full hover:bg-spark-50 hover:text-spark-600 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg) => (
              <div key={msg.id} className={cn('flex gap-3', msg.role === 'user' && 'justify-end')}>
                {msg.role === 'assistant' && <Avatar name="Agent" size="sm" />}
                <div className={cn('max-w-[70%] space-y-2')}>
                  <div
                    className={cn(
                      'rounded-2xl px-4 py-3 text-sm',
                      msg.role === 'user'
                        ? 'bg-spark-600 text-white rounded-br-md'
                        : 'bg-white border border-surface-200 text-surface-900 rounded-bl-md shadow-sm'
                    )}
                  >
                    <div className="prose-chat whitespace-pre-wrap">{msg.content}</div>
                  </div>

                  {showToolCalls && msg.toolCalls && msg.toolCalls.length > 0 && (
                    <div className="space-y-2">
                      {msg.toolCalls.map((call, i) => (
                        <div key={i} className="bg-amber-50 border border-amber-100 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Wrench className="w-3.5 h-3.5 text-amber-600" />
                            <span className="text-xs font-semibold text-amber-800">{call.name}</span>
                            <Badge variant="warning" size="sm">{call.duration}</Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <p className="text-[10px] text-amber-600 font-medium mb-1">INPUT</p>
                              <pre className="text-xs text-amber-700 bg-amber-100/50 rounded p-2 font-mono overflow-x-auto">{call.input}</pre>
                            </div>
                            <div>
                              <p className="text-[10px] text-amber-600 font-medium mb-1">OUTPUT</p>
                              <pre className="text-xs text-amber-700 bg-amber-100/50 rounded p-2 font-mono overflow-x-auto">{call.output}</pre>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {showReasoning && msg.reasoning && (
                    <button
                      onClick={() => setExpandedReasoning(expandedReasoning === msg.id ? null : msg.id)}
                      className="flex items-center gap-1.5 text-xs text-surface-500 hover:text-surface-700"
                    >
                      <Brain className="w-3.5 h-3.5" />
                      Reasoning ({msg.reasoning.length} steps)
                      {expandedReasoning === msg.id ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                    </button>
                  )}
                  {expandedReasoning === msg.id && msg.reasoning && (
                    <div className="space-y-1.5 pl-5 border-l-2 border-surface-200">
                      {msg.reasoning.map((step, i) => (
                        <p key={i} className="text-xs text-surface-600">
                          <span className="font-medium text-surface-400 mr-2">{i + 1}.</span>{step}
                        </p>
                      ))}
                    </div>
                  )}

                  {msg.role === 'assistant' && msg.duration && (
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-surface-400">{msg.duration}</span>
                      <span className="text-xs text-surface-400">{msg.tokens} tokens</span>
                      <span className="text-xs text-surface-400">${msg.cost?.toFixed(4)}</span>
                      <div className="flex gap-1 ml-1">
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
                <Avatar name="Agent" size="sm" />
                <div className="bg-white border border-surface-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-spark-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-spark-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-spark-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-surface-200 bg-white p-4">
            <div className="flex gap-3 max-w-3xl mx-auto">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type a message..."
                className="flex-1 px-4 py-3 text-sm bg-surface-50 border border-surface-200 rounded-xl
                  placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-spark-500"
              />
              <Button size="lg" onClick={sendMessage} disabled={!input.trim() || isStreaming}>
                {isStreaming ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Side Panel */}
        {showPanel && (
          <div className="w-80 border-l border-surface-200 bg-white overflow-y-auto">
            <div className="p-4 space-y-4">
              <h3 className="text-sm font-semibold text-surface-900">Debug Panel</h3>

              <div className="space-y-2">
                <Toggle label="Show Reasoning" checked={showReasoning} onChange={setShowReasoning} />
                <Toggle label="Show Tool Calls" checked={showToolCalls} onChange={setShowToolCalls} />
              </div>

              <div className="border-t border-surface-100 pt-4">
                <h4 className="text-xs font-medium text-surface-500 mb-3">Session Stats</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-surface-500">Messages</span>
                    <span className="font-medium text-surface-900">{messages.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-surface-500">Total Tokens</span>
                    <span className="font-medium text-surface-900">{totalTokens}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-surface-500">Total Cost</span>
                    <span className="font-medium text-surface-900">${totalCost.toFixed(4)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-surface-500">Tool Calls</span>
                    <span className="font-medium text-surface-900">
                      {messages.reduce((sum, m) => sum + (m.toolCalls?.length || 0), 0)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-surface-100 pt-4">
                <h4 className="text-xs font-medium text-surface-500 mb-3">Agent Config</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-surface-500">Model</span>
                    <Badge size="sm">gpt-4o</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-surface-500">Temperature</span>
                    <span className="font-mono text-surface-700">0.7</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-surface-500">Max Tokens</span>
                    <span className="font-mono text-surface-700">4096</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-surface-500">Tools</span>
                    <span className="text-surface-700">3 active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
