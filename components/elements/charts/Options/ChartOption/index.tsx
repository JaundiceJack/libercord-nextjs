import { FC } from "react";
import { capitalize } from "../../../../../helpers/strings";
import usePath from "../../../../../hooks/usePath";
import {
  useReduxDispatch,
  useReduxSelector,
} from "../../../../../hooks/useRedux";
import {
  selectExpense,
  setExpenseChartMode,
  setExpenseDistributionChartType,
  setExpenseSequentialChartType,
} from "../../../../../redux/expenseSlice";
import {
  selectIncome,
  setIncomeChartMode,
  setIncomeDistributionChartType,
  setIncomeSequentialChartType,
} from "../../../../../redux/incomeSlice";
import {
  selectSummary,
  setSummarySequentialChartType,
} from "../../../../../redux/summarySlice";
import {
  DistributionChartOption,
  SequentialChartOption,
} from "../../../../../redux/types";
import GraphOptionButton from "../../../input/button/GraphOptionButton";
import GraphOptionToggle from "../../../input/button/GraphOptionToggle";
import OptionHR from "../OptionHR";

const ChartOption: FC = () => {
  const dispatch = useReduxDispatch();
  const {
    incomeChartMode,
    incomeSequentialChartType,
    incomeDistributionChartType,
  } = useReduxSelector(selectIncome);
  const {
    expenseChartMode,
    expenseSequentialChartType,
    expenseDistributionChartType,
  } = useReduxSelector(selectExpense);
  const { summarySequentialChartType } = useReduxSelector(selectSummary);

  const { recordPath: dataType } = usePath();

  const sequentialCharts = ["Line", "Bar"]; // ["Line", "Bar", "Area"];
  const distributionCharts = ["Pie", "Radar"]; // ["Pie", "Radar", "Tree"];

  return (
    <>
      <GraphOptionToggle
        className="my-2"
        label="Chart"
        selected={
          dataType === "income"
            ? incomeChartMode === "sequential"
              ? capitalize(incomeSequentialChartType)
              : capitalize(incomeDistributionChartType)
            : dataType === "expenses"
            ? expenseChartMode === "sequential"
              ? capitalize(expenseSequentialChartType)
              : capitalize(expenseDistributionChartType)
            : capitalize(summarySequentialChartType)
        }
        options={
          dataType === "income"
            ? incomeChartMode === "sequential"
              ? sequentialCharts
              : distributionCharts
            : dataType === "expenses"
            ? expenseChartMode === "sequential"
              ? sequentialCharts
              : distributionCharts
            : sequentialCharts
        }
        toggleOption={(type: string) =>
          dataType === "income"
            ? incomeChartMode === "sequential"
              ? dispatch(
                  setIncomeSequentialChartType(
                    type.toLocaleLowerCase() as SequentialChartOption
                  )
                )
              : dispatch(
                  setIncomeDistributionChartType(
                    type.toLocaleLowerCase() as DistributionChartOption
                  )
                )
            : dataType === "expenses"
            ? expenseChartMode === "sequential"
              ? dispatch(
                  setExpenseSequentialChartType(
                    type.toLocaleLowerCase() as SequentialChartOption
                  )
                )
              : dispatch(
                  setExpenseDistributionChartType(
                    type.toLocaleLowerCase() as DistributionChartOption
                  )
                )
            : dispatch(
                setSummarySequentialChartType(
                  type.toLocaleLowerCase() as SequentialChartOption
                )
              )
        }
      />
      {dataType === "income" ? (
        incomeChartMode === "distribution" && <OptionHR follows={false} />
      ) : dataType === "expenses" ? (
        expenseChartMode === "distribution" && <OptionHR follows={false} />
      ) : (
        <OptionHR />
      )}
    </>
  );
};

export default ChartOption;
