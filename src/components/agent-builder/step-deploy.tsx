'use client';

import { useState } from 'react';
import { useAgentStore } from '@/hooks/use-agent-store';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/utils/cn';
import {
  Globe, MessageCircle, Clock, Hash, Check, Copy,
  Code, Palette, ArrowRight, Rocket, ExternalLink,
} from 'lucide-react';
import type { DeployTarget } from '@/types/agent';

const deployTargets: { id: DeployTarget; name: string; description: string; icon: React.ReactNode }[] = [
  {
    id: 'api',
    name: 'API Endpoint',
    description: 'RESTful API with authentication. Perfect for integrating with your existing apps.',
    icon: <Globe className="w-6 h-6" />,
  },
  {
    id: 'widget',
    name: 'Chat Widget',
    description: 'Embeddable chat widget for your website. Customizable theme and branding.',
    icon: <MessageCircle className="w-6 h-6" />,
  },
  {
    id: 'scheduled',
    name: 'Scheduled Task',
    description: 'Run your agent on a schedule. Great for reports, monitoring, and automation.',
    icon: <Clock className="w-6 h-6" />,
  },
  {
    id: 'slack',
    name: 'Slack Bot',
    description: 'Deploy as a Slack bot that responds to messages in channels or DMs.',
    icon: <Hash className="w-6 h-6" />,
  },
];

export function StepDeploy() {
  const { draft } = useAgentStore();
  const [selectedTargets, setSelectedTargets] = useState<DeployTarget[]>([]);
  const [copiedEndpoint, setCopiedEndpoint] = useState(false);

  const toggleTarget = (target: DeployTarget) => {
    setSelectedTargets((prev) =>
      prev.includes(target)
        ? prev.filter((t) => t !== target)
        : [...prev, target]
    );
  };

  const copyEndpoint = () => {
    navigator.clipboard.writeText('https://api.sparkagents.io/v1/agents/abc123/run');
    setCopiedEndpoint(true);
    setTimeout(() => setCopiedEndpoint(false), 2000);
  };

  const apiKey = 'sk_spark_a1b2c3d4e5f6g7h8i9j0...';

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-semibold text-surface-900 mb-1">
          Deploy Your Agent
        </h3>
        <p className="text-sm text-surface-500">
          Choose how you want to make your agent available. You can select multiple deployment targets.
        </p>
      </div>

      {/* Target Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {deployTargets.map((target) => {
          const isSelected = selectedTargets.includes(target.id);
          return (
            <button
              key={target.id}
              onClick={() => toggleTarget(target.id)}
              className={cn(
                'flex items-start gap-4 p-5 rounded-xl border-2 text-left transition-all duration-200',
                isSelected
                  ? 'border-spark-500 bg-spark-50 shadow-sm'
                  : 'border-surface-200 hover:border-surface-300 hover:bg-surface-50'
              )}
            >
              <div
                className={cn(
                  'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0',
                  isSelected ? 'bg-spark-100 text-spark-600' : 'bg-surface-100 text-surface-500'
                )}
              >
                {target.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-surface-900">{target.name}</span>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-spark-600 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                </div>
                <p className="text-xs text-surface-500 mt-1">{target.description}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* API Config */}
      {selectedTargets.includes('api') && (
        <Card className="border-2 border-spark-200">
          <div className="p-5 space-y-4">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-spark-600" />
              <h4 className="text-sm font-semibold text-surface-900">API Endpoint Configuration</h4>
            </div>

            <div className="bg-surface-900 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-surface-400">Your API Endpoint</span>
                <button onClick={copyEndpoint} className="text-xs text-spark-400 hover:text-spark-300 flex items-center gap-1">
                  {copiedEndpoint ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copiedEndpoint ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <code className="text-sm text-emerald-400 font-mono">
                POST https://api.sparkagents.io/v1/agents/abc123/run
              </code>
            </div>

            <div className="bg-surface-50 rounded-lg p-4">
              <p className="text-xs font-medium text-surface-600 mb-2">Example Request:</p>
              <pre className="text-xs text-surface-700 font-mono overflow-x-auto">
{`curl -X POST https://api.sparkagents.io/v1/agents/abc123/run \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{"input": "Your message here"}'`}
              </pre>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Input label="Rate Limit (req/min)" type="number" defaultValue="60" />
              <Input label="CORS Origins" placeholder="*.yourdomain.com" />
            </div>
          </div>
        </Card>
      )}

      {/* Widget Config */}
      {selectedTargets.includes('widget') && (
        <Card className="border-2 border-spark-200">
          <div className="p-5 space-y-4">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-spark-600" />
              <h4 className="text-sm font-semibold text-surface-900">Chat Widget Configuration</h4>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Input label="Welcome Message" defaultValue="Hi! How can I help you today?" />
              <Input label="Input Placeholder" defaultValue="Type your message..." />
              <Input label="Brand Color" type="color" defaultValue="#4c6ef5" />
              <Input label="Allowed Domains" placeholder="yourdomain.com" />
            </div>

            <div className="flex gap-3">
              <Toggle label="Dark Mode" checked={false} onChange={() => {}} />
              <Toggle label="Show Powered By" checked={true} onChange={() => {}} />
            </div>

            <div className="bg-surface-900 rounded-lg p-4">
              <p className="text-xs text-surface-400 mb-2">Embed Code:</p>
              <pre className="text-xs text-emerald-400 font-mono">
{`<script src="https://cdn.sparkagents.io/widget.js"></script>
<script>
  SparkAgent.init({
    agentId: "abc123",
    theme: "light",
    position: "bottom-right"
  });
</script>`}
              </pre>
            </div>
          </div>
        </Card>
      )}

      {/* Scheduled Task Config */}
      {selectedTargets.includes('scheduled') && (
        <Card className="border-2 border-spark-200">
          <div className="p-5 space-y-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-spark-600" />
              <h4 className="text-sm font-semibold text-surface-900">Scheduled Task Configuration</h4>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Input label="Cron Schedule" placeholder="0 9 * * 1-5" hint="e.g., Every weekday at 9am" />
              <Input label="Timezone" defaultValue="America/New_York" />
            </div>
            <Textarea
              label="Input Template"
              placeholder="The input message to send to the agent on each run..."
              rows={3}
            />
            <Input label="Output Webhook (optional)" placeholder="https://your-api.com/webhook" />
          </div>
        </Card>
      )}

      {/* Slack Config */}
      {selectedTargets.includes('slack') && (
        <Card className="border-2 border-spark-200">
          <div className="p-5 space-y-4">
            <div className="flex items-center gap-2">
              <Hash className="w-5 h-5 text-spark-600" />
              <h4 className="text-sm font-semibold text-surface-900">Slack Bot Configuration</h4>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Input label="Channel IDs" placeholder="#general, #support" />
              <Input label="Trigger Words" placeholder="@agent, help, support" />
            </div>
            <Toggle
              label="Enable Direct Messages"
              description="Allow users to message the bot directly"
              checked={true}
              onChange={() => {}}
            />
            <Button variant="outline" className="w-full">
              <ExternalLink className="w-4 h-4" />
              Connect to Slack Workspace
            </Button>
          </div>
        </Card>
      )}

      {/* Deploy Button */}
      {selectedTargets.length > 0 && (
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-spark-50 to-violet-50 rounded-xl border border-spark-100">
          <div>
            <p className="text-sm font-semibold text-surface-900">
              Ready to deploy to {selectedTargets.length} target{selectedTargets.length !== 1 ? 's' : ''}
            </p>
            <p className="text-xs text-surface-500 mt-0.5">
              {selectedTargets.map((t) => deployTargets.find((dt) => dt.id === t)?.name).join(', ')}
            </p>
          </div>
          <Button size="lg">
            <Rocket className="w-5 h-5" />
            Deploy Agent
          </Button>
        </div>
      )}
    </div>
  );
}
