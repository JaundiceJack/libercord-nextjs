import { ExpenseType } from "../../../../models/Expense";
import { IncomeType } from "../../../../models/Income";
import { TradeType } from "../../../../models/types";
import {
  totalValue,
  totalByIncomeField,
  totalByExpenseField,
  totalByMonth,
  totalByYear,
} from "./totalReducers";

/////////////////
// Totals for all
export const totalValueAllIncomes = (incomes: IncomeType[]) =>
  incomes.reduce(totalValue, 0);
export const totalValueAllExpenses = (expenses: ExpenseType[]) =>
  expenses.reduce(totalValue, 0);

//////////////////
// Totals by field
export const totalValueByIncomeField = (
  incomes: IncomeType[],
  field: "source" | "category",
  entry: string
) => incomes.reduce(totalByIncomeField(field, entry), 0);

export const totalValueByExpenseField = (
  expenses: ExpenseType[],
  field: "location" | "category",
  entry: string
) => expenses.reduce(totalByExpenseField(field, entry), 0);

//////////////////
// Totals by month
export const totalValueByMonth = (
  trades: TradeType[],
  type: "income" | "expense",
  monthIndex: number
) => trades.reduce(totalByMonth(monthIndex), 0);

/////////////////
// Totals by year
export const totalValueByYear = (
  trades: TradeType[],
  type: "income" | "expense",
  yearArray: number[],
  yearIndex: number
) => trades.reduce(totalByYear(yearArray, yearIndex), 0);
