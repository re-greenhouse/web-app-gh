import { ReactElement } from "react";

type SearchBarProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

export const SearchBar = ({
  value,
  onChange,
  placeholder = "Buscar...",
}: SearchBarProps): ReactElement => {
  return (
    <div className="relative flex w-full">
      <img
        src="/icons/search.svg"
        alt="search"
        className="absolute left-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
      />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="pl-10 p-2 border rounded w-full focus:outline-none focus:ring focus:ring-current-color transition duration-300 ease-in-out"
      />
    </div>
  );
};
