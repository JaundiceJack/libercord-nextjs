import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ReduxState } from "./store";
import { add, sub, isSameMonth, getMonth } from "date-fns";

export interface DateState {
  date: Date;
}

const initialState: DateState = {
  date: new Date(),
};

export const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    incrementYear: (state: DateState) => {
      state.date = add(state.date, { years: 1 });
    },
    decrementYear: (state: DateState) => {
      state.date = sub(state.date, { years: 1 });
    },
    incrementMonth: (state: DateState) => {
      state.date = add(state.date, { months: 1 });
    },
    decrementMonth: (state: DateState) => {
      state.date = sub(state.date, { months: 1 });
    },
    resetDate: (state: DateState) => {
      state.date = new Date();
    },
  },
});

export const {
  incrementYear,
  decrementYear,
  incrementMonth,
  decrementMonth,
  resetDate,
} = dateSlice.actions;
export const selectDate = (state: ReduxState) => state.date;
export default dateSlice.reducer;
