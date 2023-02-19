import { FC } from "react";
import {
  useReduxDispatch,
  useReduxSelector,
} from "../../../../../hooks/useRedux";
import {
  selectExpense,
  setExpenseWindow,
} from "../../../../../redux/expenseSlice";
import {
  selectIncome,
  setIncomeWindow,
} from "../../../../../redux/incomeSlice";
import HeaderButton from "../../../input/button/HeaderButton";
import type { WindowOptionsProps } from "../types";

const WindowOptions: FC<WindowOptionsProps> = ({ dataType }) => {
  const dispatch = useReduxDispatch();
  const { incomeWindow } = useReduxSelector(selectIncome);
  const { expenseWindow } = useReduxSelector(selectExpense);

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
