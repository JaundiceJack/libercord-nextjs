import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Types } from "mongoose";
import { ExpenseType } from "../models/Expense";
import type { ReduxState, ReduxThunk } from "./store";
import type { SortDirection, WindowOption, Mode } from "./types";

export type ExpenseSortOption = "date" | "location" | "category" | "amount";

export interface ExpenseState {
  expenses: ExpenseType[];
  expenseId: Types.ObjectId | null;
  expenseMode: Mode;
  expenseWindow: WindowOption;
  expenseError: string | undefined;
  expenseLoading: boolean;
  expenseSortBy: ExpenseSortOption;
  expenseSortDir: SortDirection;
  expenseColumns: ExpenseSortOption[];
}

const initialState: ExpenseState = {
  expenses: [],
  expenseId: null,
  expenseMode: "idle",
  expenseWindow: "graph",
  expenseError: undefined,
  expenseLoading: false,
  expenseSortBy: "date",
  expenseSortDir: "desc",
  expenseColumns: ["date", "location", "category", "amount"],
};

// Get a user's expenses (to run upon page-load)
export const getInitialExpenses = createAsyncThunk("expense/load", async () => {
  try {
    const expenses = await (await fetch("/api/expense")).json();
    return expenses;
  } catch (e) {
    throw e;
  }
});

// Attempt to apply the updates to the selected expense
export const editExpense = createAsyncThunk(
  "expense/edit",
  async ({
    expenseId,
    updates,
  }: {
    expenseId: Types.ObjectId | null;
    updates: ExpenseType;
  }) => {
    try {
      const body = JSON.stringify({ expenseId, updates });
      const expenses: ExpenseType[] = await (
        await fetch("/api/expense", {
          method: "PUT",
          body,
        })
      ).json();
      return expenses;
    } catch (e) {
      throw e;
    }
  }
);

// Attempt to create a new expense with the given entries
export const addExpense = createAsyncThunk(
  "expense/add",
  async ({ expense }: { expense: ExpenseType }) => {
    try {
      const body = JSON.stringify({ expense });
      const expenses: ExpenseType[] = await (
        await fetch("/api/expense", { method: "POST", body })
      ).json();
      return expenses;
    } catch (e) {
      throw e;
    }
  }
);

// Remove the selected expense
export const deleteExpense = createAsyncThunk(
  "expense/delete",
  async ({ expenseId }: { expenseId: Types.ObjectId }) => {
    try {
      const expenses: ExpenseType[] = await (
        await fetch(`/api/expense/${expenseId}`, { method: "DELETE" })
      ).json();
      return expenses;
    } catch (e) {
      throw e;
    }
  }
);

export const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    resetExpense: (state: ExpenseState) => {
      state = initialState;
    },
    pickExpense: (
      state: ExpenseState,
      action: PayloadAction<Types.ObjectId>
    ) => {
      state.expenseId = action.payload;
    },
    unpickExpense: (state: ExpenseState) => {
      state.expenseId = null;
    },
    toggleAddingExpense: (state: ExpenseState) => {
      state.expenseMode = "adding";
    },
    toggleEditingExpense: (state: ExpenseState) => {
      state.expenseMode = "editing";
    },
    toggleDeletingExpense: (state: ExpenseState) => {
      state.expenseMode = "deleting";
    },
    clearExpenseError: (state: ExpenseState) => {
      state.expenseError = undefined;
    },
    setExpenseSortBy: (
      state: ExpenseState,
      action: PayloadAction<ExpenseSortOption>
    ) => {
      if (state.expenseSortBy === action.payload) {
        state.expenseSortDir = state.expenseSortDir === "asc" ? "desc" : "asc";
      } else state.expenseSortBy = action.payload;
    },
    setExpenseWindow: (
      state: ExpenseState,
      action: PayloadAction<WindowOption>
    ) => {
      state.expenseWindow = action.payload;
    },
    toggleExpenseColumn: (
      state: ExpenseState,
      action: PayloadAction<ExpenseSortOption>
    ) => {
      // if the option is not in the list, add it, otherwise remove it
      if (state.expenseColumns.includes(action.payload))
        state.expenseColumns = state.expenseColumns.filter(
          (col) => col !== action.payload
        );
      else state.expenseColumns = [...state.expenseColumns, action.payload];
    },
  },
  // These reducers handle loading/success/errors on web-server responses
  extraReducers: (builder) => {
    builder
      // Initial Expenses Reducer
      .addCase(getInitialExpenses.pending, (state: ExpenseState) => {
        state.expenseLoading = true;
      })
      .addCase(getInitialExpenses.fulfilled, (state: ExpenseState, action) => {
        state.expenseLoading = false;
        state.expenses = action.payload;
      })
      .addCase(getInitialExpenses.rejected, (state: ExpenseState, action) => {
        state.expenseLoading = false;
        state.expenseError = String(action.error.message);
      })
      // Edit Expense Reducers
      .addCase(editExpense.pending, (state: ExpenseState) => {
        state.expenseLoading = true;
      })
      .addCase(editExpense.fulfilled, (state: ExpenseState, action) => {
        state.expenseLoading = false;
        state.expenses = action.payload;
      })
      .addCase(editExpense.rejected, (state: ExpenseState, action) => {
        state.expenseLoading = false;
        state.expenseError = String(action.error.message);
      })
      // Add Expense Reducers
      .addCase(addExpense.pending, (state: ExpenseState) => {
        state.expenseLoading = true;
      })
      .addCase(addExpense.fulfilled, (state: ExpenseState, action) => {
        state.expenseLoading = false;
        state.expenses = action.payload;
      })
      .addCase(addExpense.rejected, (state: ExpenseState, action) => {
        state.expenseLoading = false;
        state.expenseError = String(action.error.message);
      })
      // Delete Expenses Reducers
      .addCase(deleteExpense.pending, (state: ExpenseState) => {
        state.expenseLoading = true;
      })
      .addCase(deleteExpense.fulfilled, (state: ExpenseState, action) => {
        state.expenseLoading = false;
        state.expenses = action.payload;
        state.expenseMode = "adding";
        state.expenseId = null;
      })
      .addCase(deleteExpense.rejected, (state: ExpenseState, action) => {
        state.expenseLoading = false;
        state.expenseError = String(action.error.message);
      });
  },
});

export const {
  resetExpense,
  pickExpense,
  unpickExpense,
  toggleAddingExpense,
  toggleEditingExpense,
  toggleDeletingExpense,
  clearExpenseError,
  setExpenseSortBy,
  setExpenseWindow,
  toggleExpenseColumn,
} = expenseSlice.actions;
export const selectExpense = (state: ReduxState) => state.expense;
export default expenseSlice.reducer;
