export type WindowOption = "list" | "graph";
export type SortDirection = "asc" | "desc";
export type Mode = "idle" | "adding" | "editing" | "deleting";

type GraphOption = "pie" | "radar" | "bar" | "line";

export type IncomeSortOption = "date" | "source" | "category" | "amount";
export type IncomeViewByOption = "source" | "category";
export type IncomeGraphOption = GraphOption;

export type ExpenseSortOption = "date" | "location" | "category" | "amount";
export type ExpenseViewByOption = "location" | "category";
export type ExpenseGraphOption = GraphOption;

export type DistributionChartOption = "pie" | "radar" | "tree";
export type SequentialChartOption = "line" | "bar" | "area";
export type ModeOption = "sequential" | "distribution"; // Or Time and Quantity for short
