import { FC, useEffect } from "react";
import useListData from "../../../../hooks/useData/useListData";
import { useReduxDispatch, useReduxSelector } from "../../../../hooks/useRedux";
import { selectDate } from "../../../../redux/date";
import {
  pickExpense,
  selectExpense,
  setExpenseColumns,
  setExpenseSortBy,
} from "../../../../redux/expense";
import { selectPreferences } from "../../../../redux/preferences";
import { ExpenseSortOption } from "../../../../redux/types";
import ContentWindow from "../../../elements/containers/ContentWindow";
import ListWindow from "../../../elements/containers/ListWindow";
import type { ListWindowColumn } from "../../../elements/containers/ListWindow/types";
import EmptyListMessage from "../../../elements/misc/emptyListMessage";
import Message from "../../../elements/misc/message";
import Spinner from "../../../elements/misc/spinner";

const ExpenseTable: FC = () => {
  // Get redux stuff for expenses
  const { date, dataTimeframe } = useReduxSelector(selectDate);
  const dispatch = useReduxDispatch();
  const {
    expenses,
    expenseId,
    expenseError,
    expenseLoading,
    expenseSortBy,
    expenseSortDir,
    expenseColumns,
  } = useReduxSelector(selectExpense);

  const { defaultExpenseColumns } = useReduxSelector(selectPreferences);
  useEffect(() => {
    dispatch(setExpenseColumns(defaultExpenseColumns));
  }, []);

  const { sortedExpenses } = useListData();

  // Set up the columns to be displayed
  const columns: ListWindowColumn[] = [
    {
      name: "date",
      label: "Date",
      setSort: () => dispatch(setExpenseSortBy("date")),
    },
    {
      name: "location",
      label: "Location",
      setSort: () => dispatch(setExpenseSortBy("location")),
    },
    {
      name: "category",
      label: "Category",
      setSort: () => dispatch(setExpenseSortBy("category")),
    },
    {
      name: "amount",
      label: "Amount",
      setSort: () => dispatch(setExpenseSortBy("amount")),
    },
  ];

  return (
    <ContentWindow>
      {expenseLoading ? (
        <Spinner />
      ) : expenseError ? (
        <Message error={expenseError} />
      ) : expenses.length === 0 ? (
        <EmptyListMessage listName="expense" />
      ) : (
        <ListWindow
          items={sortedExpenses}
          selected={expenseId}
          onItemClick={pickExpense}
          columns={columns.filter((col) => {
            const name = col.name as ExpenseSortOption;
            return expenseColumns.includes(name);
          })}
          currentSort={expenseSortBy}
          sortDirection={expenseSortDir}
          editable={false}
        />
      )}
    </ContentWindow>
  );
};

export default ExpenseTable;
