import { FC, useEffect, useState } from "react";
import useChartData from "../../../../hooks/useData/useChartData";
import { useReduxDispatch, useReduxSelector } from "../../../../hooks/useRedux";
import { selectDate } from "../../../../redux/date";
import { selectExpense } from "../../../../redux/expense";
import { selectIncome } from "../../../../redux/income";
import { selectPreferences } from "../../../../redux/preferences";
import {
  selectSummary,
  setSummaryChartType,
  setSummaryExpensesNegative,
} from "../../../../redux/summary";
import BarChart from "../../../elements/charts/Bar";
import Legend from "../../../elements/charts/Legend";
import LineChart from "../../../elements/charts/Line";
import Options from "../../../elements/charts/Options";
import type { Datum } from "../../../elements/charts/types";
import ContentWindow from "../../../elements/containers/ContentWindow";
import GraphBox from "../../../elements/containers/GraphBox";
import GraphContainer from "../../../elements/containers/GraphContainer";
import GraphLegendBox from "../../../elements/containers/GraphLegendBox";
import GraphOptionsBox from "../../../elements/containers/GraphOptionsBox";
import EmptyListMessage from "../../../elements/misc/emptyListMessage";

const SummaryGraph: FC = () => {
  const { incomes } = useReduxSelector(selectIncome);
  const { expenses } = useReduxSelector(selectExpense);
  const { dataTimeframe } = useReduxSelector(selectDate);
  const { defaultSummaryChartType, useNegativeExpenses } =
    useReduxSelector(selectPreferences);
  const { summaryChartType, summaryExpensesNegative } =
    useReduxSelector(selectSummary);

  const [activeIndex, setActiveIndex] = useState(0);
  const onHover = (data: Datum | null, index: number) => {
    setActiveIndex(index);
  };

  const { summaryMonthlyData, summaryYearlyData } = useChartData();

  const negateExpenses = (d: Datum, i: number) =>
    summaryExpensesNegative
      ? {
          ...d,
          expense: -(d?.expense || 0),
        }
      : { ...d };

  const dispatch = useReduxDispatch();
  useEffect(() => {
    dispatch(setSummaryChartType(defaultSummaryChartType));
    dispatch(setSummaryExpensesNegative(useNegativeExpenses));
  }, []);

  return (
    <ContentWindow>
      {incomes.length === 0 && expenses.length === 0 ? (
        <EmptyListMessage listName="" />
      ) : (
        <GraphContainer>
          <GraphOptionsBox>
            <Options />
          </GraphOptionsBox>
          <GraphBox>
            {summaryChartType === "bar" ? (
              <BarChart
                data={
                  dataTimeframe === "all"
                    ? summaryYearlyData.map(negateExpenses)
                    : summaryMonthlyData.map(negateExpenses)
                }
                dataKeys={["income", "expense", "savings", "cash"]}
                activeIndex={activeIndex}
                onHover={onHover}
              />
            ) : (
              <LineChart
                data={
                  dataTimeframe === "all"
                    ? summaryYearlyData.map(negateExpenses)
                    : summaryMonthlyData.map(negateExpenses)
                }
                dataKeys={["income", "expense", "savings", "cash"]}
                activeIndex={activeIndex}
                onHover={onHover}
              />
            )}
          </GraphBox>
          <GraphLegendBox>
            <Legend
              title={""}
              data={[]}
              onHover={onHover}
              activeIndex={activeIndex}
            />
          </GraphLegendBox>
        </GraphContainer>
      )}
    </ContentWindow>
  );
};

export default SummaryGraph;
