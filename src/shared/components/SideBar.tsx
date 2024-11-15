import React, { ReactNode } from "react";

type SideBarProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export const SideBar = ({
  isOpen,
  onClose,
  children,
}: SideBarProps): React.ReactElement | null => {
  if (!isOpen) return null;

  return (
    <div>
      <div
        className="absolute backdrop-blur-xs bg-black bg-opacity-25 inset-0 flex items-center justify-center z-20"
        onClick={onClose}
      ></div>

      <div className="bg-white h-full absolute top-0 right-0 w-full md:w-1/4 z-40 flex flex-col">
        <div className="p-2 flex justify-start">
          <button aria-label="Cerrar" onClick={onClose} className="p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-4 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};
