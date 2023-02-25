import { FC } from "react";
import { capitalize } from "../../../../../helpers/strings";
import usePath from "../../../../../hooks/usePath";
import {
  useReduxDispatch,
  useReduxSelector,
} from "../../../../../hooks/useRedux";
import { selectExpense, setExpenseViewBy } from "../../../../../redux/expense";
import { selectIncome, setIncomeViewBy } from "../../../../../redux/income";
import {
  ExpenseViewByOption,
  IncomeViewByOption,
} from "../../../../../redux/types";
import GraphOptionToggle from "../../../input/button/GraphOptionToggle";

const CatalogOption: FC = () => {
  const dispatch = useReduxDispatch();
  const { incomeChartType, incomeViewBy } = useReduxSelector(selectIncome);
  const { expenseChartType, expenseViewBy } = useReduxSelector(selectExpense);

  const { recordPath: dataType } = usePath();

  const condi1 =
    dataType === "income" &&
    (incomeChartType === "pie" || incomeChartType === "radar");
  const condi2 =
    dataType === "expenses" &&
    (expenseChartType === "pie" || expenseChartType === "radar");

  return (
    <>
      {(condi1 || condi2) && (
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
      )}
    </>
  );
};

export default CatalogOption;
