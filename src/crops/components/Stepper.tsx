import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

type StepperProps = {
  steps: { [key: string]: string };
  currentStep: string;
  cropId: string;
};

export const Stepper = ({
  steps,
  currentStep,
  cropId,
}: StepperProps): ReactElement => {
  const navigate = useNavigate();

  const stepNames = Object.keys(steps);

  const currentStepIndex = stepNames.findIndex(
    (step) => steps[step] === currentStep
  );

  return (
    <div className="flex items-center w-full p-4">
      {stepNames.map((step, index) => {
        const routeKey = steps[step];
        const isCompleted = index < currentStepIndex;
        const isCurrent = index === currentStepIndex;

        return (
          <div
            key={index}
            className={`flex items-center text-white ${
              index === stepNames.length - 1 ? "" : "flex-1"
            }`}
          >
            <div
              className="flex flex-col items-center relative cursor-pointer"
              onClick={() => navigate(`/records/${cropId}/${routeKey}`)}
            >
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full ${
                  isCompleted || isCurrent
                    ? "bg-[#7DA257]"
                    : "border-2 border-white"
                } z-10`}
              >
                {isCompleted ? (
                  <img
                    src="/icons/check.svg"
                    alt="Completed"
                    className="w-4 h-4"
                  />
                ) : (
                  index + 1
                )}
              </div>
              <div
                className={`hidden md:block mt-1 ${
                  isCurrent ? "font-bold" : "font-regular"
                }`}
              >
                {step}
              </div>
            </div>
            {index !== stepNames.length - 1 && (
              <div
                className={`hidden md:block flex-1 h-[2px] ${
                  isCompleted ? "bg-[#7DA257]" : "bg-white"
                } mx-2`}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
};
