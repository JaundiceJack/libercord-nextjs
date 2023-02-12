import { FC, useEffect, useState } from "react";
import ListWindow from "../../../elements/containers/ListWindow";
import type { ListWindowColumn } from "../../../elements/containers/ListWindow/types";
import Spinner from "../../../elements/misc/spinner";
import Message from "../../../elements/misc/message";
import EmptyListMessage from "../../../elements/misc/emptyListMessage";
import { useReduxDispatch, useReduxSelector } from "../../../../hooks/useRedux";
import {
  pickExpense,
  selectExpense,
  setExpenseSortBy,
  ExpenseSortOption,
} from "../../../../redux/expenseSlice";
import type { ExpenseType } from "../../../../models/Expense";
import { isSameYear, isSameMonth } from "date-fns";
import { selectDate } from "../../../../redux/dateSlice";
import useExpenseData from "../useExpenseData";
import ContentWindow from "../../../elements/containers/ContentWindow";

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

  const { sortedExpenses } = useExpenseData();

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
