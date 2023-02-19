import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import saveAs from "file-saver";
import { Types } from "mongoose";
import tocsv from "papaparse";
import { formatDateMMDDYYYY } from "../helpers/dates";
import { IncomeType } from "../models/Income";
import type { ReduxState } from "./store";
import type {
  DistributionChartOption,
  IncomeSortOption,
  IncomeViewByOption,
  ModeOption,
  SequentialChartOption,
  SortDirection,
  WindowOption,
} from "./types";

export interface IncomeState {
  incomes: IncomeType[];
  incomeColumns: IncomeSortOption[];
  incomeWindow: WindowOption;
  incomeSortBy: IncomeSortOption;
  incomeViewBy: IncomeViewByOption;
  incomeDistributionChartType: DistributionChartOption;
  incomeSequentialChartType: SequentialChartOption;
  incomeChartMode: ModeOption;
  incomeSortDir: SortDirection;
  incomeId: Types.ObjectId | null;
  incomeError: string | undefined;
  incomeLoading: boolean;
  incomeAddModalOpen: boolean;
  incomeEditModalOpen: boolean;
  incomeDeleteModalOpen: boolean;
  incomeColumnModalOpen: boolean;
}

const initialState: IncomeState = {
  incomes: [],
  incomeColumns: ["date", "source", "category", "amount"],
  incomeWindow: "graph",
  incomeSortBy: "date",
  incomeViewBy: "source",
  incomeDistributionChartType: "pie",
  incomeSequentialChartType: "line",
  incomeChartMode: "sequential",
  incomeSortDir: "desc",
  incomeId: null,
  incomeError: undefined,
  incomeLoading: false,
  incomeAddModalOpen: false,
  incomeEditModalOpen: false,
  incomeDeleteModalOpen: false,
  incomeColumnModalOpen: false,
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
    resetIncome: (state: IncomeState) => {
      state = initialState;
    },
    pickIncome: (state: IncomeState, action: PayloadAction<Types.ObjectId>) => {
      state.incomeId = action.payload;
    },
    unpickIncome: (state: IncomeState) => {
      state.incomeId = null;
    },
    toggleAddIncomeModal: (state: IncomeState) => {
      state.incomeAddModalOpen = !state.incomeAddModalOpen;
    },
    toggleEditIncomeModal: (state: IncomeState) => {
      state.incomeEditModalOpen = !state.incomeEditModalOpen;
    },
    toggleDeleteIncomeModal: (state: IncomeState) => {
      state.incomeDeleteModalOpen = !state.incomeDeleteModalOpen;
    },
    toggleIncomeColumnModal: (state: IncomeState) => {
      state.incomeColumnModalOpen = !state.incomeColumnModalOpen;
    },
    clearIncomeError: (state: IncomeState) => {
      state.incomeError = undefined;
    },
    setIncomeSortBy: (
      state: IncomeState,
      action: PayloadAction<IncomeSortOption>
    ) => {
      if (state.incomeSortBy === action.payload) {
        state.incomeSortDir = state.incomeSortDir === "asc" ? "desc" : "asc";
      } else state.incomeSortBy = action.payload;
    },
    setIncomeViewBy: (
      state: IncomeState,
      action: PayloadAction<IncomeViewByOption>
    ) => {
      state.incomeViewBy = action.payload;
    },
    setIncomeWindow: (
      state: IncomeState,
      action: PayloadAction<WindowOption>
    ) => {
      state.incomeWindow = action.payload;
    },
    setIncomeChartMode: (
      state: IncomeState,
      action: PayloadAction<ModeOption>
    ) => {
      state.incomeChartMode = action.payload;
    },
    setIncomeDistributionChartType: (
      state: IncomeState,
      action: PayloadAction<DistributionChartOption>
    ) => {
      state.incomeDistributionChartType = action.payload;
    },
    setIncomeSequentialChartType: (
      state: IncomeState,
      action: PayloadAction<SequentialChartOption>
    ) => {
      state.incomeSequentialChartType = action.payload;
    },
    toggleIncomeColumn: (
      state: IncomeState,
      action: PayloadAction<IncomeSortOption>
    ) => {
      // if the option is not in the list, add it, otherwise remove it
      if (state.incomeColumns.includes(action.payload))
        state.incomeColumns = state.incomeColumns.filter(
          (col) => col !== action.payload
        );
      else state.incomeColumns = [...state.incomeColumns, action.payload];
    },
    exportIncomeData: (state: IncomeState) => {
      saveAs(
        new Blob([
          tocsv.unparse(
            state.incomes.map((inc) => {
              return {
                category: inc.category,
                source: inc.source,
                currency: inc.currency,
                amount: inc.amount,
                date: inc.date,
              };
            })
          ),
        ]),
        `Income_Data-${formatDateMMDDYYYY(new Date())}.csv`
      );
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
        state.incomeEditModalOpen = false;
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
        state.incomeAddModalOpen = false;
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
        state.incomeDeleteModalOpen = false;
        state.incomeId = null;
      })
      .addCase(deleteIncome.rejected, (state: IncomeState, action) => {
        state.incomeLoading = false;
        state.incomeError = String(action.error.message);
      });
  },
});

export const {
  resetIncome,
  pickIncome,
  unpickIncome,
  toggleAddIncomeModal,
  toggleEditIncomeModal,
  toggleDeleteIncomeModal,
  toggleIncomeColumnModal,
  clearIncomeError,
  setIncomeSortBy,
  setIncomeWindow,
  toggleIncomeColumn,
  exportIncomeData,
  setIncomeChartMode,
  setIncomeDistributionChartType,
  setIncomeSequentialChartType,
  setIncomeViewBy,
} = incomeSlice.actions;
export const selectIncome = (state: ReduxState) => state.income;
export default incomeSlice.reducer;
