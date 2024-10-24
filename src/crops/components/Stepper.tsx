import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

type StepperProps = {
  steps: string[];
  currentStep: string;
  phaseToRoute: { [key: string]: string };
  cropId: string;
};

export const Stepper = ({
  steps,
  currentStep,
  phaseToRoute,
  cropId,
}: StepperProps): ReactElement => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center w-full p-4">
      {steps.map((step, index) => {
        const routeKey = phaseToRoute[step];
        const isCompleted = steps.indexOf(currentStep) > index;
        const isCurrent = routeKey === currentStep;

        return (
          <div key={index} className="flex-1 flex items-center text-white">
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
                    src="/public/icons/check.svg"
                    alt="Completed"
                    className="w-4 h-4"
                  />
                ) : (
                  index + 1
                )}
              </div>
              <div
                className={`mt-1 ${isCurrent ? "font-bold" : "font-regular"}`}
              >
                {step}
              </div>
            </div>
            {index !== steps.length - 1 && (
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
