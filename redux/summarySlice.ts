import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import saveAs from "file-saver";
import { formatDateMMDDYYYY } from "../helpers/dates";
import type { ReduxState } from "./store";
import store from "./store";
import type { WindowOption } from "./types";
import tocsv from "papaparse";

export type SummaryLines = "income" | "expenses" | "savings";

export interface SummaryState {
  summaryWindow: WindowOption;
  summaryLines: SummaryLines[];
  summaryLineModalOpen: boolean;
}

const initialState: SummaryState = {
  summaryWindow: "graph",
  summaryLines: ["income", "expenses", "savings"],
  summaryLineModalOpen: false,
};

export const summarySlice = createSlice({
  name: "summary",
  initialState,
  reducers: {
    resetSummary: (state: SummaryState) => {
      state = initialState;
    },
    setSummaryWindow: (
      state: SummaryState,
      action: PayloadAction<WindowOption>
    ) => {
      state.summaryWindow = action.payload;
    },
    toggleSummaryLineModal: (state: SummaryState) => {
      state.summaryLineModalOpen = !state.summaryLineModalOpen;
    },
    toggleSummaryLine: (
      state: SummaryState,
      action: PayloadAction<SummaryLines>
    ) => {
      // if the option is not in the list, add it, otherwise remove it
      if (state.summaryLines.includes(action.payload))
        state.summaryLines = state.summaryLines.filter(
          (line) => line !== action.payload
        );
      else state.summaryLines = [...state.summaryLines, action.payload];
    },
    exportSummaryData: () => {
      saveAs(
        new Blob([
          tocsv.unparse([
            ...store.getState().income.incomes.map((i) => ({
              category: i.category,
              source: i.source,
              currency: i.currency,
              amount: i.amount,
              date: i.date,
            })),
            ...store.getState().expense.expenses.map((e) => ({
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
    },
  },
});

export const {
  resetSummary,
  setSummaryWindow,
  toggleSummaryLineModal,
  toggleSummaryLine,
  exportSummaryData,
} = summarySlice.actions;
export const selectSummary = (state: ReduxState) => state.summary;
export default summarySlice.reducer;
