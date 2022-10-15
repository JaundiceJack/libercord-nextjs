import { configureStore } from "@reduxjs/toolkit";
import yearReducer from "./yearSlice";

const store = configureStore({
  reducer: {
    year: yearReducer,
  },
});

export type ReduxState = ReturnType<typeof store.getState>;
export type ReduxDispatch = typeof store.dispatch;

export default store;
