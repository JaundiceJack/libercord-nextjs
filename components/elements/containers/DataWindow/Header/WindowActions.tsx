import { FC } from "react";
import { BiColumns } from "react-icons/bi";
import { TbFileExport } from "react-icons/tb";
import { WindowActionsProps } from "../types";
import ItemOptionButton from "../../../input/button/ItemOptionButton";
import {
  useReduxDispatch,
  useReduxSelector,
} from "../../../../../hooks/useRedux";
import {
  exportIncomeData,
  selectIncome,
  toggleIncomeColumnModal,
} from "../../../../../redux/incomeSlice";
import {
  exportExpenseData,
  selectExpense,
  toggleExpenseColumnModal,
} from "../../../../../redux/expenseSlice";
import {
  exportSummaryData,
  selectSummary,
  toggleSummaryLineModal,
} from "../../../../../redux/summarySlice";
import { AiOutlineLineChart } from "react-icons/ai";

const WindowActions: FC<WindowActionsProps> = ({ dataType }) => {
  const dispatch = useReduxDispatch();
  const { incomes, incomeWindow } = useReduxSelector(selectIncome);
  const { expenses, expenseWindow } = useReduxSelector(selectExpense);
  const { summaryWindow } = useReduxSelector(selectSummary);

  return (
    <div className="flex flex-row items-center mr-1">
      {dataType === "summary" && (
        <ItemOptionButton
          icon={<AiOutlineLineChart />}
          onClick={() => dispatch(toggleSummaryLineModal())}
          color="blue"
          label={`Toggle Visible Data`}
        />
      )}
      {(dataType === "income"
        ? incomes
        : dataType === "expense"
        ? expenses
        : [...incomes, ...expenses]
      )?.length > 0 && (
        <>
          {dataType === "income" && incomeWindow === "list" && (
            <ItemOptionButton
              icon={<BiColumns />}
              onClick={() => dispatch(toggleIncomeColumnModal())}
              color="blue"
              label={`Toggle Income Columns`}
              className="ml-1"
            />
          )}
          {dataType === "expense" && expenseWindow === "list" && (
            <ItemOptionButton
              icon={<BiColumns />}
              onClick={() => dispatch(toggleExpenseColumnModal())}
              color="blue"
              label={`Toggle Expense Columns`}
              className="ml-1"
            />
          )}

          <ItemOptionButton
            icon={<TbFileExport />}
            onClick={() =>
              dataType === "income"
                ? dispatch(exportIncomeData())
                : dataType === "expense"
                ? dispatch(exportExpenseData())
                : exportSummaryData()
            }
            color="blue"
            label={`Export to .CSV`}
            className="ml-1"
          />
        </>
      )}
    </div>
  );
};

export default WindowActions;
