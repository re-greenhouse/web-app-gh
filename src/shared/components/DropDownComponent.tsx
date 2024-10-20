import { ReactElement } from "react";

type DropdownProps = {
    options: string[];
    onOptionSelect: (option: string) => void;
}

export const Dropdown = ({ options, onOptionSelect }: DropdownProps): ReactElement => {
    return (
        <div
            id="dropdownHover"
            className="absolute bg-white divide-y rounded-lg shadow w-44"
        >
            {options.map(option => (
                <div
                    key={option}
                    className="px-4 py-2 hover:bg-gray-100"
                    onClick={() => onOptionSelect(option)}
                >
                    {option}
                </div>
            ))}
        </div>
    )
}