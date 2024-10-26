import { ReactElement } from "react";

type FilterProps = {
  label: string;
  onClick: () => void;
  showArrow: boolean;
  leadingIcon?: string;
  color?: string;
};

export const Filter = ({
  label,
  onClick,
  showArrow,
  leadingIcon,
  color,
}: FilterProps): ReactElement => {
  return (
    <div
      className="inline-flex items-center gap-3 cursor-pointer"
      onClick={onClick}
    >
      {leadingIcon && <img src={leadingIcon} alt="icon" className="w-6 h-6" />}
      <p style={{ color: color || "#898989" }}>{label}</p>
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
