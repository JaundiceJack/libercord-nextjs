import { FC } from "react";
import { capitalize } from "../../../../../helpers/strings";
import usePath from "../../../../../hooks/usePath";
import {
  useReduxDispatch,
  useReduxSelector,
} from "../../../../../hooks/useRedux";
import {
  IncomeChartTypeOption,
  ExpenseChartTypeOption,
  SummaryChartTypeOption,
} from "../../../../../models/types";
import {
  selectExpense,
  setExpenseChartType,
} from "../../../../../redux/expense";
import { selectIncome, setIncomeChartType } from "../../../../../redux/income";
import {
  selectSummary,
  setSummaryChartType,
} from "../../../../../redux/summary";
import GraphOptionToggle from "../../../input/button/GraphOptionToggle";
import OptionHR from "../OptionHR";

const ChartOption: FC = () => {
  const dispatch = useReduxDispatch();
  const { incomeChartType } = useReduxSelector(selectIncome);
  const { expenseChartType } = useReduxSelector(selectExpense);
  const { summaryChartType } = useReduxSelector(selectSummary);

  const { recordPath: dataType } = usePath();

  const tradeCharts = ["Line", "Bar", "Pie", "Radar"];
  const summaryCharts = ["Line", "Bar"];

  return (
    <>
      <GraphOptionToggle
        className="my-2"
        label="Chart"
        selected={
          dataType === "income"
            ? capitalize(incomeChartType)
            : dataType === "expenses"
            ? capitalize(expenseChartType)
            : capitalize(summaryChartType)
        }
        options={
          dataType === "income" || dataType === "expenses"
            ? tradeCharts
            : summaryCharts
        }
        toggleOption={(type: string) =>
          dataType === "income"
            ? dispatch(
                setIncomeChartType(
                  type.toLocaleLowerCase() as IncomeChartTypeOption
                )
              )
            : dataType === "expenses"
            ? dispatch(
                setExpenseChartType(
                  type.toLocaleLowerCase() as ExpenseChartTypeOption
                )
              )
            : dispatch(
                setSummaryChartType(
                  type.toLocaleLowerCase() as SummaryChartTypeOption
                )
              )
        }
      />
    </>
  );
};

export default ChartOption;
