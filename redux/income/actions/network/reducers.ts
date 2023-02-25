import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { IncomeState } from "../../slice";
import {
  addIncome,
  deleteIncome,
  editIncome,
  getInitialIncomes,
} from "./requests";
import {
  addFulfilled,
  deleteFulfilled,
  editFulfilled,
  getFulfilled,
  pending,
  rejected,
} from "./resolvers";

export default (builder: ActionReducerMapBuilder<IncomeState>) => {
  builder
    // Initial Incomes Reducer
    .addCase(getInitialIncomes.pending, pending)
    .addCase(getInitialIncomes.fulfilled, getFulfilled)
    .addCase(getInitialIncomes.rejected, rejected)
    // Edit Income Reducers
    .addCase(editIncome.pending, pending)
    .addCase(editIncome.fulfilled, editFulfilled)
    .addCase(editIncome.rejected, rejected)
    // Add Income Reducers
    .addCase(addIncome.pending, pending)
    .addCase(addIncome.fulfilled, addFulfilled)
    .addCase(addIncome.rejected, rejected)
    // Delete Incomes Reducers
    .addCase(deleteIncome.pending, pending)
    .addCase(deleteIncome.fulfilled, deleteFulfilled)
    .addCase(deleteIncome.rejected, rejected);
};
