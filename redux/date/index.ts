import { ReduxState } from "../store";
import { dateSlice } from "./slice";

export const selectDate = (state: ReduxState) => state.date;

export const {
  resetDate,
  incrementYear,
  decrementYear,
  incrementMonth,
  decrementMonth,
  setTimeframe,
} = dateSlice.actions;

export default dateSlice.reducer;
