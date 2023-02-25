import { PayloadAction } from "@reduxjs/toolkit";
import { PreferenceType } from "../../../../models/Preferences";
import { PreferencesState } from "../../slice";

export const pending = (state: PreferencesState) => {
  state.preferencesLoading = true;
};

export const fulfilled = (
  state: PreferencesState,
  action: PayloadAction<PreferenceType>
) => {
  state.preferencesLoading = false;
  state.initialSavings = action.payload.initialSavings || state.initialSavings;
  state.useNegativeExpenses =
    action.payload.useNegativeExpenses ?? state.useNegativeExpenses;
  state.defaultSummaryChartType =
    action.payload.defaultSummaryChartType || state.defaultSummaryChartType;
  state.defaultExpenseChartType =
    action.payload.defaultExpenseChartType || state.defaultExpenseChartType;
  state.defaultIncomeChartType =
    action.payload.defaultIncomeChartType || state.defaultIncomeChartType;
  state.defaultExpenseColumns =
    action.payload.defaultExpenseColumns ?? state.defaultExpenseColumns;
  state.defaultIncomeColumns =
    action.payload.defaultIncomeColumns ?? state.defaultIncomeColumns;
};

export const rejected = (
  state: PreferencesState,
  action: PayloadAction<unknown, string>
) => {
  state.preferencesLoading = false;
  state.preferencesError =
    typeof action.payload === "string" ? action.payload : undefined;
};
