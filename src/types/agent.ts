export type AgentStatus = 'draft' | 'testing' | 'deployed' | 'paused' | 'archived';
export type AgentRole = 'assistant' | 'researcher' | 'writer' | 'analyst' | 'support' | 'sales' | 'developer' | 'custom';
export type DeployTarget = 'api' | 'widget' | 'scheduled' | 'slack';

export interface Agent {
  id: string;
  name: string;
  description: string;
  role: AgentRole;
  avatar_url?: string;
  system_prompt: string;
  model: string;
  temperature: number;
  max_tokens: number;
  tools: AgentTool[];
  knowledge_bases: string[];
  guardrails: Guardrail[];
  deploy_config: DeployConfig;
  status: AgentStatus;
  owner_id: string;
  team_id?: string;
  is_public: boolean;
  clone_count: number;
  rating: number;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface AgentTool {
  id: string;
  tool_id: string;
  config: Record<string, unknown>;
  enabled: boolean;
}

export interface Guardrail {
  id: string;
  type: 'content_filter' | 'topic_restriction' | 'output_format' | 'rate_limit' | 'cost_limit' | 'custom';
  name: string;
  description: string;
  config: Record<string, unknown>;
  enabled: boolean;
}

export interface DeployConfig {
  targets: DeployTarget[];
  api?: {
    endpoint: string;
    api_key: string;
    rate_limit: number;
    cors_origins: string[];
  };
  widget?: {
    theme: 'light' | 'dark' | 'auto';
    position: 'bottom-right' | 'bottom-left';
    welcome_message: string;
    placeholder: string;
    brand_color: string;
    allowed_domains: string[];
  };
  scheduled?: {
    cron: string;
    timezone: string;
    input_template: string;
    output_webhook?: string;
  };
  slack?: {
    channel_ids: string[];
    trigger_words: string[];
    dm_enabled: boolean;
  };
}

export interface AgentRun {
  id: string;
  agent_id: string;
  input: string;
  output: string;
  tool_calls: ToolCall[];
  reasoning_steps: ReasoningStep[];
  tokens_used: number;
  cost: number;
  duration_ms: number;
  status: 'running' | 'completed' | 'failed' | 'cancelled';
  error?: string;
  source: DeployTarget | 'sandbox';
  created_at: string;
}

export interface ToolCall {
  id: string;
  tool_name: string;
  input: Record<string, unknown>;
  output: unknown;
  duration_ms: number;
  status: 'success' | 'error';
  error?: string;
  timestamp: string;
}

export interface ReasoningStep {
  id: string;
  type: 'thinking' | 'tool_call' | 'observation' | 'response';
  content: string;
  timestamp: string;
}

export interface WizardStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  completed: boolean;
  current: boolean;
}

export interface AgentDraft {
  name: string;
  description: string;
  role: AgentRole;
  system_prompt: string;
  model: string;
  temperature: number;
  max_tokens: number;
  tools: AgentTool[];
  knowledge_bases: string[];
  guardrails: Guardrail[];
}
