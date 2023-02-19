import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ReduxState } from "./store";
import type { SequentialChartOption, WindowOption } from "./types";

export type SummaryLines = "income" | "expense" | "savings";

export interface SummaryState {
  summaryWindow: WindowOption;
  summaryLines: SummaryLines[];
  summaryLineModalOpen: boolean;
  summarySequentialChartType: SequentialChartOption;
  summaryExpensesNegative: boolean;
}

const initialState: SummaryState = {
  summaryWindow: "graph",
  summaryLines: ["income", "expense", "savings"],
  summaryLineModalOpen: false,
  summarySequentialChartType: "line",
  summaryExpensesNegative: true,
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
    setSummarySequentialChartType: (
      state: SummaryState,
      action: PayloadAction<SequentialChartOption>
    ) => {
      state.summarySequentialChartType = action.payload;
    },
    setSummaryExpensesNegative: (
      state: SummaryState,
      action: PayloadAction<boolean>
    ) => {
      state.summaryExpensesNegative = action.payload;
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
  },
});

export const {
  resetSummary,
  setSummaryWindow,
  toggleSummaryLineModal,
  toggleSummaryLine,
  setSummarySequentialChartType,
  setSummaryExpensesNegative,
} = summarySlice.actions;
export const selectSummary = (state: ReduxState) => state.summary;
export default summarySlice.reducer;
