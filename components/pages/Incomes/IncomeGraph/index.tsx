import { FC, useEffect, useState } from "react";
import { useReduxDispatch, useReduxSelector } from "../../../../hooks/useRedux";
import { selectIncome, setIncomeChartType } from "../../../../redux/income";
import EmptyListMessage from "../../../elements/misc/emptyListMessage";
import PieChart from "../../../elements/charts/Pie";
import BarChart from "../../../elements/charts/Bar";
import Legend from "../../../elements/charts/Legend";
import Options from "../../../elements/charts/Options";
import { selectDate } from "../../../../redux/date";
import { capitalize, months } from "../../../../helpers/strings";
import type { Datum } from "../../../elements/charts/types";
import useChartData from "../../../../hooks/useData/useChartData";
import ContentWindow from "../../../elements/containers/ContentWindow";
import GraphOptionsBox from "../../../elements/containers/GraphOptionsBox";
import GraphContainer from "../../../elements/containers/GraphContainer";
import GraphLegendBox from "../../../elements/containers/GraphLegendBox";
import GraphBox from "../../../elements/containers/GraphBox";
import LineChart from "../../../elements/charts/Line";
import RadarChart from "../../../elements/charts/Radar";
import { selectPreferences } from "../../../../redux/preferences";

const IncomeGraph: FC = () => {
  const { incomes, incomeChartType, incomeViewBy } =
    useReduxSelector(selectIncome);
  const { date, dataTimeframe } = useReduxSelector(selectDate);
  const { defaultIncomeChartType } = useReduxSelector(selectPreferences);
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
    incomeChartType === "pie" || incomeChartType === "radar"
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
    incomeChartType === "pie" || incomeChartType === "radar"
      ? incomeViewBy === "category"
        ? "Categories"
        : "Sources"
      : dataTimeframe === "all"
      ? "Years"
      : dataTimeframe === "year"
      ? date.getFullYear().toString()
      : capitalize(months[date.getMonth()]);

  const dispatch = useReduxDispatch();
  useEffect(() => {
    dispatch(setIncomeChartType(defaultIncomeChartType));
  }, []);

  return (
    <ContentWindow>
      {incomes.length === 0 ? (
        <EmptyListMessage listName="income" />
      ) : (
        <GraphContainer>
          <GraphOptionsBox>
            <Options />
          </GraphOptionsBox>
          <GraphBox>
            {incomeChartType === "pie" ? (
              <PieChart
                data={pieData}
                activeIndex={activeIndex}
                onHover={onHover}
              />
            ) : incomeChartType === "radar" ? (
              <RadarChart
                data={pieData}
                activeIndex={activeIndex}
                onHover={onHover}
              />
            ) : incomeChartType === "line" ? (
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

export default IncomeGraph;
