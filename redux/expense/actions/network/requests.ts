import { createAsyncThunk } from "@reduxjs/toolkit";
import { ExpenseType } from "../../../../models/Expense";
import { AddExpenseProps, DeleteExpenseProps, EditExpenseProps } from "./types";

const expenseRequest =
  (method: string) =>
  async (
    props?: AddExpenseProps | EditExpenseProps | DeleteExpenseProps
  ): Promise<ExpenseType[]> => {
    try {
      return await (
        await fetch("/api/expense", {
          method,
          body: props ? JSON.stringify(props) : undefined,
        })
      ).json();
    } catch (e) {
      throw new Error(`Expense Error: ${e}`);
    }
  };

export const getInitialExpenses = createAsyncThunk(
  "expense/load",
  expenseRequest("GET")
);

export const editExpense = createAsyncThunk(
  "expense/edit",
  expenseRequest("PUT")
);

export const addExpense = createAsyncThunk(
  "expense/add",
  expenseRequest("POST")
);

export const deleteExpense = createAsyncThunk(
  "expense/delete",
  expenseRequest("DELETE")
);
