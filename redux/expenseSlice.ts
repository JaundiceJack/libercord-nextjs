import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import saveAs from "file-saver";
import { Types } from "mongoose";
import { formatDateMMDDYYYY } from "../helpers/dates";
import { ExpenseType } from "../models/Expense";
import type { ReduxState } from "./store";
import type {
  ExpenseSortOption,
  ExpenseGraphOption,
  SortDirection,
  WindowOption,
  ExpenseViewByOption,
} from "./types";
import tocsv from "papaparse";

export interface ExpenseState {
  expenses: ExpenseType[];
  expenseId: Types.ObjectId | null;
  expenseWindow: WindowOption;
  expenseGraph: ExpenseGraphOption;
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

const initialState: ExpenseState = {
  expenses: [],
  expenseId: null,
  expenseWindow: "graph",
  expenseGraph: "pie",
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
    toggleAddExpenseModal: (state: ExpenseState) => {
      state.expenseAddModalOpen = !state.expenseAddModalOpen;
    },
    toggleEditExpenseModal: (state: ExpenseState) => {
      state.expenseEditModalOpen = !state.expenseEditModalOpen;
    },
    toggleDeleteExpenseModal: (state: ExpenseState) => {
      state.expenseDeleteModalOpen = !state.expenseDeleteModalOpen;
    },
    toggleExpenseColumnModal: (state: ExpenseState) => {
      state.expenseColumnModalOpen = !state.expenseColumnModalOpen;
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
    setExpenseViewBy: (
      state: ExpenseState,
      action: PayloadAction<ExpenseViewByOption>
    ) => {
      state.expenseViewBy = action.payload;
    },
    setExpenseWindow: (
      state: ExpenseState,
      action: PayloadAction<WindowOption>
    ) => {
      state.expenseWindow = action.payload;
    },
    setExpenseGraph: (
      state: ExpenseState,
      action: PayloadAction<ExpenseGraphOption>
    ) => {
      state.expenseGraph = action.payload;
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
    exportExpenseData: (state: ExpenseState) => {
      saveAs(
        new Blob([
          tocsv.unparse(
            state.expenses.map((exp) => {
              return {
                category: exp.category,
                location: exp.location,
                currency: exp.currency,
                amount: exp.amount,
                date: exp.date,
              };
            })
          ),
        ]),
        `Expense_Data-${formatDateMMDDYYYY(new Date())}.csv`
      );
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
        state.expenseEditModalOpen = false;
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
        state.expenseAddModalOpen = false;
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
        state.expenseDeleteModalOpen = false;
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
  toggleAddExpenseModal,
  toggleEditExpenseModal,
  toggleDeleteExpenseModal,
  toggleExpenseColumnModal,
  clearExpenseError,
  setExpenseSortBy,
  setExpenseWindow,
  toggleExpenseColumn,
  exportExpenseData,
  setExpenseGraph,
  setExpenseViewBy,
} = expenseSlice.actions;
export const selectExpense = (state: ReduxState) => state.expense;
export default expenseSlice.reducer;
