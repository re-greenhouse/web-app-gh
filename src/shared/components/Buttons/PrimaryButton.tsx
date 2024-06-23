import { ReactElement, MouseEvent } from "react";

type PrimaryButtonProps = {
  disabled?: boolean;
  type?: "button" | "reset" | "submit";
  label?: string;
  children?: ReactElement | Array<ReactElement>;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary";
};

export const PrimaryButton = ({
  label,
  type,
  disabled,
  children,
  onClick,
  size = "medium",
  variant = "primary",
}: PrimaryButtonProps): ReactElement => {
  let buttonStyles = "py-2 px-4 text-base w-full";
  let variantStyles = variant === "primary" ? "bg-primary text-light" : "bg-light text-primary";
  if (size === "small") {
    buttonStyles = "py-2 px-2 text-sm w-full md:w-1/4 lg:w-1/6";
  } else if (size === "large") {
    buttonStyles = "py-3 px-6 text-lg w-full";
  }

  return (
    <button
      onClick={(e) => onClick ? onClick(e) : undefined}
      disabled={disabled}
      type={type}
      className={`flex justify-center font-semibold rounded-xl ${buttonStyles} ${variantStyles}`}
    >
      {label ?? children ?? ""}
    </button>
  );
};