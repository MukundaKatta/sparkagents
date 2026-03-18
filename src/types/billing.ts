export type PlanTier = 'free' | 'starter' | 'pro' | 'enterprise';

export interface BillingPlan {
  id: PlanTier;
  name: string;
  description: string;
  price_monthly: number;
  price_yearly: number;
  included_runs: number;
  included_agents: number;
  included_teams: number;
  included_knowledge_mb: number;
  cost_per_extra_run: number;
  features: string[];
}

export interface BillingUsage {
  period_start: string;
  period_end: string;
  total_runs: number;
  total_tokens: number;
  total_cost: number;
  agents_count: number;
  teams_count: number;
  knowledge_size_mb: number;
  daily_usage: DailyUsage[];
  cost_by_agent: AgentCost[];
  cost_by_tool: ToolCost[];
}

export interface DailyUsage {
  date: string;
  runs: number;
  tokens: number;
  cost: number;
}

export interface AgentCost {
  agent_id: string;
  agent_name: string;
  runs: number;
  tokens: number;
  cost: number;
}

export interface ToolCost {
  tool_id: string;
  tool_name: string;
  calls: number;
  cost: number;
}

export interface CostProjection {
  current_month_projected: number;
  next_month_estimated: number;
  trend: 'increasing' | 'stable' | 'decreasing';
  trend_percentage: number;
  recommendations: string[];
}

export const PLANS: BillingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Get started with AI agents',
    price_monthly: 0,
    price_yearly: 0,
    included_runs: 100,
    included_agents: 3,
    included_teams: 0,
    included_knowledge_mb: 50,
    cost_per_extra_run: 0,
    features: [
      '3 agents',
      '100 runs/month',
      '50 MB knowledge storage',
      'Community tools',
      'API deploy',
      'Email support',
    ],
  },
  {
    id: 'starter',
    name: 'Starter',
    description: 'For individuals and small projects',
    price_monthly: 29,
    price_yearly: 290,
    included_runs: 1000,
    included_agents: 10,
    included_teams: 2,
    included_knowledge_mb: 500,
    cost_per_extra_run: 0.02,
    features: [
      '10 agents',
      '1,000 runs/month',
      '500 MB knowledge storage',
      '2 teams',
      'All deploy targets',
      'Chat widget customization',
      'Priority support',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'For teams and growing businesses',
    price_monthly: 99,
    price_yearly: 990,
    included_runs: 10000,
    included_agents: 50,
    included_teams: 10,
    included_knowledge_mb: 5000,
    cost_per_extra_run: 0.01,
    features: [
      '50 agents',
      '10,000 runs/month',
      '5 GB knowledge storage',
      '10 teams',
      'Custom tools',
      'Advanced guardrails',
      'Agent marketplace publishing',
      'Analytics dashboard',
      'Dedicated support',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large organizations',
    price_monthly: 499,
    price_yearly: 4990,
    included_runs: 100000,
    included_agents: -1,
    included_teams: -1,
    included_knowledge_mb: 50000,
    cost_per_extra_run: 0.005,
    features: [
      'Unlimited agents',
      '100,000 runs/month',
      '50 GB knowledge storage',
      'Unlimited teams',
      'Custom model integration',
      'SSO & SAML',
      'Audit logs',
      'SLA guarantee',
      'Dedicated account manager',
      'On-premise deployment option',
    ],
  },
];
