import { PayloadAction } from "@reduxjs/toolkit";
import { SummaryChartTypeOption } from "../../../../models/types";
import { SummaryLines, WindowOption } from "../../../types";
import { SummaryState, initialState } from "../../slice";

export default {
  resetSummary: (state: SummaryState) => {
    state = initialState;
  },
  setSummaryWindow: (
    state: SummaryState,
    action: PayloadAction<WindowOption>
  ) => {
    state.summaryWindow = action.payload;
  },
  setSummaryChartType: (
    state: SummaryState,
    action: PayloadAction<SummaryChartTypeOption>
  ) => {
    state.summaryChartType = action.payload;
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
};
