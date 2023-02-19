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
import GraphOptionToggle from "../../../input/button/GraphOptionToggle";
import OptionHR from "../OptionHR";

const ModeOption: FC = () => {
  const dispatch = useReduxDispatch();
  const { incomeChartMode } = useReduxSelector(selectIncome);
  const { expenseChartMode } = useReduxSelector(selectExpense);

  const { recordPath: dataType } = usePath();

  return (
    <>
      {dataType !== "summary" && (
        <>
          <GraphOptionToggle
            className="my-2"
            label="Mode"
            selected={
              dataType === "income"
                ? incomeChartMode === "sequential"
                  ? "Time"
                  : "Quantity"
                : expenseChartMode === "sequential"
                ? "Time"
                : "Quantity"
            }
            options={["Time", "Quantity"]}
            toggleOption={(mode: string) => {
              dataType === "income"
                ? dispatch(
                    setIncomeChartMode(
                      mode === "Time" ? "sequential" : "distribution"
                    )
                  )
                : dispatch(
                    setExpenseChartMode(
                      mode === "Time" ? "sequential" : "distribution"
                    )
                  );
            }}
          />
          <OptionHR />
        </>
      )}
    </>
  );
};

export default ModeOption;
