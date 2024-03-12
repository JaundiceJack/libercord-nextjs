import { TickersState, initialState } from "../../slice";

export default {
  resetTickers: (state: TickersState) => {
    state = initialState;
  },
  clearTickersError: (state: TickersState) => {
    state.tickersError = undefined;
  },
};
