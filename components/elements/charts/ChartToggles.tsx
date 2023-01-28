import { FC } from "react";
import { capitalize } from "../../../helpers/strings";

interface ChartToggleProps {
  toggleFilter: () => void;
  toggleChart: () => void;
  filters: ("source" | "category" | "location")[];
  currentFilter: "source" | "category" | "location";
  currentChart: "bar" | "pie";
}

const ChartToggle: FC<ChartToggleProps> = ({
  toggleFilter,
  toggleChart,
  filters,
  currentFilter,
  currentChart = "pie",
}) => {
  return (
    <div className="flex flex-row w-full items-center justify-center">
      <button
        onClick={toggleFilter}
        className={`my-5 py-2 w-full md:w-56 cursor-pointer bg-gray-700 md:rounded-l-full 
      font-jose text-white font-semibold group`}
      >
        <p className="transform duration-150 group-hover:scale-103">{`View by ${
          currentFilter === filters[0]
            ? capitalize(filters[1])
            : capitalize(filters[0])
        }`}</p>
      </button>
      <div className="bg-black w-1 h-full" />
      <button
        onClick={toggleChart}
        className={`my-5 py-2 w-full md:w-56 cursor-pointer bg-gray-700 md:rounded-r-full 
      font-jose text-white font-semibold group`}
      >
        <p className="transform duration-150 group-hover:scale-103">{`View ${
          currentChart === "pie" ? "Bar" : "Pie"
        } Chart`}</p>
      </button>
    </div>
  );
};

export default ChartToggle;
