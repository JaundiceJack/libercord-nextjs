import { createSlice } from "@reduxjs/toolkit";
import { Types } from "mongoose";
import { ExpenseType } from "../../models/Expense";
import { ExpenseChartTypeOption } from "../../models/types";
import type {
  ExpenseSortOption,
  ExpenseViewByOption,
  SortDirection,
  WindowOption,
} from "../types";
import localReducers from "./actions/local/reducers";
import networkReducers from "./actions/network/reducers";

export interface ExpenseState {
  expenses: ExpenseType[];
  expenseId: Types.ObjectId | null;
  expenseWindow: WindowOption;
  expenseChartType: ExpenseChartTypeOption;
  expenseError: string | undefined;
  expenseLoading: boolean;
  expenseSortBy: ExpenseSortOption;
  expenseViewBy: ExpenseViewByOption;
  expenseSortDir: SortDirection;
  expenseColumns: ExpenseSortOption[];
  expenseColumnModalOpen: boolean;
  expenseAddModalOpen: boolean;
  expenseEditModalOpen: boolean;
  expenseDeleteModalOpen: boolean;
}

export const initialState: ExpenseState = {
  expenses: [],
  expenseId: null,
  expenseWindow: "graph",
  expenseChartType: "line",
  expenseError: undefined,
  expenseLoading: false,
  expenseSortBy: "date",
  expenseViewBy: "category",
  expenseSortDir: "desc",
  expenseColumns: ["date", "location", "category", "amount"],
  expenseColumnModalOpen: false,
  expenseAddModalOpen: false,
  expenseEditModalOpen: false,
  expenseDeleteModalOpen: false,
};

export const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: localReducers,
  extraReducers: networkReducers,
});
