import { createSlice } from "@reduxjs/toolkit";
import { SummaryChartTypeOption } from "../../models/types";
import type { SummaryLines, WindowOption } from "../types";
import localReducers from "./actions/local/reducers";

export interface SummaryState {
  summaryWindow: WindowOption;
  summaryLines: SummaryLines[];
  summaryLineModalOpen: boolean;
  summaryChartType: SummaryChartTypeOption;
  summaryExpensesNegative: boolean;
}

export const initialState: SummaryState = {
  summaryWindow: "graph",
  summaryLines: ["income", "expense", "savings", "cash"],
  summaryLineModalOpen: false,
  summaryChartType: "line",
  summaryExpensesNegative: true,
};

export const summarySlice = createSlice({
  name: "summary",
  initialState,
  reducers: localReducers,
});
