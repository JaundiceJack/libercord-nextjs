import { FC } from "react";
import { useReduxDispatch, useReduxSelector } from "../../../../hooks/useRedux";
import {
  editPreferences,
  selectPreferences,
} from "../../../../redux/preferences";
import { ExpenseSortOption, IncomeSortOption } from "../../../../redux/types";
import BorderButton from "../../../elements/input/button/BorderButton";
import CheckboxEntry from "../../../elements/input/form/Checkbox";
import GroupBox from "../../../elements/containers/GroupBox";

const ColumnDefaults: FC = () => {
  const dispatch = useReduxDispatch();
  const { defaultExpenseColumns, defaultIncomeColumns } =
    useReduxSelector(selectPreferences);

  const toggleIncomeColumn = (column: IncomeSortOption) =>
    defaultIncomeColumns.indexOf(column) === -1
      ? [...defaultIncomeColumns, column]
      : defaultIncomeColumns.filter((col) => col !== column);

  const toggleExpenseColumn = (column: ExpenseSortOption) =>
    defaultExpenseColumns.indexOf(column) === -1
      ? [...defaultExpenseColumns, column]
      : defaultExpenseColumns.filter((col) => col !== column);

  const toggleColumn = (
    type: "income" | "expense",
    column: IncomeSortOption | ExpenseSortOption
  ) => {
    dispatch(
      editPreferences({
        updates:
          type === "income"
            ? {
                defaultIncomeColumns: toggleIncomeColumn(
                  column as IncomeSortOption
                ),
              }
            : {
                defaultExpenseColumns: toggleExpenseColumn(
                  column as ExpenseSortOption
                ),
              },
      })
    );
  };

  return (
    <GroupBox title="Default Data Columns">
      <div className="flex flex-row items-center my-4">
        <p className="w-36 text-white mb-2 text-lg">Income</p>
        <div className="grid grid-cols-2 w-full">
          <CheckboxEntry
            label="Date"
            name="date"
            className=""
            labelColor="white"
            value={""}
            defaultChecked={defaultIncomeColumns.indexOf("date") !== -1}
            onClick={() => toggleColumn("income", "date")}
          />{" "}
          <CheckboxEntry
            label="Source"
            name="source"
            className=""
            labelColor="white"
            value={""}
            defaultChecked={defaultIncomeColumns.indexOf("source") !== -1}
            onClick={() => toggleColumn("income", "source")}
          />
          <CheckboxEntry
            label="Category"
            name="category"
            className=""
            labelColor="white"
            value={""}
            defaultChecked={defaultIncomeColumns.indexOf("category") !== -1}
            onClick={() => toggleColumn("income", "category")}
          />
          <CheckboxEntry
            label="Amount"
            name="amount"
            className=""
            labelColor="white"
            value={""}
            defaultChecked={defaultIncomeColumns.indexOf("amount") !== -1}
            onClick={() => toggleColumn("income", "amount")}
          />
        </div>
      </div>
      <hr className="opacity-10" />
      <div className="flex flex-row items-center my-4">
        <p className="w-36 text-white mb-2 text-lg">Expenses</p>
        <div className="grid grid-cols-2 w-full">
          <CheckboxEntry
            label="Date"
            name="date"
            className=""
            labelColor="white"
            value={""}
            defaultChecked={defaultExpenseColumns.indexOf("date") !== -1}
            onClick={() => toggleColumn("expense", "date")}
          />{" "}
          <CheckboxEntry
            label="Location"
            name="location"
            className=""
            labelColor="white"
            value={""}
            defaultChecked={defaultExpenseColumns.indexOf("location") !== -1}
            onClick={() => toggleColumn("expense", "location")}
          />
          <CheckboxEntry
            label="Category"
            name="category"
            className=""
            labelColor="white"
            value={""}
            defaultChecked={defaultExpenseColumns.indexOf("category") !== -1}
            onClick={() => toggleColumn("expense", "category")}
          />
          <CheckboxEntry
            label="Amount"
            name="amount"
            className=""
            labelColor="white"
            value={""}
            defaultChecked={defaultExpenseColumns.indexOf("amount") !== -1}
            onClick={() => toggleColumn("expense", "amount")}
          />
        </div>
      </div>
    </GroupBox>
  );
};

export default ColumnDefaults;
