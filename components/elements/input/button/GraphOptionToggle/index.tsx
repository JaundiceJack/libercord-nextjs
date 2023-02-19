import { FC } from "react";
import { GraphOptionToggleProps } from "./types";

const GraphOptionToggle: FC<GraphOptionToggleProps> = ({
  label,
  selected,
  options,
  toggleOption,
  className = "",
}) => {
  return (
    <div
      className={`grid grid-cols-3 items-center overflow-hidden ${className}`}
    >
      <div
        className={`row-span-5 col-span-1 flex items-center justify-center h-full text-white`}
      >
        <p className={`text-center font-bold w-16`}>{label}:</p>
      </div>
      {options.map((option, index) => (
        <button
          onClick={() => toggleOption(option)}
          key={index}
          className={`group flex flex-col items-center justify-center w-full h-full p-1
              text-center`}
        >
          <p
            className={`rounded-full text-sm py-1 px-4 
            transform duration-150 group-hover:scale-103 ${
              selected === option ? "text-white" : "text-neutral-500"
            }`}
          >
            {option}
          </p>

          {selected === option ? (
            <div className={`h-0.5 rounded-full w-3/4 bg-green-500`} />
          ) : (
            <div
              className={`h-0.5 rounded-full w-3/4 bg-green-800 
          opacity-0 transform duration-150 group-hover:opacity-100`}
            />
          )}
        </button>
      ))}
    </div>
  );
};

export default GraphOptionToggle;
