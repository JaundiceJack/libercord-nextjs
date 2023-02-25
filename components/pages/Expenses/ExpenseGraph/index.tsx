import { FC, useEffect, useState } from "react";
import { capitalize, months } from "../../../../helpers/strings";
import useChartData from "../../../../hooks/useData/useChartData";
import { useReduxDispatch, useReduxSelector } from "../../../../hooks/useRedux";
import { selectDate } from "../../../../redux/date";
import { selectExpense, setExpenseChartType } from "../../../../redux/expense";
import { selectPreferences } from "../../../../redux/preferences";
import BarChart from "../../../elements/charts/Bar";
import Legend from "../../../elements/charts/Legend";
import LineChart from "../../../elements/charts/Line";
import Options from "../../../elements/charts/Options";
import PieChart from "../../../elements/charts/Pie";
import RadarChart from "../../../elements/charts/Radar";
import type { Datum } from "../../../elements/charts/types";
import ContentWindow from "../../../elements/containers/ContentWindow";
import GraphBox from "../../../elements/containers/GraphBox";
import GraphContainer from "../../../elements/containers/GraphContainer";
import GraphLegendBox from "../../../elements/containers/GraphLegendBox";
import GraphOptionsBox from "../../../elements/containers/GraphOptionsBox";
import EmptyListMessage from "../../../elements/misc/emptyListMessage";

const ExpenseGraph: FC = () => {
  const { expenses, expenseViewBy, expenseChartType } =
    useReduxSelector(selectExpense);
  const { date, dataTimeframe } = useReduxSelector(selectDate);
  const { defaultExpenseChartType } = useReduxSelector(selectPreferences);
  const [activeIndex, setActiveIndex] = useState(0);
  const onHover = (data: Datum | null, index: number) => {
    setActiveIndex(index);
  };

  const {
    expenseYearlyData: yearData,
    expenseMonthlyData: monthData,
    expenseLocationData: locationData,
    expenseCategoryData: categoryData,
  } = useChartData();

  const barData =
    dataTimeframe === "all"
      ? yearData
      : dataTimeframe === "year"
      ? monthData
      : expenseViewBy === "category"
      ? categoryData
      : locationData;

  const pieData = expenseViewBy === "category" ? categoryData : locationData;

  const legendData =
    expenseChartType === "pie" || expenseChartType === "radar"
      ? expenseViewBy === "category"
        ? categoryData
        : locationData
      : dataTimeframe === "all"
      ? yearData
      : dataTimeframe === "year"
      ? monthData
      : expenseViewBy === "category"
      ? categoryData
      : locationData;

  const legendTitle =
    expenseChartType === "pie" || expenseChartType === "radar"
      ? expenseViewBy === "category"
        ? "Categories"
        : "Sources"
      : dataTimeframe === "all"
      ? "Years"
      : dataTimeframe === "year"
      ? date.getFullYear().toString()
      : capitalize(months[date.getMonth()]);

  const dispatch = useReduxDispatch();
  useEffect(() => {
    dispatch(setExpenseChartType(defaultExpenseChartType));
  }, []);

  return (
    <ContentWindow>
      {expenses.length === 0 ? (
        <EmptyListMessage listName="expense" />
      ) : (
        <GraphContainer>
          <GraphOptionsBox>
            <Options />
          </GraphOptionsBox>
          <GraphBox>
            {expenseChartType === "pie" ? (
              <PieChart
                data={pieData}
                activeIndex={activeIndex}
                onHover={onHover}
              />
            ) : expenseChartType === "radar" ? (
              <RadarChart
                data={pieData}
                activeIndex={activeIndex}
                onHover={onHover}
              />
            ) : expenseChartType === "line" ? (
              <LineChart
                data={barData}
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
