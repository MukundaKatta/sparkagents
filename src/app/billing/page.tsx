'use client';

import { useState } from 'react';
import { TopBar } from '@/components/layout/top-bar';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/ui/progress-bar';
import { cn } from '@/utils/cn';
import { PLANS } from '@/types/billing';
import {
  CreditCard, DollarSign, TrendingUp, Zap, CheckCircle2,
  ArrowRight, Calendar, Download, Star, AlertTriangle,
} from 'lucide-react';

const currentPlan = PLANS[2]; // Pro plan
const currentUsage = {
  runs: 6420,
  agents: 18,
  teams: 4,
  knowledgeMb: 1840,
  cost: 142.38,
  projected: 284.76,
  budget: 300,
};

const dailyCosts = [
  { date: 'Mar 1', cost: 4.21 }, { date: 'Mar 2', cost: 5.12 }, { date: 'Mar 3', cost: 3.89 },
  { date: 'Mar 4', cost: 6.45 }, { date: 'Mar 5', cost: 5.78 }, { date: 'Mar 6', cost: 4.92 },
  { date: 'Mar 7', cost: 7.23 }, { date: 'Mar 8', cost: 6.11 }, { date: 'Mar 9', cost: 5.34 },
  { date: 'Mar 10', cost: 8.45 }, { date: 'Mar 11', cost: 7.89 }, { date: 'Mar 12', cost: 6.67 },
  { date: 'Mar 13', cost: 9.12 }, { date: 'Mar 14', cost: 8.34 }, { date: 'Mar 15', cost: 7.56 },
  { date: 'Mar 16', cost: 10.23 }, { date: 'Mar 17', cost: 8.97 },
];

const costByAgent = [
  { name: 'Research Assistant', cost: 52.18, pct: 36.6, runs: 3200 },
  { name: 'Customer Support Bot', cost: 35.42, pct: 24.9, runs: 1800 },
  { name: 'Lead Qualifier', cost: 22.15, pct: 15.6, runs: 890 },
  { name: 'Email Summarizer', cost: 18.90, pct: 13.3, runs: 320 },
  { name: 'Data Analyst', cost: 13.73, pct: 9.6, runs: 210 },
];

export default function BillingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const maxCost = Math.max(...dailyCosts.map((d) => d.cost));

  return (
    <div>
      <TopBar title="Billing" subtitle="Usage-based billing dashboard with cost projections" />

      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Current Month Cost"
            value={`$${currentUsage.cost.toFixed(2)}`}
            change={5.2}
            trend="up"
            icon={<DollarSign className="w-5 h-5" />}
          />
          <StatCard
            title="Projected Cost"
            value={`$${currentUsage.projected.toFixed(2)}`}
            icon={<TrendingUp className="w-5 h-5" />}
          />
          <StatCard
            title="Total Runs"
            value={currentUsage.runs.toLocaleString()}
            change={12.5}
            trend="up"
            icon={<Zap className="w-5 h-5" />}
          />
          <StatCard
            title="Active Agents"
            value={currentUsage.agents.toString()}
            icon={<Star className="w-5 h-5" />}
          />
        </div>

        {/* Current Plan & Usage */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <div className="p-5">
              <CardTitle className="mb-4">Daily Cost</CardTitle>
              <div className="h-48 flex items-end gap-1 px-2">
                {dailyCosts.map((day) => (
                  <div key={day.date} className="flex-1 flex flex-col items-center gap-1 group">
                    <div className="relative w-full">
                      <div
                        className="w-full bg-spark-200 hover:bg-spark-400 rounded-t transition-all cursor-pointer"
                        style={{ height: `${(day.cost / maxCost) * 160}px` }}
                      />
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-surface-900 text-white text-xs px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        ${day.cost.toFixed(2)}
                      </div>
                    </div>
                    <span className="text-[9px] text-surface-400 -rotate-45 origin-top-left">{day.date.split(' ')[1]}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <CardTitle>Current Plan</CardTitle>
                <Badge variant="info" size="md">{currentPlan.name}</Badge>
              </div>
              <p className="text-2xl font-bold text-surface-900">
                ${currentPlan.price_monthly}<span className="text-sm font-normal text-surface-500">/mo</span>
              </p>

              <div className="space-y-3 pt-2">
                <ProgressBar
                  value={currentUsage.runs}
                  max={currentPlan.included_runs}
                  label="Runs"
                  color={currentUsage.runs > currentPlan.included_runs * 0.8 ? 'warning' : 'spark'}
                />
                <ProgressBar
                  value={currentUsage.agents}
                  max={currentPlan.included_agents}
                  label="Agents"
                  color="spark"
                />
                <ProgressBar
                  value={currentUsage.teams}
                  max={currentPlan.included_teams}
                  label="Teams"
                  color="spark"
                />
                <ProgressBar
                  value={currentUsage.knowledgeMb}
                  max={currentPlan.included_knowledge_mb}
                  label="Storage (MB)"
                  color="spark"
                />
              </div>

              <Button variant="outline" className="w-full">
                Upgrade Plan
              </Button>
            </div>
          </Card>
        </div>

        {/* Cost by Agent */}
        <Card>
          <div className="p-5">
            <CardTitle className="mb-4">Cost by Agent</CardTitle>
            <div className="space-y-3">
              {costByAgent.map((agent) => (
                <div key={agent.name} className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-surface-900">{agent.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-surface-500">{agent.runs} runs</span>
                        <span className="text-sm font-semibold text-surface-900">${agent.cost.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="w-full bg-surface-100 rounded-full h-2">
                      <div
                        className="bg-spark-500 rounded-full h-2 transition-all duration-500"
                        style={{ width: `${agent.pct}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Plans Comparison */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-surface-900">Plans</h2>
            <div className="flex items-center gap-2 bg-surface-100 rounded-lg p-1">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={cn(
                  'px-3 py-1.5 text-sm font-medium rounded-md transition-all',
                  billingCycle === 'monthly' ? 'bg-white text-surface-900 shadow-sm' : 'text-surface-500'
                )}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={cn(
                  'px-3 py-1.5 text-sm font-medium rounded-md transition-all',
                  billingCycle === 'yearly' ? 'bg-white text-surface-900 shadow-sm' : 'text-surface-500'
                )}
              >
                Yearly <Badge variant="success" size="sm" className="ml-1">Save 17%</Badge>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {PLANS.map((plan) => {
              const isCurrent = plan.id === currentPlan.id;
              const price = billingCycle === 'monthly' ? plan.price_monthly : plan.price_yearly / 12;
              return (
                <Card
                  key={plan.id}
                  className={cn(
                    'relative',
                    isCurrent && 'border-spark-500 ring-1 ring-spark-200'
                  )}
                >
                  <div className="p-5 space-y-4">
                    {isCurrent && (
                      <Badge variant="info" className="absolute top-3 right-3">Current</Badge>
                    )}
                    <div>
                      <h3 className="text-lg font-bold text-surface-900">{plan.name}</h3>
                      <p className="text-xs text-surface-500 mt-0.5">{plan.description}</p>
                    </div>
                    <div>
                      <span className="text-3xl font-bold text-surface-900">
                        ${price.toFixed(0)}
                      </span>
                      <span className="text-sm text-surface-500">/mo</span>
                    </div>
                    <ul className="space-y-2">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-xs text-surface-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-success-500 flex-shrink-0 mt-0.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant={isCurrent ? 'secondary' : 'primary'}
                      className="w-full"
                      disabled={isCurrent}
                    >
                      {isCurrent ? 'Current Plan' : 'Upgrade'}
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Cost Projection */}
        <Card>
          <div className="p-5">
            <CardTitle className="mb-4">Cost Projection & Recommendations</CardTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-spark-50 text-spark-600 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-surface-500">Projected month-end cost</p>
                    <p className="text-2xl font-bold text-surface-900">${currentUsage.projected.toFixed(2)}</p>
                  </div>
                </div>
                <div className="w-full bg-surface-100 rounded-full h-3 mb-2">
                  <div
                    className="bg-gradient-to-r from-spark-500 to-spark-400 rounded-full h-3"
                    style={{ width: `${(currentUsage.projected / currentUsage.budget) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-success-500">
                  Projected to be ~${(currentUsage.budget - currentUsage.projected).toFixed(2)} under your $
                  {currentUsage.budget} budget
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-surface-700">Recommendations</h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 p-3 bg-success-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-success-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-success-700">
                      Your usage is within plan limits. No action needed.
                    </p>
                  </div>
                  <div className="flex items-start gap-2 p-3 bg-spark-50 rounded-lg">
                    <TrendingUp className="w-4 h-4 text-spark-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-spark-700">
                      Consider switching Research Assistant to gpt-4o-mini for 60% cost savings on simple queries.
                    </p>
                  </div>
                  <div className="flex items-start gap-2 p-3 bg-warning-50 rounded-lg">
                    <AlertTriangle className="w-4 h-4 text-warning-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-warning-700">
                      You're at 64% of your monthly run limit with 14 days remaining.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
