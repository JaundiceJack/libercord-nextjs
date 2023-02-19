import { FC, useState } from "react";
import { useReduxDispatch, useReduxSelector } from "../../../../hooks/useRedux";
import {
  selectIncome,
  setIncomeGraph,
  setIncomeViewBy,
} from "../../../../redux/incomeSlice";
import EmptyListMessage from "../../../elements/misc/emptyListMessage";
import PieChart from "../../../elements/charts/Pie";
import BarChart from "../../../elements/charts/Bar";
import Legend from "../../../elements/charts/Legend";
import Options from "../../../elements/charts/Options";
import { selectDate } from "../../../../redux/dateSlice";
import { capitalize, months } from "../../../../helpers/strings";
import type { Datum } from "../../../elements/charts/types";
import useChartData from "../../../../hooks/useData/useChartData";
import ContentWindow from "../../../elements/containers/ContentWindow";
import GraphOptionsBox from "../../../elements/containers/GraphOptionsBox";
import GraphContainer from "../../../elements/containers/GraphContainer";
import GraphLegendBox from "../../../elements/containers/GraphLegendBox";
import GraphBox from "../../../elements/containers/GraphBox";

const IncomeGraph: FC = () => {
  const { incomes, incomeGraph, incomeViewBy } = useReduxSelector(selectIncome);
  const { date, dataTimeframe } = useReduxSelector(selectDate);
  const [activeIndex, setActiveIndex] = useState(0);
  const onHover = (data: Datum | null, index: number) => {
    setActiveIndex(index);
  };

  const {
    incomeYearlyData: yearData,
    incomeMonthlyData: monthData,
    incomeSourceData: sourceData,
    incomeCategoryData: categoryData,
  } = useChartData();

  const barData =
    dataTimeframe === "all"
      ? yearData
      : dataTimeframe === "year"
      ? monthData
      : incomeViewBy === "category"
      ? categoryData
      : sourceData;

  const pieData = incomeViewBy === "category" ? categoryData : sourceData;

  const legendData =
    incomeGraph === "pie"
      ? incomeViewBy === "category"
        ? categoryData
        : sourceData
      : dataTimeframe === "all"
      ? yearData
      : dataTimeframe === "year"
      ? monthData
      : incomeViewBy === "category"
      ? categoryData
      : sourceData;

  const legendTitle =
    incomeGraph === "pie"
      ? incomeViewBy === "category"
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
            <Options dataType="income" />
          </GraphOptionsBox>
          <GraphBox>
            {incomeGraph === "pie" ? (
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
