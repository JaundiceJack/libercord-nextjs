import { FC } from "react";
import type { PercentageProps } from "./types";
import colors from "../../colors";

const Percentage: FC<PercentageProps> = ({ index, activeIndex, entry }) => {
  return (
    <div
      className={`col-span-1 h-11 w-11 p-0.5 bg-transparent rounded-lg
      flex justify-center items-center ${
        index === activeIndex && "border-2 border-green-400"
      }`}
    >
      <div
        className={`w-9 h-9 rounded-md whitespace-nowrap flex 
        justify-center items-center font-semibold font-jose text-xs `}
        style={{
          boxShadow: "inset 0 0 2px 1px #2a2a30",
          background: `conic-gradient(
            ${colors[index % colors.length]}, 
            ${colors[index % colors.length] + "95"},
            ${colors[index % colors.length]},
            ${colors[index % colors.length] + "95"},
            ${colors[index % colors.length]})`,
        }}
      >
        {`${
          !entry?.percent
            ? ""
            : entry.percent > 0.01
            ? Math.round(entry.percent * 100).toFixed(0) + "%"
            : (entry.percent * 100).toFixed(2) + "%"
        }`}
      </div>
    </div>
  );
};
export default Percentage;
