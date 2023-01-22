import { FC } from "react";
import { Datum } from "../Pie";

interface LegendPercentageProps {
  index: number;
  activeIndex: number;
  colors: string[];
  entry: Datum;
}
const LegendPercentage: FC<LegendPercentageProps> = ({
  index,
  activeIndex,
  colors,
  entry,
}) => {
  return (
    <div
      className={`col-span-1 h-11 w-11 p-0.5 bg-transparent 
    rounded-lg flex justify-center items-center ${
      index === activeIndex && "border-2 border-green-400"
    }`}
    >
      <div
        className={`w-9 h-9 rounded-md whitespace-nowrap flex 
      justify-center items-center font-semibold font-jose text-xs `}
        style={{
          background: `conic-gradient(
            ${colors[index % colors.length]}, 
            ${colors[index % colors.length] + "95"},
            ${colors[index % colors.length]},
            ${colors[index % colors.length] + "95"},
            ${colors[index % colors.length]})`,
        }}
      >
        {`${
          entry?.percent &&
          (entry.percent > 0.01
            ? Math.round(entry.percent * 100).toFixed(0)
            : (entry.percent * 100).toFixed(2))
        }${entry?.percent && "%"}`}
      </div>
    </div>
  );
};
export default LegendPercentage;
