import { getMonth, getYear } from "date-fns";
import type { ExpenseType } from "../../../../models/Expense";
import type { IncomeType } from "../../../../models/Income";
import type { TradeType } from "../../../../models/types";

// These are provided to array reducer functions to get total values

// Totals for All
export const totalValue = (total: number, trade: TradeType) =>
  total + trade.amount;

// Totals by Field
export const totalByIncomeField =
  (field: "source" | "category", entry: string) =>
  (total: number, trade: IncomeType) =>
    trade[field].toLowerCase() === entry ? total + trade.amount : total;
export const totalByExpenseField =
  (field: "location" | "category", entry: string) =>
  (total: number, trade: ExpenseType) =>
    trade[field].toLowerCase() === entry ? total + trade.amount : total;

// Totals by Month
export const totalByMonth =
  (monthIndex: number) => (total: number, trade: TradeType) =>
    getMonth(new Date(trade.date)) === monthIndex
      ? total + trade.amount
      : total;

// Totals by Year
export const totalByYear =
  (yearArray: number[], index: number) => (total: number, trade: TradeType) =>
    getYear(new Date(trade.date)) === yearArray[index]
      ? total + trade.amount
      : total;
