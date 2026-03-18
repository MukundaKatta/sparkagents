'use client';

import { useState } from 'react';
import { useAgentStore } from '@/hooks/use-agent-store';
import { Card } from '@/components/ui/card';
import { SearchBar } from '@/components/ui/search-bar';
import { Badge } from '@/components/ui/badge';
import { Toggle } from '@/components/ui/toggle';
import { Tabs } from '@/components/ui/tabs';
import { cn } from '@/utils/cn';
import { BUILTIN_TOOLS, type ToolCategory } from '@/types/tool';
import {
  Search, Mail, MessageSquare, Table, FileSpreadsheet, Globe,
  FileText, Braces, Calculator, AlignLeft, Plus, Wrench, Check,
} from 'lucide-react';
import { v4 as uuid } from 'uuid';

const iconMap: Record<string, React.ReactNode> = {
  Search: <Search className="w-5 h-5" />,
  Mail: <Mail className="w-5 h-5" />,
  MessageSquare: <MessageSquare className="w-5 h-5" />,
  Table: <Table className="w-5 h-5" />,
  FileSpreadsheet: <FileSpreadsheet className="w-5 h-5" />,
  Globe: <Globe className="w-5 h-5" />,
  FileText: <FileText className="w-5 h-5" />,
  Braces: <Braces className="w-5 h-5" />,
  Calculator: <Calculator className="w-5 h-5" />,
  AlignLeft: <AlignLeft className="w-5 h-5" />,
};

const categories: { id: string; label: string }[] = [
  { id: 'all', label: 'All Tools' },
  { id: 'search', label: 'Search' },
  { id: 'communication', label: 'Communication' },
  { id: 'data', label: 'Data' },
  { id: 'integration', label: 'Integration' },
  { id: 'utility', label: 'Utility' },
];

export function StepTools() {
  const { draft, addToolToDraft, removeToolFromDraft } = useAgentStore();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const selectedToolIds = draft.tools.map((t) => t.tool_id);

  const filteredTools = BUILTIN_TOOLS.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(search.toLowerCase()) ||
      tool.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleTool = (toolId: string) => {
    if (selectedToolIds.includes(toolId)) {
      removeToolFromDraft(toolId);
    } else {
      addToolToDraft({
        id: uuid(),
        tool_id: toolId,
        config: {},
        enabled: true,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-semibold text-surface-900 mb-1">
          Select Tools
        </h3>
        <p className="text-sm text-surface-500">
          Choose the tools your agent can use. Each tool gives your agent a specific capability.
        </p>
      </div>

      {/* Selected count */}
      {draft.tools.length > 0 && (
        <div className="flex items-center gap-2 p-3 bg-spark-50 rounded-lg border border-spark-100">
          <Wrench className="w-4 h-4 text-spark-600" />
          <span className="text-sm font-medium text-spark-700">
            {draft.tools.length} tool{draft.tools.length !== 1 ? 's' : ''} selected
          </span>
        </div>
      )}

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search tools..."
      />

      <Tabs tabs={categories} activeTab={activeCategory} onChange={setActiveCategory} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredTools.map((tool) => {
          const isSelected = selectedToolIds.includes(tool.id);
          return (
            <button
              key={tool.id}
              onClick={() => toggleTool(tool.id)}
              className={cn(
                'flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all duration-200',
                isSelected
                  ? 'border-spark-500 bg-spark-50'
                  : 'border-surface-200 hover:border-surface-300 hover:bg-surface-50'
              )}
            >
              <div
                className={cn(
                  'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
                  isSelected ? 'bg-spark-100 text-spark-600' : 'bg-surface-100 text-surface-500'
                )}
              >
                {iconMap[tool.icon] || <Wrench className="w-5 h-5" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-surface-900">{tool.name}</span>
                  <Badge variant={isSelected ? 'info' : 'default'} size="sm">
                    {tool.category}
                  </Badge>
                </div>
                <p className="text-xs text-surface-500 mt-1 line-clamp-2">{tool.description}</p>
                <p className="text-xs text-surface-400 mt-1.5">
                  {tool.parameters.length} parameter{tool.parameters.length !== 1 ? 's' : ''}
                </p>
              </div>
              <div className="flex-shrink-0 mt-1">
                {isSelected ? (
                  <div className="w-6 h-6 rounded-full bg-spark-600 flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full border-2 border-surface-300" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {filteredTools.length === 0 && (
        <div className="text-center py-12">
          <Wrench className="w-12 h-12 text-surface-300 mx-auto mb-3" />
          <p className="text-sm text-surface-500">No tools found matching your search.</p>
        </div>
      )}
    </div>
  );
}
