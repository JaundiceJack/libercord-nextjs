import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import dateReducer from "./date";
import incomeReducer from "./income";
import expenseReducer from "./expense";
import catalogReducer from "./catalog";
import summaryReducer from "./summary";
import preferencesReducer from "./preferences";

const store = configureStore({
  reducer: {
    preferences: preferencesReducer,
    date: dateReducer,
    income: incomeReducer,
    expense: expenseReducer,
    catalog: catalogReducer,
    summary: summaryReducer,
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
