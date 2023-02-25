import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { ExpenseState } from "../../slice";
import {
  addExpense,
  deleteExpense,
  editExpense,
  getInitialExpenses,
} from "./requests";
import {
  addFulfilled,
  deleteFulfilled,
  editFulfilled,
  getFulfilled,
  pending,
  rejected,
} from "./resolvers";

export default (builder: ActionReducerMapBuilder<ExpenseState>) => {
  builder
    // Initial Expenses Reducer
    .addCase(getInitialExpenses.pending, pending)
    .addCase(getInitialExpenses.fulfilled, getFulfilled)
    .addCase(getInitialExpenses.rejected, rejected)
    // Edit Expense Reducers
    .addCase(editExpense.pending, pending)
    .addCase(editExpense.fulfilled, editFulfilled)
    .addCase(editExpense.rejected, rejected)
    // Add Expense Reducers
    .addCase(addExpense.pending, pending)
    .addCase(addExpense.fulfilled, addFulfilled)
    .addCase(addExpense.rejected, rejected)
    // Delete Expenses Reducers
    .addCase(deleteExpense.pending, pending)
    .addCase(deleteExpense.fulfilled, deleteFulfilled)
    .addCase(deleteExpense.rejected, rejected);
};
