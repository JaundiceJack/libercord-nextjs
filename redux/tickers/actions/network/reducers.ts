import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { TickersState } from "../../slice";
import { getInitialTickers } from "./requests";
import { fulfilled, pending, rejected } from "./resolvers";

export default (builder: ActionReducerMapBuilder<TickersState>) => {
  builder
    // Load Tickers
    .addCase(getInitialTickers.pending, pending)
    .addCase(getInitialTickers.fulfilled, fulfilled)
    .addCase(getInitialTickers.rejected, rejected);
};
