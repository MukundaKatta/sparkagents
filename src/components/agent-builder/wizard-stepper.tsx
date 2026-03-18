'use client';

import { cn } from '@/utils/cn';
import { Check, Bot, Wrench, BookOpen, Shield, FlaskConical, Rocket } from 'lucide-react';

const steps = [
  { id: 0, label: 'Name & Role', icon: Bot },
  { id: 1, label: 'Tools', icon: Wrench },
  { id: 2, label: 'Knowledge', icon: BookOpen },
  { id: 3, label: 'Guardrails', icon: Shield },
  { id: 4, label: 'Test', icon: FlaskConical },
  { id: 5, label: 'Deploy', icon: Rocket },
];

interface WizardStepperProps {
  currentStep: number;
  onStepClick: (step: number) => void;
  completedSteps: number[];
}

export function WizardStepper({ currentStep, onStepClick, completedSteps }: WizardStepperProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id);
          const isCurrent = currentStep === step.id;
          const isClickable = isCompleted || step.id <= Math.max(...completedSteps, 0) + 1;

          return (
            <div key={step.id} className="flex items-center flex-1 last:flex-none">
              <button
                onClick={() => isClickable && onStepClick(step.id)}
                disabled={!isClickable}
                className={cn(
                  'flex flex-col items-center gap-2 relative group',
                  isClickable ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
                )}
              >
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300',
                    isCurrent
                      ? 'bg-spark-600 text-white shadow-lg shadow-spark-200 scale-110'
                      : isCompleted
                      ? 'bg-success-500 text-white'
                      : 'bg-surface-100 text-surface-400 group-hover:bg-surface-200'
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </div>
                <span
                  className={cn(
                    'text-xs font-medium whitespace-nowrap',
                    isCurrent ? 'text-spark-600' : isCompleted ? 'text-success-700' : 'text-surface-400'
                  )}
                >
                  {step.label}
                </span>
              </button>

              {index < steps.length - 1 && (
                <div className="flex-1 mx-3 mt-[-20px]">
                  <div
                    className={cn(
                      'h-0.5 rounded-full transition-colors duration-300',
                      isCompleted ? 'bg-success-500' : 'bg-surface-200'
                    )}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
