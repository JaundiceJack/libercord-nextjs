import { FC } from "react";
import type { PercentageProps } from "./types";
import colors from "../../colors";

const Percentage: FC<PercentageProps> = ({ index, activeIndex, entry }) => {
  return (
    <div
      className={`col-span-2 ml-auto mr-4 h-12 w-12 p-0.5 bg-transparent rounded-full relative
      flex justify-center items-center ${
        index === activeIndex
          ? "border-4 border-green-base"
          : "border border-blue-base"
      }`}
    >
      <div
        className={`h-px w-24 absolute left-12 ${
          index === activeIndex ? "bg-green-base" : "bg-blue-base"
        }`}
      ></div>
      <div
        className={`w-12 h-12 rounded-full whitespace-nowrap flex 
        justify-center items-center font-semibold font-jose text-md text-white `}
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
