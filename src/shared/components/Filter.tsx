import { ReactElement } from "react";

type FilterProps = {
  label: string;
  onClick: () => void;
  clickedState?: boolean;
  leadingIcon?: string;
  trailingIcon: string;
  color?: string;
};

export const Filter = ({
  label,
  onClick,
  clickedState,
  leadingIcon,
  trailingIcon,
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
        src={trailingIcon}
        alt="arrow"
        className={`w-4 h-4 transition-transform duration-300 ${
          clickedState ? "rotate-180" : ""
        }`}
      />
    </div>
  );
};
