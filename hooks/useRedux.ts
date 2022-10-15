import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { ReduxState, ReduxDispatch } from "../store/store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useReduxDispatch: () => ReduxDispatch = useDispatch;
export const useReduxSelector: TypedUseSelectorHook<ReduxState> = useSelector;
