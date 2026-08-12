import React from 'react';
import { Check, Truck, CreditCard, ShieldCheck } from 'lucide-react';

interface CheckoutProgressBarProps {
  currentStep: number; // 1: Shipping, 2: Payment, 3: Review
  onStepClick?: (step: number) => void;
}

export const CheckoutProgressBar: React.FC<CheckoutProgressBarProps> = ({ currentStep, onStepClick }) => {
  const steps = [
    { id: 1, name: 'Shipping & Delivery', icon: Truck, desc: 'RTO & Contact Info' },
    { id: 2, name: 'Payment Method', icon: CreditCard, desc: 'UPI, Card, EMI' },
    { id: 3, name: 'Review & Confirm', icon: ShieldCheck, desc: 'Final Verification' }
  ];

  return (
    <div className="w-full max-w-3xl mx-auto my-6 px-2">
      <div className="relative flex items-center justify-between">
        {/* Background Connecting Line */}
        <div className="absolute top-1/2 left-10 right-10 -translate-y-1/2 h-1 bg-zinc-800 rounded-full z-0" />

        {/* Active Progress Line */}
        <div
          className="absolute top-1/2 left-10 -translate-y-1/2 h-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full z-0 transition-all duration-300"
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`
          }}
        />

        {steps.map((step) => {
          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;
          const Icon = step.icon;

          return (
            <div
              key={step.id}
              onClick={() => {
                if (onStepClick && step.id <= currentStep) {
                  onStepClick(step.id);
                }
              }}
              className={`relative z-10 flex flex-col items-center group cursor-pointer ${
                step.id <= currentStep ? 'pointer-events-auto' : 'pointer-events-none'
              }`}
            >
              {/* Circle Icon */}
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm transition-all duration-300 border-2 ${
                  isCompleted
                    ? 'bg-amber-500 border-amber-500 text-black shadow-lg shadow-amber-500/20'
                    : isActive
                    ? 'bg-zinc-900 border-orange-500 text-orange-400 shadow-xl shadow-orange-500/30 scale-110'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-500'
                }`}
              >
                {isCompleted ? <Check className="w-6 h-6 stroke-[3]" /> : <Icon className="w-5 h-5" />}
              </div>

              {/* Step Labels */}
              <div className="mt-2 text-center">
                <span
                  className={`text-xs font-black uppercase tracking-wider block ${
                    isActive ? 'text-orange-400' : isCompleted ? 'text-white' : 'text-zinc-500'
                  }`}
                >
                  Step {step.id}: {step.name}
                </span>
                <span className="text-[10px] text-zinc-400 hidden sm:block font-medium">
                  {step.desc}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
