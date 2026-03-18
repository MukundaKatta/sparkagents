'use client';

import { useState } from 'react';
import { TopBar } from '@/components/layout/top-bar';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { SearchBar } from '@/components/ui/search-bar';
import { Tabs } from '@/components/ui/tabs';
import {
  Star, Download, Copy, Eye, Heart, TrendingUp, Award,
  Bot, Search as SearchIcon, PenTool, BarChart3, HeadphonesIcon, Code,
} from 'lucide-react';

const marketplaceAgents = [
  {
    id: '1', name: 'Universal Research Assistant', author: 'SparkAgents Team', avatar: '',
    description: 'A powerful research agent that searches the web, analyzes findings, and generates comprehensive reports with citations.',
    role: 'researcher', tags: ['research', 'web-search', 'reporting'],
    clones: 4280, rating: 4.8, reviews: 312, featured: true,
  },
  {
    id: '2', name: 'Customer Support Pro', author: 'AgentCraft', avatar: '',
    description: 'Production-ready customer support agent with knowledge base integration, ticket routing, and escalation workflows.',
    role: 'support', tags: ['support', 'tickets', 'knowledge-base'],
    clones: 3150, rating: 4.7, reviews: 245, featured: true,
  },
  {
    id: '3', name: 'Content Writer Suite', author: 'ContentAI Labs', avatar: '',
    description: 'Multi-format content creator: blog posts, social media, emails, ad copy. Includes tone and style customization.',
    role: 'writer', tags: ['content', 'writing', 'social-media'],
    clones: 2890, rating: 4.6, reviews: 198, featured: false,
  },
  {
    id: '4', name: 'Data Analytics Agent', author: 'DataMind', avatar: '',
    description: 'Analyzes CSV/spreadsheet data, generates charts, identifies trends, and creates presentation-ready insights.',
    role: 'analyst', tags: ['data', 'analytics', 'charts'],
    clones: 1950, rating: 4.5, reviews: 156, featured: false,
  },
  {
    id: '5', name: 'Sales Outreach Agent', author: 'GrowthPilot', avatar: '',
    description: 'Automated sales outreach: lead research, personalized email sequences, follow-up scheduling, and CRM updates.',
    role: 'sales', tags: ['sales', 'outreach', 'email'],
    clones: 1680, rating: 4.4, reviews: 134, featured: false,
  },
  {
    id: '6', name: 'Code Review Agent', author: 'DevTools Inc', avatar: '',
    description: 'Reviews code for bugs, security issues, performance problems, and style violations. Supports 15+ languages.',
    role: 'developer', tags: ['code-review', 'security', 'performance'],
    clones: 2310, rating: 4.7, reviews: 189, featured: true,
  },
  {
    id: '7', name: 'Meeting Summarizer', author: 'ProductiveAI', avatar: '',
    description: 'Processes meeting transcripts into structured summaries with action items, decisions, and follow-ups.',
    role: 'assistant', tags: ['meetings', 'summaries', 'productivity'],
    clones: 3520, rating: 4.8, reviews: 267, featured: false,
  },
  {
    id: '8', name: 'HR Onboarding Assistant', author: 'PeopleOps AI', avatar: '',
    description: 'Guides new hires through onboarding, answers policy questions, and helps set up accounts and tools.',
    role: 'support', tags: ['hr', 'onboarding', 'policies'],
    clones: 890, rating: 4.3, reviews: 67, featured: false,
  },
];

const categoryTabs = [
  { id: 'all', label: 'All', icon: <Bot className="w-4 h-4" /> },
  { id: 'featured', label: 'Featured', icon: <Award className="w-4 h-4" /> },
  { id: 'trending', label: 'Trending', icon: <TrendingUp className="w-4 h-4" /> },
  { id: 'researcher', label: 'Research' },
  { id: 'support', label: 'Support' },
  { id: 'writer', label: 'Writing' },
  { id: 'developer', label: 'Developer' },
];

export default function MarketplacePage() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filtered = marketplaceAgents.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(search.toLowerCase()) ||
      agent.description.toLowerCase().includes(search.toLowerCase()) ||
      agent.tags.some((t) => t.includes(search.toLowerCase()));
    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'featured' && agent.featured) ||
      (activeTab === 'trending' && agent.clones > 2000) ||
      agent.role === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div>
      <TopBar
        title="Agent Marketplace"
        subtitle="Browse and clone community-built agents"
      />

      <div className="p-6 space-y-6">
        {/* Hero */}
        <div className="bg-gradient-to-r from-spark-600 via-violet-600 to-purple-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-2">Discover AI Agents</h2>
          <p className="text-white/80 mb-4 max-w-lg">
            Browse hundreds of pre-built agents created by the community. Clone, customize, and deploy in minutes.
          </p>
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search agents, categories, or tags..."
            className="max-w-lg"
          />
        </div>

        <Tabs tabs={categoryTabs} activeTab={activeTab} onChange={setActiveTab} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((agent) => (
            <Card key={agent.id} hover>
              <div className="p-5">
                {agent.featured && (
                  <div className="flex items-center gap-1 mb-3">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-medium text-amber-600">Featured</span>
                  </div>
                )}

                <div className="flex items-start gap-3 mb-3">
                  <Avatar name={agent.name} size="lg" />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-surface-900">{agent.name}</h3>
                    <p className="text-xs text-surface-500">by {agent.author}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="text-xs font-medium text-surface-700">{agent.rating}</span>
                      <span className="text-xs text-surface-400">({agent.reviews})</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-surface-600 mb-3 line-clamp-2">{agent.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {agent.tags.map((tag) => (
                    <Badge key={tag} size="sm">{tag}</Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-surface-100">
                  <div className="flex items-center gap-3 text-xs text-surface-500">
                    <span className="flex items-center gap-1">
                      <Download className="w-3.5 h-3.5" />
                      {agent.clones.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-3.5 h-3.5" />
                      Preview
                    </Button>
                    <Button size="sm">
                      <Copy className="w-3.5 h-3.5" />
                      Clone
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
