import { ReduxState } from "../store";
import { tickersSlice } from "./slice";

export { getInitialTickers } from "./actions/network/requests";

export const selectTickers = (state: ReduxState) => state.tickers;

export const { resetTickers, clearTickersError } = tickersSlice.actions;

export default tickersSlice.reducer;
