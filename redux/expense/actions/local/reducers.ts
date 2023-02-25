import { PayloadAction } from "@reduxjs/toolkit";
import saveAs from "file-saver";
import { Types } from "mongoose";
import { formatDateMMDDYYYY } from "../../../../helpers/dates";
import { ExpenseChartTypeOption } from "../../../../models/types";
import {
  ExpenseSortOption,
  ExpenseViewByOption,
  WindowOption,
} from "../../../types";
import { ExpenseState, initialState } from "../../slice";
import tocsv from "papaparse";

export default {
  resetExpense: (state: ExpenseState) => {
    state = initialState;
  },
  pickExpense: (state: ExpenseState, action: PayloadAction<Types.ObjectId>) => {
    state.expenseId = action.payload;
  },
  unpickExpense: (state: ExpenseState) => {
    state.expenseId = null;
  },
  toggleAddExpenseModal: (state: ExpenseState) => {
    state.expenseAddModalOpen = !state.expenseAddModalOpen;
  },
  toggleEditExpenseModal: (state: ExpenseState) => {
    state.expenseEditModalOpen = !state.expenseEditModalOpen;
  },
  toggleDeleteExpenseModal: (state: ExpenseState) => {
    state.expenseDeleteModalOpen = !state.expenseDeleteModalOpen;
  },
  toggleExpenseColumnModal: (state: ExpenseState) => {
    state.expenseColumnModalOpen = !state.expenseColumnModalOpen;
  },
  clearExpenseError: (state: ExpenseState) => {
    state.expenseError = undefined;
  },
  setExpenseSortBy: (
    state: ExpenseState,
    action: PayloadAction<ExpenseSortOption>
  ) => {
    if (state.expenseSortBy === action.payload) {
      state.expenseSortDir = state.expenseSortDir === "asc" ? "desc" : "asc";
    } else state.expenseSortBy = action.payload;
  },
  setExpenseViewBy: (
    state: ExpenseState,
    action: PayloadAction<ExpenseViewByOption>
  ) => {
    state.expenseViewBy = action.payload;
  },
  setExpenseWindow: (
    state: ExpenseState,
    action: PayloadAction<WindowOption>
  ) => {
    state.expenseWindow = action.payload;
  },
  setExpenseChartType: (
    state: ExpenseState,
    action: PayloadAction<ExpenseChartTypeOption>
  ) => {
    state.expenseChartType = action.payload;
  },
  toggleExpenseColumn: (
    state: ExpenseState,
    action: PayloadAction<ExpenseSortOption>
  ) => {
    // if the option is not in the list, add it, otherwise remove it
    if (state.expenseColumns.includes(action.payload))
      state.expenseColumns = state.expenseColumns.filter(
        (col) => col !== action.payload
      );
    else state.expenseColumns = [...state.expenseColumns, action.payload];
  },
  setExpenseColumns: (
    state: ExpenseState,
    action: PayloadAction<ExpenseSortOption[]>
  ) => {
    state.expenseColumns = action.payload;
  },
  exportExpenseData: (state: ExpenseState) => {
    saveAs(
      new Blob([
        tocsv.unparse(
          state.expenses.map((exp) => {
            return {
              category: exp.category,
              location: exp.location,
              currency: exp.currency,
              amount: exp.amount,
              date: exp.date,
            };
          })
        ),
      ]),
      `Expense_Data-${formatDateMMDDYYYY(new Date())}.csv`
    );
  },
};
