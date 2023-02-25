import { createAsyncThunk } from "@reduxjs/toolkit";
import { IncomeType } from "../../../../models/Income";
import { AddIncomeProps, DeleteIncomeProps, EditIncomeProps } from "./types";

const incomeRequest =
  (method: string) =>
  async (
    props?: AddIncomeProps | EditIncomeProps | DeleteIncomeProps
  ): Promise<IncomeType[]> => {
    try {
      return await (
        await fetch("/api/income", {
          method,
          body: props ? JSON.stringify(props) : undefined,
        })
      ).json();
    } catch (e) {
      throw new Error(`Income Error: ${e}`);
    }
  };

export const getInitialIncomes = createAsyncThunk(
  "income/load",
  incomeRequest("GET")
);

export const editIncome = createAsyncThunk("income/edit", incomeRequest("PUT"));

export const addIncome = createAsyncThunk("income/add", incomeRequest("POST"));

export const deleteIncome = createAsyncThunk(
  "income/delete",
  incomeRequest("DELETE")
);
