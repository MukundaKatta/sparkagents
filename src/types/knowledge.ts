export type KnowledgeSourceType = 'file' | 'url' | 'text' | 'notion' | 'confluence';
export type KnowledgeStatus = 'pending' | 'processing' | 'ready' | 'error';

export interface KnowledgeBase {
  id: string;
  name: string;
  description: string;
  owner_id: string;
  sources: KnowledgeSource[];
  document_count: number;
  total_chunks: number;
  total_tokens: number;
  status: KnowledgeStatus;
  created_at: string;
  updated_at: string;
}

export interface KnowledgeSource {
  id: string;
  knowledge_base_id: string;
  type: KnowledgeSourceType;
  name: string;
  url?: string;
  file_path?: string;
  file_size?: number;
  mime_type?: string;
  content?: string;
  chunk_count: number;
  status: KnowledgeStatus;
  error?: string;
  last_synced_at?: string;
  created_at: string;
}

export interface KnowledgeChunk {
  id: string;
  source_id: string;
  content: string;
  metadata: Record<string, unknown>;
  embedding?: number[];
  token_count: number;
  position: number;
}
