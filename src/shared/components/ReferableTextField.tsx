import {forwardRef, HTMLInputTypeAttribute, ReactElement} from "react";

interface ReferableTextFieldProps {
  id: string;
  type: HTMLInputTypeAttribute;
  label: string;
  placeholder?: string;
  TrailingIcon?: ReactElement;
}

export const ReferableTextField = forwardRef<HTMLInputElement, ReferableTextFieldProps>(
  ({id, label, placeholder, type, TrailingIcon}: ReferableTextFieldProps, ref): ReactElement => {
  return (
    <>
      <label
        htmlFor={id}
        className="block mb-1 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <div className="relative mb-3">
        {
          TrailingIcon !== undefined
            ?
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              {TrailingIcon}
            </div>
            : null
        }
        <input
          ref={ref}
          type={type}
          id={id}
          className={`
            bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ${TrailingIcon !== undefined && "ps-10"} p-2.5
          `}
          placeholder={placeholder ?? ""}
        />
      </div>
    </>
  );
});