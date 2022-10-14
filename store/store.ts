import { configureStore } from "@reduxjs/toolkit";
import yearReducer from "./slices/year";

const store = configureStore({
  reducer: {
    year: yearReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;

export default store;
