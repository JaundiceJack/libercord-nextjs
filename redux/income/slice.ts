import { createSlice } from "@reduxjs/toolkit";
import { Types } from "mongoose";
import { IncomeType } from "../../models/Income";
import { IncomeChartTypeOption } from "../../models/types";
import type {
  IncomeSortOption,
  IncomeViewByOption,
  SortDirection,
  WindowOption,
} from "../types";
import localReducers from "./actions/local/reducers";
import networkReducers from "./actions/network/reducers";

export interface IncomeState {
  incomes: IncomeType[];
  incomeColumns: IncomeSortOption[];
  incomeWindow: WindowOption;
  incomeSortBy: IncomeSortOption;
  incomeViewBy: IncomeViewByOption;
  incomeChartType: IncomeChartTypeOption;
  incomeSortDir: SortDirection;
  incomeId: Types.ObjectId | null;
  incomeError: string | undefined;
  incomeLoading: boolean;
  incomeAddModalOpen: boolean;
  incomeEditModalOpen: boolean;
  incomeDeleteModalOpen: boolean;
  incomeColumnModalOpen: boolean;
}

export const initialState: IncomeState = {
  incomes: [],
  incomeColumns: ["date", "source", "category", "amount"],
  incomeWindow: "graph",
  incomeSortBy: "date",
  incomeViewBy: "source",
  incomeChartType: "line",
  incomeSortDir: "desc",
  incomeId: null,
  incomeError: undefined,
  incomeLoading: false,
  incomeAddModalOpen: false,
  incomeEditModalOpen: false,
  incomeDeleteModalOpen: false,
  incomeColumnModalOpen: false,
};

export const incomeSlice = createSlice({
  name: "income",
  initialState,
  reducers: localReducers,
  extraReducers: networkReducers,
});
