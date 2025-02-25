import { createSlice } from "@reduxjs/toolkit";
import {
  AssetChartTypeOption,
  ExpenseChartTypeOption,
  IncomeChartTypeOption,
  SummaryChartTypeOption,
} from "../../models/types";
import localReducers from "./actions/local/reducers";
import networkReducers from "./actions//network/reducers";
import { ExpenseSortOption, IncomeSortOption } from "../types";

export interface PreferencesState {
  preferencesLoading: boolean;
  preferencesError: string | undefined;
  initialSavings: number;
  useNegativeExpenses: boolean;
  defaultSummaryChartType: SummaryChartTypeOption;
  defaultExpenseChartType: ExpenseChartTypeOption;
  defaultIncomeChartType: IncomeChartTypeOption;
  defaultAssetChartType: AssetChartTypeOption;
  defaultExpenseColumns: ExpenseSortOption[];
  defaultIncomeColumns: IncomeSortOption[];
}

export const initialState: PreferencesState = {
  preferencesLoading: false,
  preferencesError: undefined,
  initialSavings: 0,
  useNegativeExpenses: true,
  defaultSummaryChartType: "line",
  defaultExpenseChartType: "bar",
  defaultIncomeChartType: "bar",
  defaultAssetChartType: "pie",
  defaultExpenseColumns: ["date", "location", "category", "amount"],
  defaultIncomeColumns: ["date", "source", "category", "amount"],
};

export const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: localReducers,
  extraReducers: networkReducers,
});
