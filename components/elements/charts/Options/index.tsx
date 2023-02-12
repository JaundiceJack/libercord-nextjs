import { FC } from "react";
import { capitalize } from "../../../../helpers/strings";
import GraphOptionButton from "../../input/button/GraphOptionButton";
import BgCSS from "../../../../styles/Background.module.css";

import type { OptionsProps } from "./types";

const Options: FC<OptionsProps> = ({
  toggleFilter,
  toggleChart,
  filters,
  currentFilter,
  currentChart = "pie",
}) => {
  return (
    <div className={`flex flex-col p-2 py-6 ${BgCSS.sidebar} w-full h-full`}>
      <GraphOptionButton
        label={`View ${currentChart === "pie" ? "Bar" : "Pie"} Chart`}
        onClick={toggleChart}
        className={currentChart === "pie" ? "" : "rounded-b-lg"}
      />

      {currentChart === "pie" && (
        <>
          <div className="w-full bg-gray-900 h-px" />
          <GraphOptionButton
            label={`View by ${
              currentFilter === filters[0]
                ? capitalize(filters[1])
                : capitalize(filters[0])
            }`}
            onClick={toggleFilter}
            pos="bottom"
          />
        </>
      )}
    </div>
  );
};

export default Options;
