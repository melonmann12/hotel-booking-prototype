import { Check } from "lucide-react";

interface BookingStepperProps {
  currentStep: 1 | 2 | 3;
}

const STEPS = [
  { number: 1, label: "Thông tin khách" },
  { number: 2, label: "Thanh toán" },
  { number: 3, label: "Xác nhận" },
];

export default function BookingStepper({ currentStep }: BookingStepperProps) {
  return (
    <div className="mb-xl">
      <div className="flex items-center justify-between relative">
        {/* Connector line */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1px] bg-outline-variant/30 z-0"></div>

        {STEPS.map((step) => {
          const isCompleted = step.number < currentStep;
          const isActive = step.number === currentStep;
          const isFuture = step.number > currentStep;

          return (
            <div
              key={step.number}
              className="relative z-10 flex flex-col items-center"
            >
              {/* Circle */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-button text-button mb-sm transition-colors ${
                  isCompleted
                    ? "bg-primary-container text-on-primary"
                    : isActive
                      ? "bg-primary-container text-on-primary"
                      : "bg-surface border border-outline-variant text-on-surface-variant"
                }`}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : (
                  step.number
                )}
              </div>

              {/* Label */}
              <span
                className={`font-label text-label uppercase transition-colors ${
                  isCompleted || isActive
                    ? "text-primary-container"
                    : "text-on-surface-variant"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
