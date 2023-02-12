import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import dateReducer from "./dateSlice";
import incomeReducer from "./incomeSlice";
import expenseReducer from "./expenseSlice";
import catalogReducer from "./catalogSlice";

const store = configureStore({
  reducer: {
    date: dateReducer,
    income: incomeReducer,
    expense: expenseReducer,
    catalog: catalogReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Setting this gets rid of an ephemeral error
    }),
});

export type ReduxState = ReturnType<typeof store.getState>;
export type ReduxDispatch = typeof store.dispatch;
export type ReduxThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxState,
  unknown,
  Action<string>
>;

export default store;
