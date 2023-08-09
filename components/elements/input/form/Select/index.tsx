import { FC, useEffect, useRef, useState } from "react";
import Loading from "../../../misc/loading";
import type { SelectProps } from "../types";

/*
  mantine bug:
  the transition flickers when using value instead of searchValue
*/

const SelectEntry: FC<SelectProps> = ({
  label,
  shortLabel,
  value,
  name,
  loading = false,
  required = true,
  options = [],
  className,
  onChange,
}) => {
  const [focused, setFocused] = useState(value !== "");
  const [hovered, setHovered] = useState(false);
  const element = useRef<HTMLSelectElement>(null);
  const onFocus = () => setFocused(true);
  const onBlur = () => !value && setFocused(false);
  const onHover = () => setHovered(true);
  const onExit = () => setTimeout(() => setHovered(false), 150);

  useEffect(() => {
    value !== "" && setFocused(true);
  }, [value]);

  const sortedData = options.sort((a, b) => {
    const first = typeof a === "string" ? a : a.label || "";
    const second = typeof b === "string" ? b : b.label || "";
    return first > second ? 1 : -1;
  });

  return loading ? (
    <div className="grid grid-cols-3 items-center">
      <p className="text-right text-gray-500 font-bold">{label}</p>
      <Loading className="mb-2 col-span-2" />
    </div>
  ) : (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onExit}
      onClick={() => element?.current?.focus()}
      className={`flex items-center justify-center w-full h-10 relative 
      group rounded-md overflow-hidden text-white ${className}`}
    >
      <div
        className={`flex items-center justify-center h-10 z-10
        transform duration-300 ease-in-out relative ${
          focused ? "w-24 text-sm" : "w-full text-md"
        } group-hover:w-24 group-hover:text-sm border-b-2 border-blue-300`}
      >
        <label className={`whitespace-nowrap absolute transform duration-150`}>
          {(focused || hovered) && shortLabel ? shortLabel : label}
        </label>
      </div>
      <div
        className={`flex items-center justify-center h-10 z-0 
        transform duration-300 ease-in-out ${
          focused ? "w-full opacity-100" : "w-0 opacity-0"
        } group-hover:w-full group-hover:opacity-100 group-hover:block border-b-2 border-blue-400`}
      >
        <select
          ref={element}
          name={name}
          placeholder={`Select or create a ${name}`}
          required={required}
          value={value}
          style={{ scrollbarWidth: "thin" }}
          className={`w-full h-full p-2 removeInputOutline`}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
        >
          {sortedData.map((option, i) => (
            <option
              key={i}
              className={`${
                option.value === "new option"
                  ? "bg-green-base text-black font-semibold"
                  : i % 2 === 0
                  ? "bg-gray-700"
                  : "bg-gray-700/50"
              }`}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectEntry;
