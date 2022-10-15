import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ReduxState } from "./store";

export interface YearState {
  year: number;
}

const initialState: YearState = {
  year: new Date().getFullYear(),
};

export const yearSlice = createSlice({
  name: "year",
  initialState,
  reducers: {
    incrementYear: (state) => {
      state.year += 1;
    },
    decrementYear: (state) => {
      state.year -= 1;
    },
    resetYear: (state) => {
      state.year = new Date().getFullYear();
    },
  },
});

export const { incrementYear, decrementYear, resetYear } = yearSlice.actions;
export const selectYear = (state: ReduxState) => state.year;
export default yearSlice.reducer;
