import { FaSearchLocation } from "react-icons/fa";

import { cn } from "../utils/cn";

type SearchBoxProps = {
  className?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
};

export default function SearchBox({
  value,
  onChange,
  onSubmit,
  className,
}: SearchBoxProps) {
  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "flex relative items-center justify-between h-10",
        className
      )}
    >
      <input
        type="text"
        onChange={onChange}
        value={value}
        className="px-4 py-2 w-[230px] border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500 h-full"
        placeholder="Search location..."
      />
      <button className="px-4 py-[9px] bg-blue-500 text-white rounded-r-md focus:outline-none hover:bg-blue-600 h-full">
        <FaSearchLocation />
      </button>
    </form>
  );
}
