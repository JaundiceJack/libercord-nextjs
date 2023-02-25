import { PayloadAction } from "@reduxjs/toolkit";
import { IncomeType } from "../../../../models/Income";
import { IncomeState } from "../../slice";

export const pending = (state: IncomeState) => {
  state.incomeLoading = true;
};

export const getFulfilled = (
  state: IncomeState,
  action: PayloadAction<IncomeType[]>
) => {
  state.incomeLoading = false;
  state.incomes = action.payload;
};

export const addFulfilled = (
  state: IncomeState,
  action: PayloadAction<IncomeType[]>
) => {
  state.incomeLoading = false;
  state.incomes = action.payload;
  state.incomeAddModalOpen = false;
};

export const editFulfilled = (
  state: IncomeState,
  action: PayloadAction<IncomeType[]>
) => {
  state.incomeLoading = false;
  state.incomes = action.payload;
  state.incomeEditModalOpen = false;
};

export const deleteFulfilled = (
  state: IncomeState,
  action: PayloadAction<IncomeType[]>
) => {
  state.incomeLoading = false;
  state.incomes = action.payload;
  state.incomeDeleteModalOpen = false;
  state.incomeId = null;
};

export const rejected = (
  state: IncomeState,
  action: PayloadAction<unknown, string>
) => {
  state.incomeLoading = false;
  state.incomeError =
    typeof action.payload === "string" ? action.payload : undefined;
};
