import { PayloadAction } from "@reduxjs/toolkit";
import { add, sub } from "date-fns";
import { Timeframe } from "../../../types";
import { DateState, initialState } from "../../slice";

export default {
  resetDate: (state: DateState) => {
    state = initialState;
  },
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
  setTimeframe: (state: DateState, action: PayloadAction<Timeframe>) => {
    state.dataTimeframe = action.payload;
  },
};
