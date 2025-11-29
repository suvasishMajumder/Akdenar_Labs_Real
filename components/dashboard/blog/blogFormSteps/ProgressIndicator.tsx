// components/ProgressIndicator.tsx
import { ProgressStep } from '@/types/blog';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProgressIndicatorProps {
  steps: ProgressStep[];
  currentStep: number;
}

const ProgressIndicator = ({ steps, currentStep }: ProgressIndicatorProps) => {
  const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="w-full px-6 py-4">
      <div className="flex items-center justify-between relative">
        {/* Background track */}
        <div className="absolute top-4 left-10 right-10 h-1.5 bg-gray-100 rounded-full" />

        {/* Progress fill */}
        <div
          className="absolute top-4 left-4 h-1.5 bg-linear-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `calc(${progressPercentage}% - 40px)` }}
        />

        {steps.map((step) => {
          const isCompleted = step.completed;
          const isCurrent = currentStep === step.number;
          const isUpcoming = currentStep < step.number;

          return (
            <div key={step.number} className="flex flex-col items-center relative z-10">
              {/* Step circle */}
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 shadow-sm",
                  "hover:scale-110 hover:shadow-md",
                  isCompleted && "bg-blue-600 border-blue-600 text-white shadow-md",
                  isCurrent && "border-blue-600 bg-white text-blue-600 shadow-lg scale-110",
                  isUpcoming && "border-gray-300 bg-white text-gray-400"
                )}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span className={cn(
                    "text-xs font-semibold",
                    isCurrent && "text-blue-600",
                    isUpcoming && "text-gray-400"
                  )}>
                    {step.number}
                  </span>
                )}
              </div>

              {/* Step title */}
              <span
                className={cn(
                  "mt-2 text-xs font-medium transition-all duration-300 whitespace-nowrap",
                  isCompleted && "text-blue-600 font-semibold",
                  isCurrent && "text-blue-600 font-semibold scale-105",
                  isUpcoming && "text-gray-500"
                )}
              >
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressIndicator;