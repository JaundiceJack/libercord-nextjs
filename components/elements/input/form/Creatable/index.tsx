import { FC, useEffect, useMemo, useRef, useState } from "react";
import { CreatableProps } from "./types";
import { MdKeyboardArrowRight } from "react-icons/md";
import { capitalize } from "../../../../../helpers/strings";

/**
 * goal here is make it more like react-select
 * where it's always a text entry
 * clicking/focusing shows the options list as a scrollable div
 *
 *
 */

const Creatable: FC<CreatableProps> = ({
  name,
  value,
  onTextEntry,
  setValue,
  label,
  type = "text",
  options,
  loading,
  shortLabel,
  placeholder,
  autoFocus,
  className,
  required,
  disabled,
}) => {
  const [focused, setFocused] = useState(value !== "");
  const [hovered, setHovered] = useState(false);
  const [toggled, setToggled] = useState(false);
  const element = useRef<HTMLInputElement>(null);
  const onFocus = () => setFocused(true);
  const onBlur = () => !value && setFocused(false);
  const onHover = () => setHovered(true);
  const onExit = () => setTimeout(() => setHovered(false), 150);

  const [mouseInDropDown, setMouseInDropDown] = useState(false);

  // Ensure the input is shown if data is already present
  useEffect(() => {
    value !== "" && setFocused(true);
  }, [value]);

  // Sort data by label alphabetically
  const sortedData = useMemo(
    () =>
      options?.sort((a, b) => {
        const first = typeof a === "string" ? a : a.label || "";
        const second = typeof b === "string" ? b : b.label || "";
        return first > second ? 1 : -1;
      }),
    [options]
  );

  useEffect(() => {
    if (
      options?.findIndex(
        (option) => option.value === value.trim().toLowerCase()
      ) !== -1
    ) {
      setToggled(false);
    } else setToggled(true);
  }, [value]);

  return (
    <div
      onBlur={() => {
        !mouseInDropDown && setToggled(false);
      }}
      onMouseEnter={onHover}
      onMouseLeave={onExit}
      onClick={() => {
        setFocused(true);
        setToggled(!toggled);
        element?.current?.focus();
      }}
      className={`flex items-center justify-center w-full h-10 relative group rounded-md text-white ${className}`}
    >
      <div
        className={`flex items-center justify-center h-10 transform duration-300 ease-in-out relative ${
          focused ? "w-24 text-sm" : "w-full text-md"
        } group-hover:w-24 group-hover:text-sm border-b-2 border-blue-300`}
      >
        <label className={`whitespace-nowrap absolute transform duration-150`}>
          {(focused || hovered) && shortLabel ? shortLabel : label}
        </label>
      </div>
      <div
        className={`flex items-center justify-center h-10 relative transform duration-300 ease-in-out ${
          focused ? "w-full opacity-100" : "w-0 opacity-0"
        } group-hover:w-full group-hover:opacity-100 group-hover:block border-b-2 border-blue-base`}
      >
        <input
          className={`w-full h-full p-2 removeInputOutline`}
          type={type}
          ref={element}
          name={name}
          value={value}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onTextEntry}
          placeholder={placeholder}
          required={required}
          autoFocus={autoFocus}
        />
      </div>
      <MdKeyboardArrowRight
        className={`absolute right-3 transform duration-150 pointer-events-none ${
          toggled ? "rotate-90" : "rotate-0"
        }`}
      />

      <div
        onMouseEnter={() => setMouseInDropDown(true)}
        onMouseLeave={() => setMouseInDropDown(false)}
        tabIndex={-1}
        style={{ scrollbarWidth: "thin" }}
        className={`absolute left-0 top-10 w-full z-50 
        overflow-y-scroll duration-200 ${
          toggled ? "h-56 border-b-4 border-blue-base" : "h-0"
        }`}
      >
        {sortedData?.map((option, i) => (
          <div
            onClick={() => {
              setValue(capitalize(option.value));
            }}
            className={`p-1 cursor-pointer overflow-x-clip overflow-ellipsis hover:bg-gray-600 ${
              option.value === value
                ? "bg-gray-500"
                : i % 2 === 0
                ? "bg-gray-700"
                : "bg-gray-800"
            }`}
            key={i}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Creatable;
