import type { ExpenseType } from "./Expense";
import type { IncomeType } from "./Income";

export type Currencies = "$" | "₿" | "€" | "₱" | "¥";

export type TradeType = ExpenseType | IncomeType;

export type SequentialChartPreference = "line" | "bar" | "area";
export type DistributionChartPreference = "pie" | "tree" | "radar";
