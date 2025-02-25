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
} from "../../../../../redux/expense";
import {
  exportIncomeData,
  selectIncome,
  toggleIncomeColumnModal,
} from "../../../../../redux/income";
import {
  selectSummary,
  toggleSummaryLineModal,
} from "../../../../../redux/summary";
import ItemOptionButton from "../../../input/button/ItemOptionButton";
import BasicButton from "../../../input/button/BasicButton";

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
      `LibreCord_Data-${formatDateMMDDYYYY(new Date())}.csv`
    );
  };

  return (
    <div className="flex flex-row items-center mr-1">
      {(dataType === "income"
        ? incomes
        : dataType === "expenses"
        ? expenses
        : [...incomes, ...expenses]
      )?.length > 0 && (
        <>
          {dataType === "income" && incomeWindow === "list" && (
            <BasicButton
              icon={<BiColumns />}
              onClick={() => dispatch(toggleIncomeColumnModal())}
              color="blue"
              hint={`Toggle Income Columns`}
              className="ml-1"
            />
          )}
          {dataType === "expenses" && expenseWindow === "list" && (
            <BasicButton
              icon={<BiColumns />}
              onClick={() => dispatch(toggleExpenseColumnModal())}
              color="blue"
              hint={`Toggle Expense Columns`}
              className="ml-1"
            />
          )}

          <BasicButton
            icon={<TbFileExport />}
            onClick={() =>
              dataType === "income"
                ? dispatch(exportIncomeData())
                : dataType === "expenses"
                ? dispatch(exportExpenseData())
                : exportSummaryData()
            }
            color="blue"
            hint={`Export your data to a .CSV file`}
            className={dataType !== "summary" ? "ml-1" : "ml-0"}
          />
        </>
      )}
    </div>
  );
};

export default WindowActions;
