import {ReactElement, MouseEvent} from "react";

type PrimaryButtonProps = {
  disabled?: boolean;
  type?: "button" | "reset" | "submit";
  label?: string;
  children?: ReactElement | Array<ReactElement>;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const PrimaryButton = ({label, type, disabled, children, onClick}: PrimaryButtonProps): ReactElement => {
  return (
    <button
      onClick={(e) => onClick ? onClick(e) : undefined}
      disabled={disabled}
      type={type}
      className="flex justify-center font-semibold text-light bg-primary rounded-xl py-2 px-4 w-full"
    >
      {label ?? children ?? ""}
    </button>
  );
};