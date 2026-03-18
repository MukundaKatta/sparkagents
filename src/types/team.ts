export type TeamStatus = 'active' | 'paused' | 'archived';
export type TeamExecutionMode = 'sequential' | 'parallel' | 'hierarchical';

export interface Team {
  id: string;
  name: string;
  description: string;
  owner_id: string;
  agents: TeamAgent[];
  execution_mode: TeamExecutionMode;
  workflow: TeamWorkflow;
  status: TeamStatus;
  total_runs: number;
  success_rate: number;
  created_at: string;
  updated_at: string;
}

export interface TeamAgent {
  id: string;
  agent_id: string;
  agent_name: string;
  role_in_team: string;
  position: { x: number; y: number };
  dependencies: string[];
  input_mapping?: Record<string, string>;
  output_mapping?: Record<string, string>;
}

export interface TeamWorkflow {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  trigger?: WorkflowTrigger;
}

export interface WorkflowNode {
  id: string;
  type: 'agent' | 'condition' | 'transform' | 'input' | 'output';
  data: Record<string, unknown>;
  position: { x: number; y: number };
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  condition?: string;
}

export interface WorkflowTrigger {
  type: 'manual' | 'scheduled' | 'webhook' | 'event';
  config: Record<string, unknown>;
}

export interface TeamRun {
  id: string;
  team_id: string;
  input: string;
  output: string;
  agent_runs: string[];
  status: 'running' | 'completed' | 'failed';
  total_cost: number;
  duration_ms: number;
  created_at: string;
}
