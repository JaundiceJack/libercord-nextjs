import type { ExpenseType } from "./Expense";
import type { IncomeType } from "./Income";

export type Currencies = "$" | "₿" | "€" | "₱" | "¥";

export type TradeType = ExpenseType | IncomeType;

type SequentialChartOptions = "line" | "bar";
type DistributionChartOptions = "pie" | "radar";

export type SummaryChartTypeOption = SequentialChartOptions;
export type IncomeChartTypeOption =
  | SequentialChartOptions
  | DistributionChartOptions;
export type ExpenseChartTypeOption =
  | SequentialChartOptions
  | DistributionChartOptions;
