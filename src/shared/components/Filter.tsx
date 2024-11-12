import { ReactElement } from "react";

type FilterProps = {
  label: string;
  onClick: () => void;
  leadingIcon?: ReactElement;
  color?: string;
};

export const Filter = ({
  label,
  onClick,
  leadingIcon,
  color
}: FilterProps): ReactElement => {
  return (
    <div
      className="inline-flex items-center gap-3 cursor-pointer"
      onClick={onClick}
    >
      <p style={{ color: color || "#898989" }}>{label}</p>
      {leadingIcon}
    </div>
  );
};
