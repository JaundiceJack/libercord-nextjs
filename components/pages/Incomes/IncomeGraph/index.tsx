import { FC, useState } from "react";
import { useReduxSelector } from "../../../../hooks/useRedux";
import { selectIncome } from "../../../../redux/incomeSlice";
import EmptyListMessage from "../../../elements/misc/emptyListMessage";
import PieChart from "../../../elements/charts/Pie";
import BarChart from "../../../elements/charts/Bar";
import Legend from "../../../elements/charts/Legend";
import Options from "../../../elements/charts/Options";
import { selectDate } from "../../../../redux/dateSlice";
import { capitalize, months } from "../../../../helpers/strings";
import type { Datum } from "../../../elements/charts/types";
import useIncomeData from "../useIncomeData";
import ContentWindow from "../../../elements/containers/ContentWindow";
import GraphOptionsBox from "../../../elements/containers/GraphOptionsBox";
import GraphContainer from "../../../elements/containers/GraphContainer";
import GraphLegendBox from "../../../elements/containers/GraphLegendBox";
import GraphBox from "../../../elements/containers/GraphBox";

const IncomeGraph: FC = () => {
  const { incomes } = useReduxSelector(selectIncome);
  const { date, dataTimeframe } = useReduxSelector(selectDate);
  const [viewBy, setViewBy] = useState<"source" | "category">("category");
  const [chart, setChart] = useState<"pie" | "bar">("pie");
  const [activeIndex, setActiveIndex] = useState(0);
  const onHover = (data: Datum | null, index: number) => {
    setActiveIndex(index);
  };

  const { yearData, monthData, sourceData, categoryData } = useIncomeData();

  const barData =
    dataTimeframe === "all"
      ? yearData
      : dataTimeframe === "year"
      ? monthData
      : viewBy === "category"
      ? categoryData
      : sourceData;

  const pieData = viewBy === "category" ? categoryData : sourceData;

  const legendData =
    chart === "pie"
      ? viewBy === "category"
        ? categoryData
        : sourceData
      : dataTimeframe === "all"
      ? yearData
      : dataTimeframe === "year"
      ? monthData
      : viewBy === "category"
      ? categoryData
      : sourceData;

  const legendTitle =
    chart === "pie"
      ? viewBy === "category"
        ? "Categories"
        : "Sources"
      : dataTimeframe === "all"
      ? "Years"
      : dataTimeframe === "year"
      ? date.getFullYear().toString()
      : capitalize(months[date.getMonth()]);

  return (
    <ContentWindow>
      {incomes.length === 0 ? (
        <EmptyListMessage listName="income" />
      ) : (
        <GraphContainer>
          <GraphOptionsBox>
            <Options
              toggleFilter={() =>
                setViewBy(viewBy === "source" ? "category" : "source")
              }
              toggleChart={() => {
                setChart(chart === "pie" ? "bar" : "pie");
              }}
              filters={["source", "category"]}
              currentFilter={viewBy}
              currentChart={chart}
            />
          </GraphOptionsBox>
          <GraphBox>
            {chart === "pie" ? (
              <PieChart
                data={pieData}
                activeIndex={activeIndex}
                onHover={onHover}
              />
            ) : (
              <BarChart
                data={barData}
                activeIndex={activeIndex}
                onHover={onHover}
              />
            )}
          </GraphBox>
          <GraphLegendBox>
            <Legend
              title={legendTitle}
              data={legendData}
              onHover={onHover}
              activeIndex={activeIndex}
            />
          </GraphLegendBox>
        </GraphContainer>
      )}
    </ContentWindow>
  );
};

export default IncomeGraph;
