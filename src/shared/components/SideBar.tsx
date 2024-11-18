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
        className="fixed backdrop-blur-xs bg-black bg-opacity-25 inset-0 flex items-center justify-center z-20"
        onClick={onClose}
      ></div>

      <div className="bg-white h-full fixed top-0 right-0 w-full md:w-1/4 z-40 flex flex-col">
        <div className="p-2 flex justify-start">
          <button aria-label="Cerrar" onClick={onClose} className="p-2">
            <img src="icons/close.svg" alt="close" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};
