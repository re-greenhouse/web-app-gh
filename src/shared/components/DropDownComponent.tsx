import { ReactElement } from "react";

type DropdownProps = {
    options: string[];
}

export const Dropdown = ({ options }: DropdownProps): ReactElement => {
    return (
        <div
            id="dropdownHover"
            className="absolute bg-white divide-y rounded-lg shadow w-44"
        >
            {options.map(option => (
                <div
                    key={option}
                    className="px-4 py-2 hover:bg-gray-100"
                    onClick={() => console.log(option)}
                >
                    {option}
                </div>
            ))}
        </div>
    )
}