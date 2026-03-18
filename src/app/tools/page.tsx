'use client';

import { useState } from 'react';
import { TopBar } from '@/components/layout/top-bar';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SearchBar } from '@/components/ui/search-bar';
import { Tabs } from '@/components/ui/tabs';
import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { cn } from '@/utils/cn';
import { BUILTIN_TOOLS, type ToolCategory } from '@/types/tool';
import {
  Search, Mail, MessageSquare, Table, FileSpreadsheet, Globe,
  FileText, Braces, Calculator, AlignLeft, Plus, Wrench, ExternalLink,
  Code, Zap, Settings, Play, Trash2,
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Search: <Search className="w-6 h-6" />,
  Mail: <Mail className="w-6 h-6" />,
  MessageSquare: <MessageSquare className="w-6 h-6" />,
  Table: <Table className="w-6 h-6" />,
  FileSpreadsheet: <FileSpreadsheet className="w-6 h-6" />,
  Globe: <Globe className="w-6 h-6" />,
  FileText: <FileText className="w-6 h-6" />,
  Braces: <Braces className="w-6 h-6" />,
  Calculator: <Calculator className="w-6 h-6" />,
  AlignLeft: <AlignLeft className="w-6 h-6" />,
};

const categories = [
  { id: 'all', label: 'All' },
  { id: 'search', label: 'Search' },
  { id: 'communication', label: 'Communication' },
  { id: 'data', label: 'Data' },
  { id: 'integration', label: 'Integration' },
  { id: 'utility', label: 'Utility' },
  { id: 'custom', label: 'Custom' },
];

export default function ToolsPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [showCustomBuilder, setShowCustomBuilder] = useState(false);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const filteredTools = BUILTIN_TOOLS.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(search.toLowerCase()) ||
      tool.description.toLowerCase().includes(search.toLowerCase());
    const matchesCat = activeCategory === 'all' || tool.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div>
      <TopBar
        title="Tool Library"
        subtitle="Pre-built tools and custom tool builder"
        action={{ label: 'Custom Tool', onClick: () => setShowCustomBuilder(true) }}
      />

      <div className="p-6 space-y-4">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search tools..."
          className="max-w-md"
        />

        <Tabs tabs={categories} activeTab={activeCategory} onChange={setActiveCategory} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTools.map((tool) => (
            <Card key={tool.id} hover onClick={() => setSelectedTool(tool.id)}>
              <div className="p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-spark-50 text-spark-600 flex items-center justify-center flex-shrink-0">
                    {iconMap[tool.icon] || <Wrench className="w-6 h-6" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-surface-900">{tool.name}</h3>
                      {tool.is_builtin && <Badge variant="info" size="sm">Built-in</Badge>}
                    </div>
                    <Badge size="sm" className="mt-1">{tool.category}</Badge>
                  </div>
                </div>

                <p className="text-xs text-surface-600 mb-4">{tool.description}</p>

                <div className="space-y-2 pt-3 border-t border-surface-100">
                  <p className="text-xs font-medium text-surface-500">Parameters:</p>
                  {tool.parameters.map((param) => (
                    <div key={param.name} className="flex items-center gap-2 text-xs">
                      <code className="bg-surface-100 px-1.5 py-0.5 rounded font-mono text-spark-700">
                        {param.name}
                      </code>
                      <span className="text-surface-400">{param.type}</span>
                      {param.required && <Badge variant="danger" size="sm">required</Badge>}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Custom Tool Builder Modal */}
      <Modal
        open={showCustomBuilder}
        onClose={() => setShowCustomBuilder(false)}
        title="Create Custom Tool"
        description="Build a custom tool by defining an HTTP endpoint and its parameters."
        size="lg"
      >
        <div className="p-6 space-y-5">
          <Input label="Tool Name" placeholder="e.g., CRM Lookup" />
          <Textarea label="Description" placeholder="What does this tool do?" rows={2} />
          <Select
            label="Category"
            options={[
              { value: 'integration', label: 'Integration' },
              { value: 'data', label: 'Data' },
              { value: 'utility', label: 'Utility' },
              { value: 'custom', label: 'Custom' },
            ]}
          />

          <div className="border border-surface-200 rounded-lg p-4 space-y-3">
            <h4 className="text-sm font-medium text-surface-700">API Configuration</h4>
            <div className="flex gap-3">
              <Select
                label="Method"
                options={[
                  { value: 'GET', label: 'GET' },
                  { value: 'POST', label: 'POST' },
                  { value: 'PUT', label: 'PUT' },
                  { value: 'DELETE', label: 'DELETE' },
                ]}
                className="w-32"
              />
              <div className="flex-1">
                <Input label="Endpoint URL" placeholder="https://api.example.com/endpoint" />
              </div>
            </div>
            <Textarea
              label="Headers (JSON)"
              placeholder='{"Authorization": "Bearer {{api_key}}"}'
              rows={2}
              className="font-mono text-xs"
            />
            <Textarea
              label="Body Template (JSON)"
              placeholder='{"query": "{{input}}"}'
              rows={3}
              className="font-mono text-xs"
            />
            <Input
              label="Response Mapping (JSONPath)"
              placeholder="$.data.results"
              hint="Extract specific data from the response"
            />
          </div>

          <div className="border border-surface-200 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-surface-700">Parameters</h4>
              <Button variant="ghost" size="sm">
                <Plus className="w-4 h-4" /> Add Parameter
              </Button>
            </div>
            <div className="bg-surface-50 rounded-lg p-3 text-sm text-surface-500 text-center">
              No parameters defined yet. Click "Add Parameter" to define inputs for your tool.
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t border-surface-100">
            <Button variant="outline">
              <Play className="w-4 h-4" /> Test Tool
            </Button>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => setShowCustomBuilder(false)}>Cancel</Button>
              <Button>Create Tool</Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
