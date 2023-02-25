import { FC } from "react";
import usePath from "../../../../../hooks/usePath";
import {
  useReduxDispatch,
  useReduxSelector,
} from "../../../../../hooks/useRedux";
import { selectExpense, setExpenseWindow } from "../../../../../redux/expense";
import { selectIncome, setIncomeWindow } from "../../../../../redux/income";
import HeaderButton from "../../../input/button/HeaderButton";

const WindowOptions: FC = () => {
  const dispatch = useReduxDispatch();
  const { incomeWindow } = useReduxSelector(selectIncome);
  const { expenseWindow } = useReduxSelector(selectExpense);

  const { recordPath: dataType } = usePath();

  return (
    <div className="flex flex-row items-center">
      {dataType !== "summary" && (
        <>
          <HeaderButton
            label="graph"
            onClick={() =>
              dataType === "income"
                ? dispatch(setIncomeWindow("graph"))
                : dispatch(setExpenseWindow("graph"))
            }
            current={dataType === "income" ? incomeWindow : expenseWindow}
            showArrow={true}
          />
          <HeaderButton
            label="list"
            onClick={() =>
              dataType === "income"
                ? dispatch(setIncomeWindow("list"))
                : dispatch(setExpenseWindow("list"))
            }
            current={dataType === "income" ? incomeWindow : expenseWindow}
            showArrow={true}
            className="ml-1"
          />
        </>
      )}
    </div>
  );
};

export default WindowOptions;
