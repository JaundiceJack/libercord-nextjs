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
      className={`grid grid-cols-2 gap-4 mb-4 justify-center items-center overflow-hidden ${className}`}
    >
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
