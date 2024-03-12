import { createSlice } from "@reduxjs/toolkit";
import localReducers from "./actions/local/reducers";
import networkReducers from "./actions/network/reducers";

export interface TickersState {
  tickers: string[];
  tickersError: string | undefined;
  tickersLoading: boolean;
}

export const initialState: TickersState = {
  tickers: [],
  tickersError: undefined,
  tickersLoading: false,
};

export const tickersSlice = createSlice({
  name: "tickers",
  initialState,
  reducers: localReducers,
  extraReducers: networkReducers,
});
