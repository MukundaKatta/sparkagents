export interface MonitoringStats {
  total_runs: number;
  successful_runs: number;
  failed_runs: number;
  success_rate: number;
  avg_duration_ms: number;
  total_cost: number;
  total_tokens: number;
  active_agents: number;
  top_queries: QueryStat[];
  error_breakdown: ErrorStat[];
  hourly_distribution: HourlyStat[];
  agent_performance: AgentPerformance[];
}

export interface QueryStat {
  query: string;
  count: number;
  avg_cost: number;
}

export interface ErrorStat {
  error_type: string;
  count: number;
  percentage: number;
}

export interface HourlyStat {
  hour: number;
  runs: number;
  cost: number;
}

export interface AgentPerformance {
  agent_id: string;
  agent_name: string;
  total_runs: number;
  success_rate: number;
  avg_duration_ms: number;
  total_cost: number;
  trend: 'up' | 'down' | 'stable';
}

export interface AlertConfig {
  id: string;
  type: 'error_rate' | 'cost_threshold' | 'latency' | 'failure_streak';
  threshold: number;
  channel: 'email' | 'slack' | 'webhook';
  enabled: boolean;
}
