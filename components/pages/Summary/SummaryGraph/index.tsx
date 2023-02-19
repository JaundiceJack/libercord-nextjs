import { FC, useState } from "react";
import useChartData from "../../../../hooks/useData/useChartData";
import { useReduxSelector } from "../../../../hooks/useRedux";
import { selectDate } from "../../../../redux/dateSlice";
import { selectExpense } from "../../../../redux/expenseSlice";
import { selectIncome } from "../../../../redux/incomeSlice";
import { selectSummary } from "../../../../redux/summarySlice";
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
  const { summarySequentialChartType, summaryExpensesNegative } =
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
            {summarySequentialChartType === "bar" ? (
              <BarChart
                data={
                  dataTimeframe === "all"
                    ? summaryYearlyData.map(negateExpenses)
                    : summaryMonthlyData.map(negateExpenses)
                }
                dataKeys={["income", "expense", "savings"]}
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
                dataKeys={["income", "expense", "savings"]}
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
