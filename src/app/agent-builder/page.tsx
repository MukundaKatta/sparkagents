'use client';

import { useState } from 'react';
import { TopBar } from '@/components/layout/top-bar';
import { WizardStepper } from '@/components/agent-builder/wizard-stepper';
import { StepNameRole } from '@/components/agent-builder/step-name-role';
import { StepTools } from '@/components/agent-builder/step-tools';
import { StepKnowledge } from '@/components/agent-builder/step-knowledge';
import { StepGuardrails } from '@/components/agent-builder/step-guardrails';
import { StepTest } from '@/components/agent-builder/step-test';
import { StepDeploy } from '@/components/agent-builder/step-deploy';
import { Button } from '@/components/ui/button';
import { useAgentStore } from '@/hooks/use-agent-store';
import { ArrowLeft, ArrowRight, Save } from 'lucide-react';

const TOTAL_STEPS = 6;

export default function AgentBuilderPage() {
  const { wizardStep, setWizardStep, draft } = useAgentStore();
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const goNext = () => {
    if (wizardStep < TOTAL_STEPS - 1) {
      setCompletedSteps((prev) => [...new Set([...prev, wizardStep])]);
      setWizardStep(wizardStep + 1);
    }
  };

  const goBack = () => {
    if (wizardStep > 0) {
      setWizardStep(wizardStep - 1);
    }
  };

  const stepComponents = [
    <StepNameRole key="name" />,
    <StepTools key="tools" />,
    <StepKnowledge key="knowledge" />,
    <StepGuardrails key="guardrails" />,
    <StepTest key="test" />,
    <StepDeploy key="deploy" />,
  ];

  return (
    <div>
      <TopBar title="Agent Builder" subtitle="Create a new AI agent step by step" />

      <div className="p-6 max-w-4xl mx-auto space-y-8">
        {/* Stepper */}
        <WizardStepper
          currentStep={wizardStep}
          onStepClick={setWizardStep}
          completedSteps={completedSteps}
        />

        {/* Step Content */}
        <div className="bg-white rounded-xl border border-surface-200 p-6 shadow-sm">
          {stepComponents[wizardStep]}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={goBack}
            disabled={wizardStep === 0}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>

          <div className="flex gap-3">
            <Button variant="outline">
              <Save className="w-4 h-4" />
              Save Draft
            </Button>
            {wizardStep < TOTAL_STEPS - 1 ? (
              <Button onClick={goNext}>
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button variant="success">
                Finish & Deploy
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
