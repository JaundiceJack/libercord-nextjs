import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, DispatchType } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useTypedDispatch: () => DispatchType = useDispatch;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
