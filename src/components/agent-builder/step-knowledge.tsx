'use client';

import { useState, useCallback } from 'react';
import { useAgentStore } from '@/hooks/use-agent-store';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/utils/cn';
import { Upload, FileText, Globe, Link2, Trash2, Plus, CheckCircle2, Loader2, BookOpen } from 'lucide-react';
import { v4 as uuid } from 'uuid';
import type { KnowledgeBase } from '@/types/knowledge';

// Mock existing knowledge bases
const existingKBs: KnowledgeBase[] = [
  {
    id: 'kb-1',
    name: 'Product Documentation',
    description: 'All product docs and FAQs',
    owner_id: 'user-1',
    sources: [],
    document_count: 45,
    total_chunks: 1250,
    total_tokens: 89000,
    status: 'ready',
    created_at: '2024-01-15',
    updated_at: '2024-03-10',
  },
  {
    id: 'kb-2',
    name: 'Sales Playbook',
    description: 'Sales scripts, objection handling, and case studies',
    owner_id: 'user-1',
    sources: [],
    document_count: 12,
    total_chunks: 340,
    total_tokens: 25000,
    status: 'ready',
    created_at: '2024-02-01',
    updated_at: '2024-03-08',
  },
  {
    id: 'kb-3',
    name: 'Company Wiki',
    description: 'Internal company knowledge and processes',
    owner_id: 'user-1',
    sources: [],
    document_count: 78,
    total_chunks: 2100,
    total_tokens: 156000,
    status: 'ready',
    created_at: '2024-01-20',
    updated_at: '2024-03-12',
  },
];

interface PendingFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'pending' | 'uploading' | 'done';
}

export function StepKnowledge() {
  const { draft, addKnowledgeBaseToDraft, removeKnowledgeBaseFromDraft } = useAgentStore();
  const [pendingFiles, setPendingFiles] = useState<PendingFile[]>([]);
  const [urlInput, setUrlInput] = useState('');
  const [urls, setUrls] = useState<string[]>([]);
  const [showNewKB, setShowNewKB] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const newFiles: PendingFile[] = files.map((f) => ({
      id: uuid(),
      name: f.name,
      size: f.size,
      type: f.type,
      status: 'pending',
    }));
    setPendingFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newFiles: PendingFile[] = files.map((f) => ({
      id: uuid(),
      name: f.name,
      size: f.size,
      type: f.type,
      status: 'pending',
    }));
    setPendingFiles((prev) => [...prev, ...newFiles]);
  };

  const addUrl = () => {
    if (urlInput.trim() && !urls.includes(urlInput.trim())) {
      setUrls((prev) => [...prev, urlInput.trim()]);
      setUrlInput('');
    }
  };

  const removeFile = (id: string) => {
    setPendingFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const removeUrl = (url: string) => {
    setUrls((prev) => prev.filter((u) => u !== url));
  };

  const toggleKB = (kbId: string) => {
    if (draft.knowledge_bases.includes(kbId)) {
      removeKnowledgeBaseFromDraft(kbId);
    } else {
      addKnowledgeBaseToDraft(kbId);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-semibold text-surface-900 mb-1">
          Knowledge Base
        </h3>
        <p className="text-sm text-surface-500">
          Give your agent reference material to answer questions more accurately.
          Connect existing knowledge bases or create a new one.
        </p>
      </div>

      {/* Existing Knowledge Bases */}
      <div>
        <h4 className="text-sm font-medium text-surface-700 mb-3">Existing Knowledge Bases</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {existingKBs.map((kb) => {
            const isSelected = draft.knowledge_bases.includes(kb.id);
            return (
              <button
                key={kb.id}
                onClick={() => toggleKB(kb.id)}
                className={cn(
                  'flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all duration-200',
                  isSelected
                    ? 'border-spark-500 bg-spark-50'
                    : 'border-surface-200 hover:border-surface-300'
                )}
              >
                <div
                  className={cn(
                    'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
                    isSelected ? 'bg-spark-100 text-spark-600' : 'bg-surface-100 text-surface-500'
                  )}
                >
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-surface-900">{kb.name}</p>
                  <p className="text-xs text-surface-500 mt-0.5">{kb.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge size="sm">{kb.document_count} docs</Badge>
                    <Badge size="sm" variant="success">{kb.status}</Badge>
                  </div>
                </div>
                {isSelected && (
                  <CheckCircle2 className="w-5 h-5 text-spark-600 flex-shrink-0" />
                )}
              </button>
            );
          })}

          <button
            onClick={() => setShowNewKB(!showNewKB)}
            className="flex items-center justify-center gap-2 p-4 rounded-xl border-2 border-dashed border-surface-300 text-surface-500 hover:border-spark-400 hover:text-spark-600 hover:bg-spark-50 transition-all duration-200"
          >
            <Plus className="w-5 h-5" />
            <span className="text-sm font-medium">Create New</span>
          </button>
        </div>
      </div>

      {/* Create New Knowledge Base */}
      {showNewKB && (
        <Card className="border-2 border-spark-200">
          <div className="p-5 space-y-5">
            <h4 className="text-sm font-semibold text-surface-900">Create New Knowledge Base</h4>

            {/* File Upload */}
            <div>
              <p className="text-sm font-medium text-surface-700 mb-2">Upload Files</p>
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className="border-2 border-dashed border-surface-300 rounded-xl p-8 text-center hover:border-spark-400 hover:bg-spark-50/30 transition-all cursor-pointer"
              >
                <input
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.txt,.md,.docx,.csv,.json"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="w-8 h-8 text-surface-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-surface-700">Drop files here or click to upload</p>
                  <p className="text-xs text-surface-500 mt-1">PDF, TXT, MD, DOCX, CSV, JSON (max 25MB each)</p>
                </label>
              </div>

              {pendingFiles.length > 0 && (
                <div className="mt-3 space-y-2">
                  {pendingFiles.map((file) => (
                    <div key={file.id} className="flex items-center gap-3 p-2 bg-surface-50 rounded-lg">
                      <FileText className="w-4 h-4 text-surface-400 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-surface-700 truncate">{file.name}</p>
                        <p className="text-xs text-surface-500">{formatSize(file.size)}</p>
                      </div>
                      {file.status === 'uploading' && <Loader2 className="w-4 h-4 text-spark-500 animate-spin" />}
                      {file.status === 'done' && <CheckCircle2 className="w-4 h-4 text-success-500" />}
                      <button onClick={() => removeFile(file.id)} className="text-surface-400 hover:text-danger-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* URL Input */}
            <div>
              <p className="text-sm font-medium text-surface-700 mb-2">Connect URLs</p>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input
                    placeholder="https://example.com/docs"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    icon={<Link2 className="w-4 h-4" />}
                    onKeyDown={(e) => e.key === 'Enter' && addUrl()}
                  />
                </div>
                <Button onClick={addUrl} variant="secondary">Add</Button>
              </div>

              {urls.length > 0 && (
                <div className="mt-3 space-y-2">
                  {urls.map((url) => (
                    <div key={url} className="flex items-center gap-3 p-2 bg-surface-50 rounded-lg">
                      <Globe className="w-4 h-4 text-surface-400 flex-shrink-0" />
                      <span className="text-sm text-surface-700 truncate flex-1">{url}</span>
                      <button onClick={() => removeUrl(url)} className="text-surface-400 hover:text-danger-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Button variant="primary" className="w-full">
              <Plus className="w-4 h-4" />
              Create Knowledge Base
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
