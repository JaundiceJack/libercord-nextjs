import { FC, useEffect, useRef, useState } from "react";
import { TextEntryProps } from "../types";

const TextEntry: FC<TextEntryProps> = ({
  label = "",
  shortLabel = "",
  value,
  name,
  onChange,
  placeholder,
  type = "text",
  required = true,
  className,
  autoFocus = false,
}) => {
  const [focused, setFocused] = useState(value !== "");
  const [hovered, setHovered] = useState(false);
  const element = useRef<HTMLInputElement>(null);
  const onFocus = () => setFocused(true);
  const onBlur = () => !value && setFocused(false);
  const onHover = () => setHovered(true);
  const onExit = () => setTimeout(() => setHovered(false), 150);

  useEffect(() => {
    value !== "" && setFocused(true);
  }, [value]);

  return (
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
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          autoFocus={autoFocus}
        />
      </div>
    </div>
  );
};

export default TextEntry;
