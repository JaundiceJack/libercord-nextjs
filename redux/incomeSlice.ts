import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Types } from "mongoose";
import { IncomeType } from "../models/Income";
import type { ReduxState, ReduxThunk } from "./store";

type incomeSortOption = "date" | "source" | "category" | "amount";

export interface IncomeState {
  incomes: IncomeType[];
  incomeId: Types.ObjectId | null;
  incomeMode: "adding" | "editing" | "deleting";
  incomeError: string | undefined;
  incomeLoading: boolean;
  incomeSortBy: incomeSortOption;
  incomeSortDir: "asc" | "desc";
}

const initialState: IncomeState = {
  incomes: [],
  incomeId: null,
  incomeMode: "adding",
  incomeError: undefined,
  incomeLoading: false,
  incomeSortBy: "date",
  incomeSortDir: "desc",
};

// Get a user's incomes (to run upon page-load)
export const getInitialIncomes = createAsyncThunk("income/load", async () => {
  try {
    const incomes = await (await fetch("/api/income")).json();
    return incomes;
  } catch (e) {
    throw e;
  }
});

// Attempt to apply the updates to the selected income
export const editIncome = createAsyncThunk(
  "income/edit",
  async ({
    incomeId,
    updates,
  }: {
    incomeId: Types.ObjectId | null;
    updates: IncomeType;
  }) => {
    try {
      const body = JSON.stringify({ incomeId, updates });
      const incomes: IncomeType[] = await (
        await fetch("/api/income", {
          method: "PUT",
          body,
        })
      ).json();
      return incomes;
    } catch (e) {
      throw e;
    }
  }
);

// Attempt to create a new income with the given entries
export const addIncome = createAsyncThunk(
  "income/add",
  async ({ income }: { income: IncomeType }) => {
    try {
      const body = JSON.stringify({ income });
      const incomes: IncomeType[] = await (
        await fetch("/api/income", { method: "POST", body })
      ).json();
      return incomes;
    } catch (e) {
      throw e;
    }
  }
);

// Remove the selected income
export const deleteIncome = createAsyncThunk(
  "income/delete",
  async ({ incomeId }: { incomeId: Types.ObjectId }) => {
    try {
      const incomes: IncomeType[] = await (
        await fetch(`/api/income/${incomeId}`, { method: "DELETE" })
      ).json();
      return incomes;
    } catch (e) {
      throw e;
    }
  }
);

export const incomeSlice = createSlice({
  name: "income",
  initialState,
  reducers: {
    pickIncome: (state: IncomeState, action: PayloadAction<Types.ObjectId>) => {
      state.incomeId = action.payload;
    },
    unpickIncome: (state: IncomeState) => {
      state.incomeId = null;
    },
    toggleAddingIncome: (state: IncomeState) => {
      state.incomeMode = "adding";
    },
    toggleEditingIncome: (state: IncomeState) => {
      state.incomeMode = "editing";
    },
    toggleDeletingIncome: (state: IncomeState) => {
      state.incomeMode = "deleting";
    },
    clearIncomeError: (state: IncomeState) => {
      state.incomeError = undefined;
    },
    setIncomeSortBy: (
      state: IncomeState,
      action: PayloadAction<incomeSortOption>
    ) => {
      if (state.incomeSortBy === action.payload) {
        state.incomeSortDir = state.incomeSortDir === "asc" ? "desc" : "asc";
      } else state.incomeSortBy = action.payload;
    },
  },
  // These reducers handle loading/success/errors on web-server responses
  extraReducers: (builder) => {
    builder
      // Initial Incomes Reducer
      .addCase(getInitialIncomes.pending, (state: IncomeState) => {
        state.incomeLoading = true;
      })
      .addCase(getInitialIncomes.fulfilled, (state: IncomeState, action) => {
        state.incomeLoading = false;
        state.incomes = action.payload;
      })
      .addCase(getInitialIncomes.rejected, (state: IncomeState, action) => {
        state.incomeLoading = false;
        state.incomeError = String(action.error.message);
      })
      // Edit Income Reducers
      .addCase(editIncome.pending, (state: IncomeState) => {
        state.incomeLoading = true;
      })
      .addCase(editIncome.fulfilled, (state: IncomeState, action) => {
        state.incomeLoading = false;
        state.incomes = action.payload;
      })
      .addCase(editIncome.rejected, (state: IncomeState, action) => {
        state.incomeLoading = false;
        state.incomeError = String(action.error.message);
      })
      // Add Income Reducers
      .addCase(addIncome.pending, (state: IncomeState) => {
        state.incomeLoading = true;
      })
      .addCase(addIncome.fulfilled, (state: IncomeState, action) => {
        state.incomeLoading = false;
        state.incomes = action.payload;
      })
      .addCase(addIncome.rejected, (state: IncomeState, action) => {
        state.incomeLoading = false;
        state.incomeError = String(action.error.message);
      })
      // Delete Incomes Reducers
      .addCase(deleteIncome.pending, (state: IncomeState) => {
        state.incomeLoading = true;
      })
      .addCase(deleteIncome.fulfilled, (state: IncomeState, action) => {
        state.incomeLoading = false;
        state.incomes = action.payload;
        state.incomeMode = "adding";
        state.incomeId = null;
      })
      .addCase(deleteIncome.rejected, (state: IncomeState, action) => {
        state.incomeLoading = false;
        state.incomeError = String(action.error.message);
      });
  },
});

export const {
  pickIncome,
  unpickIncome,
  toggleAddingIncome,
  toggleEditingIncome,
  toggleDeletingIncome,
  clearIncomeError,
  setIncomeSortBy,
} = incomeSlice.actions;
export const selectIncome = (state: ReduxState) => state.income;
export default incomeSlice.reducer;
