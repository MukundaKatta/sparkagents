'use client';

import { useState, useCallback } from 'react';
import { TopBar } from '@/components/layout/top-bar';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SearchBar } from '@/components/ui/search-bar';
import { ProgressBar } from '@/components/ui/progress-bar';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import { EmptyState } from '@/components/ui/empty-state';
import {
  BookOpen, FileText, Globe, Upload, Trash2, RefreshCw,
  Plus, MoreVertical, Clock, Database, File, Link2, Check,
} from 'lucide-react';
import { formatBytes, formatRelativeTime } from '@/utils/format';
import type { KnowledgeBase, KnowledgeStatus } from '@/types/knowledge';

const mockKBs: (KnowledgeBase & { sources_summary: string })[] = [
  {
    id: 'kb-1',
    name: 'Product Documentation',
    description: 'All product docs, FAQs, and how-to guides',
    owner_id: 'user-1',
    sources: [],
    sources_summary: '32 files, 13 URLs',
    document_count: 45,
    total_chunks: 1250,
    total_tokens: 89000,
    status: 'ready',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-03-10T14:30:00Z',
  },
  {
    id: 'kb-2',
    name: 'Sales Playbook',
    description: 'Sales scripts, objection handling, case studies, and competitive analysis',
    owner_id: 'user-1',
    sources: [],
    sources_summary: '12 files',
    document_count: 12,
    total_chunks: 340,
    total_tokens: 25000,
    status: 'ready',
    created_at: '2024-02-01T09:00:00Z',
    updated_at: '2024-03-08T16:00:00Z',
  },
  {
    id: 'kb-3',
    name: 'Company Wiki',
    description: 'Internal company knowledge, processes, and onboarding materials',
    owner_id: 'user-1',
    sources: [],
    sources_summary: '78 files, 5 URLs',
    document_count: 83,
    total_chunks: 2100,
    total_tokens: 156000,
    status: 'ready',
    created_at: '2024-01-20T11:00:00Z',
    updated_at: '2024-03-12T09:00:00Z',
  },
  {
    id: 'kb-4',
    name: 'API Reference',
    description: 'API documentation and code examples',
    owner_id: 'user-1',
    sources: [],
    sources_summary: '2 URLs',
    document_count: 2,
    total_chunks: 180,
    total_tokens: 14000,
    status: 'processing',
    created_at: '2024-03-17T08:00:00Z',
    updated_at: '2024-03-17T08:00:00Z',
  },
];

const statusConfig: Record<KnowledgeStatus, { variant: 'success' | 'warning' | 'danger' | 'default'; label: string }> = {
  ready: { variant: 'success', label: 'Ready' },
  processing: { variant: 'warning', label: 'Processing' },
  pending: { variant: 'default', label: 'Pending' },
  error: { variant: 'danger', label: 'Error' },
};

export default function KnowledgePage() {
  const [search, setSearch] = useState('');
  const [showCreate, setShowCreate] = useState(false);

  const filtered = mockKBs.filter(
    (kb) =>
      kb.name.toLowerCase().includes(search.toLowerCase()) ||
      kb.description.toLowerCase().includes(search.toLowerCase())
  );

  const totalDocs = mockKBs.reduce((sum, kb) => sum + kb.document_count, 0);
  const totalTokens = mockKBs.reduce((sum, kb) => sum + kb.total_tokens, 0);

  return (
    <div>
      <TopBar
        title="Knowledge Base"
        subtitle="Manage reference material for your agents"
        action={{ label: 'New Knowledge Base', onClick: () => setShowCreate(true) }}
      />

      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card padding="sm">
            <div className="p-3">
              <p className="text-xs text-surface-500">Knowledge Bases</p>
              <p className="text-xl font-bold text-surface-900">{mockKBs.length}</p>
            </div>
          </Card>
          <Card padding="sm">
            <div className="p-3">
              <p className="text-xs text-surface-500">Total Documents</p>
              <p className="text-xl font-bold text-surface-900">{totalDocs}</p>
            </div>
          </Card>
          <Card padding="sm">
            <div className="p-3">
              <p className="text-xs text-surface-500">Total Tokens</p>
              <p className="text-xl font-bold text-surface-900">{(totalTokens / 1000).toFixed(0)}K</p>
            </div>
          </Card>
          <Card padding="sm">
            <div className="p-3">
              <p className="text-xs text-surface-500">Storage Used</p>
              <ProgressBar value={284} max={500} label="" color="spark" size="sm" />
              <p className="text-xs text-surface-500 mt-1">284 MB / 500 MB</p>
            </div>
          </Card>
        </div>

        <SearchBar value={search} onChange={setSearch} placeholder="Search knowledge bases..." className="max-w-md" />

        {/* KB Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((kb) => (
            <Card key={kb.id} hover>
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <Badge variant={statusConfig[kb.status].variant}>
                    {statusConfig[kb.status].label}
                  </Badge>
                </div>

                <h3 className="text-sm font-semibold text-surface-900 mb-1">{kb.name}</h3>
                <p className="text-xs text-surface-500 mb-3 line-clamp-2">{kb.description}</p>

                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge size="sm">
                    <File className="w-3 h-3 mr-1" />
                    {kb.document_count} docs
                  </Badge>
                  <Badge size="sm">
                    <Database className="w-3 h-3 mr-1" />
                    {(kb.total_tokens / 1000).toFixed(0)}K tokens
                  </Badge>
                </div>

                <p className="text-xs text-surface-400">{kb.sources_summary}</p>

                <div className="flex items-center justify-between pt-3 mt-3 border-t border-surface-100">
                  <span className="text-xs text-surface-400">
                    <Clock className="w-3 h-3 inline mr-1" />
                    Updated {formatRelativeTime(kb.updated_at)}
                  </span>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon">
                      <RefreshCw className="w-3.5 h-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Modal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        title="Create Knowledge Base"
        description="Add files and URLs for your agents to reference."
        size="lg"
      >
        <div className="p-6 space-y-5">
          <Input label="Name" placeholder="e.g., Product Documentation" />
          <Input label="Description" placeholder="What knowledge does this contain?" />

          <div
            className="border-2 border-dashed border-surface-300 rounded-xl p-8 text-center hover:border-spark-400 hover:bg-spark-50/30 transition-all cursor-pointer"
          >
            <Upload className="w-8 h-8 text-surface-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-surface-700">Drop files here or click to upload</p>
            <p className="text-xs text-surface-500 mt-1">PDF, TXT, MD, DOCX, CSV, JSON (max 25MB each)</p>
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <Input placeholder="https://example.com/docs" icon={<Link2 className="w-4 h-4" />} />
            </div>
            <Button variant="secondary">Add URL</Button>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="secondary" onClick={() => setShowCreate(false)}>Cancel</Button>
            <Button>Create</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
