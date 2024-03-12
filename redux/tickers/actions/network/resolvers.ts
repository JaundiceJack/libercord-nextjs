import { PayloadAction } from "@reduxjs/toolkit";
import { TickersState } from "../../slice";

export const pending = (state: TickersState) => {
  state.tickersLoading = true;
};

export const fulfilled = (
  state: TickersState,
  action: PayloadAction<string[]>
) => {
  state.tickersLoading = false;
  state.tickers = action.payload;
};

export const rejected = (
  state: TickersState,
  action: PayloadAction<unknown, string>
) => {
  state.tickersLoading = false;
  state.tickersError =
    typeof action.payload === "string" ? action.payload : undefined;
};
