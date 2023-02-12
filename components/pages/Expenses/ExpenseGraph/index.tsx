import { FC, useState } from "react";
import { useReduxSelector } from "../../../../hooks/useRedux";
import { selectExpense } from "../../../../redux/expenseSlice";
import EmptyListMessage from "../../../elements/misc/emptyListMessage";
import PieChart from "../../../elements/charts/Pie";
import BarChart from "../../../elements/charts/Bar";
import Legend from "../../../elements/charts/Legend";
import Options from "../../../elements/charts/Options";
import { selectDate } from "../../../../redux/dateSlice";
import { capitalize, months } from "../../../../helpers/strings";
import type { Datum } from "../../../elements/charts/types";
import useExpenseData from "../useExpenseData";
import ContentWindow from "../../../elements/containers/ContentWindow";
import GraphContainer from "../../../elements/containers/GraphContainer";
import GraphOptionsBox from "../../../elements/containers/GraphOptionsBox";
import GraphBox from "../../../elements/containers/GraphBox";
import GraphLegendBox from "../../../elements/containers/GraphLegendBox";

const ExpenseGraph: FC = () => {
  const { expenses } = useReduxSelector(selectExpense);
  const { date, dataTimeframe } = useReduxSelector(selectDate);
  const [viewBy, setViewBy] = useState<"location" | "category">("category");
  const [chart, setChart] = useState<"pie" | "bar">("pie");
  const [activeIndex, setActiveIndex] = useState(0);
  const onHover = (data: Datum | null, index: number) => {
    setActiveIndex(index);
  };

  const { yearData, monthData, locationData, categoryData } = useExpenseData();

  const barData =
    dataTimeframe === "all"
      ? yearData
      : dataTimeframe === "year"
      ? monthData
      : viewBy === "category"
      ? categoryData
      : locationData;

  const pieData = viewBy === "category" ? categoryData : locationData;

  const legendData =
    chart === "pie"
      ? viewBy === "category"
        ? categoryData
        : locationData
      : dataTimeframe === "all"
      ? yearData
      : dataTimeframe === "year"
      ? monthData
      : viewBy === "category"
      ? categoryData
      : locationData;

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
      {expenses.length === 0 ? (
        <EmptyListMessage listName="expense" />
      ) : (
        <GraphContainer>
          <GraphOptionsBox>
            <Options
              toggleFilter={() =>
                setViewBy(viewBy === "location" ? "category" : "location")
              }
              toggleChart={() => {
                setChart(chart === "pie" ? "bar" : "pie");
              }}
              filters={["location", "category"]}
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

export default ExpenseGraph;
