import { PayloadAction } from "@reduxjs/toolkit";
import saveAs from "file-saver";
import { Types } from "mongoose";
import { formatDateMMDDYYYY } from "../../../../helpers/dates";
import { IncomeChartTypeOption } from "../../../../models/types";
import {
  IncomeSortOption,
  IncomeViewByOption,
  WindowOption,
} from "../../../types";
import { IncomeState, initialState } from "../../slice";
import tocsv from "papaparse";

export default {
  resetIncome: (state: IncomeState) => {
    state = initialState;
  },
  pickIncome: (state: IncomeState, action: PayloadAction<Types.ObjectId>) => {
    state.incomeId = action.payload;
  },
  unpickIncome: (state: IncomeState) => {
    state.incomeId = null;
  },
  toggleAddIncomeModal: (state: IncomeState) => {
    state.incomeAddModalOpen = !state.incomeAddModalOpen;
  },
  toggleEditIncomeModal: (state: IncomeState) => {
    state.incomeEditModalOpen = !state.incomeEditModalOpen;
  },
  toggleDeleteIncomeModal: (state: IncomeState) => {
    state.incomeDeleteModalOpen = !state.incomeDeleteModalOpen;
  },
  toggleIncomeColumnModal: (state: IncomeState) => {
    state.incomeColumnModalOpen = !state.incomeColumnModalOpen;
  },
  clearIncomeError: (state: IncomeState) => {
    state.incomeError = undefined;
  },
  setIncomeSortBy: (
    state: IncomeState,
    action: PayloadAction<IncomeSortOption>
  ) => {
    if (state.incomeSortBy === action.payload) {
      state.incomeSortDir = state.incomeSortDir === "asc" ? "desc" : "asc";
    } else state.incomeSortBy = action.payload;
  },
  setIncomeViewBy: (
    state: IncomeState,
    action: PayloadAction<IncomeViewByOption>
  ) => {
    state.incomeViewBy = action.payload;
  },
  setIncomeWindow: (
    state: IncomeState,
    action: PayloadAction<WindowOption>
  ) => {
    state.incomeWindow = action.payload;
  },
  setIncomeChartType: (
    state: IncomeState,
    action: PayloadAction<IncomeChartTypeOption>
  ) => {
    state.incomeChartType = action.payload;
  },
  toggleIncomeColumn: (
    state: IncomeState,
    action: PayloadAction<IncomeSortOption>
  ) => {
    // if the option is not in the list, add it, otherwise remove it
    if (state.incomeColumns.includes(action.payload))
      state.incomeColumns = state.incomeColumns.filter(
        (col) => col !== action.payload
      );
    else state.incomeColumns = [...state.incomeColumns, action.payload];
  },
  setIncomeColumns: (
    state: IncomeState,
    action: PayloadAction<IncomeSortOption[]>
  ) => {
    state.incomeColumns = action.payload;
  },
  exportIncomeData: (state: IncomeState) => {
    saveAs(
      new Blob([
        tocsv.unparse(
          state.incomes.map((inc) => {
            return {
              category: inc.category,
              source: inc.source,
              currency: inc.currency,
              amount: inc.amount,
              date: inc.date,
            };
          })
        ),
      ]),
      `Income_Data-${formatDateMMDDYYYY(new Date())}.csv`
    );
  },
};
