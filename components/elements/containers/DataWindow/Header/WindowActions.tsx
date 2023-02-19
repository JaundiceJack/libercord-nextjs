import saveAs from "file-saver";
import tocsv from "papaparse";
import { FC } from "react";
import { AiOutlineLineChart } from "react-icons/ai";
import { BiColumns } from "react-icons/bi";
import { TbFileExport } from "react-icons/tb";
import { formatDateMMDDYYYY } from "../../../../../helpers/dates";
import usePath from "../../../../../hooks/usePath";
import {
  useReduxDispatch,
  useReduxSelector,
} from "../../../../../hooks/useRedux";
import {
  exportExpenseData,
  selectExpense,
  toggleExpenseColumnModal,
} from "../../../../../redux/expenseSlice";
import {
  exportIncomeData,
  selectIncome,
  toggleIncomeColumnModal,
} from "../../../../../redux/incomeSlice";
import {
  selectSummary,
  toggleSummaryLineModal,
} from "../../../../../redux/summarySlice";
import ItemOptionButton from "../../../input/button/ItemOptionButton";

const WindowActions: FC = () => {
  const dispatch = useReduxDispatch();
  const { incomes, incomeWindow } = useReduxSelector(selectIncome);
  const { expenses, expenseWindow } = useReduxSelector(selectExpense);
  const { summaryWindow } = useReduxSelector(selectSummary);

  const { recordPath: dataType } = usePath();

  // Note: I wanted to put this in the summary reducer,
  // but it requires states from the other reducers
  const exportSummaryData = () => {
    saveAs(
      new Blob([
        tocsv.unparse([
          ...incomes.map((i) => ({
            category: i.category,
            source: i.source,
            currency: i.currency,
            amount: i.amount,
            date: i.date,
          })),
          ...expenses.map((e) => ({
            category: e.category,
            location: e.location,
            currency: e.currency,
            amount: e.amount,
            date: e.date,
          })),
        ]),
      ]),
      `Libercord_Data-${formatDateMMDDYYYY(new Date())}.csv`
    );
  };

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
        : dataType === "expenses"
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
          {dataType === "expenses" && expenseWindow === "list" && (
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
                : dataType === "expenses"
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
