import { PayloadAction } from "@reduxjs/toolkit";
import { ExpenseType } from "../../../../models/Expense";
import { ExpenseState } from "../../slice";

export const pending = (state: ExpenseState) => {
  state.expenseLoading = true;
};

export const getFulfilled = (
  state: ExpenseState,
  action: PayloadAction<ExpenseType[]>
) => {
  state.expenseLoading = false;
  state.expenses = action.payload;
};

export const addFulfilled = (
  state: ExpenseState,
  action: PayloadAction<ExpenseType[]>
) => {
  state.expenseLoading = false;
  state.expenses = action.payload;
  state.expenseAddModalOpen = false;
};

export const editFulfilled = (
  state: ExpenseState,
  action: PayloadAction<ExpenseType[]>
) => {
  state.expenseLoading = false;
  state.expenses = action.payload;
  state.expenseEditModalOpen = false;
};

export const deleteFulfilled = (
  state: ExpenseState,
  action: PayloadAction<ExpenseType[]>
) => {
  state.expenseLoading = false;
  state.expenses = action.payload;
  state.expenseDeleteModalOpen = false;
  state.expenseId = null;
};

export const rejected = (
  state: ExpenseState,
  action: PayloadAction<unknown, string>
) => {
  state.expenseLoading = false;
  state.expenseError =
    typeof action.payload === "string" ? action.payload : undefined;
};
