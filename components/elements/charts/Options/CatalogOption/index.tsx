import { FC } from "react";
import { capitalize } from "../../../../../helpers/strings";
import usePath from "../../../../../hooks/usePath";
import {
  useReduxDispatch,
  useReduxSelector,
} from "../../../../../hooks/useRedux";
import {
  selectExpense,
  setExpenseViewBy,
} from "../../../../../redux/expenseSlice";
import {
  selectIncome,
  setIncomeViewBy,
} from "../../../../../redux/incomeSlice";
import {
  ExpenseViewByOption,
  IncomeViewByOption,
} from "../../../../../redux/types";
import GraphOptionToggle from "../../../input/button/GraphOptionToggle";

const CatalogOption: FC = () => {
  const dispatch = useReduxDispatch();
  const { incomeChartMode, incomeDistributionChartType, incomeViewBy } =
    useReduxSelector(selectIncome);
  const { expenseChartMode, expenseDistributionChartType, expenseViewBy } =
    useReduxSelector(selectExpense);

  const { recordPath: dataType } = usePath();

  return (
    <>
      {((dataType === "income" && incomeChartMode === "distribution") ||
        (dataType === "expenses" && expenseChartMode === "distribution")) && (
        <>
          <GraphOptionToggle
            className="my-2"
            label="View"
            selected={
              dataType === "income"
                ? capitalize(incomeViewBy)
                : capitalize(expenseViewBy)
            }
            options={
              dataType === "income"
                ? ["Source", "Category"]
                : ["Location", "Category"]
            }
            toggleOption={(option: string) => {
              dataType == "income"
                ? dispatch(
                    setIncomeViewBy(
                      option.toLocaleLowerCase() as IncomeViewByOption
                    )
                  )
                : dispatch(
                    setExpenseViewBy(
                      option.toLocaleLowerCase() as ExpenseViewByOption
                    )
                  );
            }}
          />
        </>
      )}
    </>
  );
};

export default CatalogOption;
