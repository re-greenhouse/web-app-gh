import { ChangeEvent, HTMLInputTypeAttribute, ReactElement } from "react";

interface TextFieldProps {
  id: string;
  type: HTMLInputTypeAttribute;
  label: string;
  placeholder?: string;
  trailingIcon?: ReactElement;
  value: string;
  onValueChange: (value: string) => void;
}

export const TextField = ({
  id,
  type,
  label,
  placeholder,
  trailingIcon,
  value,
  onValueChange,
}: TextFieldProps): ReactElement => {
  return (
    <>
      <label
        htmlFor={id}
        className="block mb-1 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <div className="relative mb-3">
        {trailingIcon !== undefined ? (
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            {trailingIcon}
          </div>
        ) : null}
        <input
          value={value}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            onValueChange(event.target.value)
          }
          type={type}
          id={id}
          autoComplete="off"
          name={id}
          className={`
            bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ${
              trailingIcon !== undefined && "ps-10"
            } p-2.5
          `}
          placeholder={placeholder ?? ""}
        />
      </div>
    </>
  );
};
