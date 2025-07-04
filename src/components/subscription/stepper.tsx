'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface StepperProps {
  steps: { id: string; name: string }[];
  currentStepId: string;
}

export default function Stepper({ steps, currentStepId }: StepperProps) {
  const currentStepIndex = steps.findIndex((step) => step.id === currentStepId);

  return (
    <div className="flex justify-between items-center w-full">
      {steps.map((step, index) => {
        const isCompleted = index < currentStepIndex;
        const isActive = index === currentStepIndex;
        return (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center text-center">
              <div
                className={cn(
                  'flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors',
                  isCompleted ? 'bg-primary border-primary text-primary-foreground' :
                  isActive ? 'border-primary' : 'border-gray-300'
                )}
              >
                {isCompleted ? <Check className="w-6 h-6" /> : <span className={cn(isActive && 'text-primary font-bold')}>{index + 1}</span>}
              </div>
              <p className={cn('mt-2 text-sm w-20', isActive || isCompleted ? 'font-semibold text-primary' : 'text-muted-foreground')}>
                {step.name}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'flex-auto border-t-2 transition-colors',
                  isCompleted ? 'border-primary' : 'border-gray-300'
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
