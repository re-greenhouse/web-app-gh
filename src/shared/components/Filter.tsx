import { ReactElement } from "react";

type FilterProps = {
  label: string;
  onClick: () => void;
  showArrow: boolean;
  leadingIcon?: string;
};

export const Filter = ({
  label,
  onClick,
  showArrow,
  leadingIcon,
}: FilterProps): ReactElement => {
  return (
    <div className="flex gap-3 items-center cursor-pointer" onClick={onClick}>
      {leadingIcon && <img src={leadingIcon} alt="icon" className="w-6 h-6" />}
      <p className="text-secondary">{label}</p>
      <img
        src="/icons/downArrow.svg"
        alt="arrow"
        className={`w-4 h-4 transition-transform duration-300 ${
          showArrow ? "rotate-180" : ""
        }`}
      />
    </div>
  );
};
