import { ReduxState } from "../store";
import { summarySlice } from "./slice";

export const selectSummary = (state: ReduxState) => state.summary;

export const {
  resetSummary,
  setSummaryWindow,
  toggleSummaryLineModal,
  toggleSummaryLine,
  setSummaryChartType,
  setSummaryExpensesNegative,
} = summarySlice.actions;

export default summarySlice.reducer;
