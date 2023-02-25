import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ReduxState } from "../store";
import { add, sub, isSameMonth, getMonth } from "date-fns";
import localReducers from "./actions/local/reducers";
import { Timeframe } from "../types";

export interface DateState {
  date: Date;
  dataTimeframe: Timeframe;
}

export const initialState: DateState = {
  date: new Date(),
  dataTimeframe: "year",
};

export const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: localReducers,
});
