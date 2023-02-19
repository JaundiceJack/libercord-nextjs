import { FC } from "react";
import usePath from "../../../../../hooks/usePath";
import {
  useReduxDispatch,
  useReduxSelector,
} from "../../../../../hooks/useRedux";
import {
  selectExpense,
  setExpenseChartMode,
} from "../../../../../redux/expenseSlice";
import {
  selectIncome,
  setIncomeChartMode,
} from "../../../../../redux/incomeSlice";
import {
  selectSummary,
  setSummaryExpensesNegative,
} from "../../../../../redux/summarySlice";
import GraphOptionToggle from "../../../input/button/GraphOptionToggle";
import OptionHR from "../OptionHR";

const NegateExpensesOption: FC = () => {
  const dispatch = useReduxDispatch();
  const { incomeChartMode } = useReduxSelector(selectIncome);
  const { expenseChartMode } = useReduxSelector(selectExpense);
  const { summaryExpensesNegative } = useReduxSelector(selectSummary);

  const { recordPath: dataType } = usePath();

  return (
    <>
      {dataType === "summary" && (
        <>
          <GraphOptionToggle
            className="my-2"
            label="Minus Expense?"
            selected={summaryExpensesNegative ? "Yes" : "No"}
            options={["Yes", "No"]}
            toggleOption={(mode: string) => {
              dispatch(setSummaryExpensesNegative(mode === "Yes"));
            }}
          />
        </>
      )}
    </>
  );
};

export default NegateExpensesOption;
