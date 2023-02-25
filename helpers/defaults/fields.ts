import { CatalogType } from "../../models/Catalog";
import { ExpenseType } from "../../models/Expense";
import { IncomeType } from "../../models/Income";
import { Mode } from "../../redux/types";
import { formatDateForInput } from "../dates";

export const defaultName = (selected?: IncomeType | ExpenseType) =>
  selected?.name || "";

export const defaultAmount = (selected?: IncomeType | ExpenseType) =>
  selected?.amount?.toString() || "";

export const defaultDate = (selected?: IncomeType | ExpenseType) =>
  selected?.date
    ? formatDateForInput(selected.date)
    : formatDateForInput(new Date());

export const defaultCurrency = (selected?: IncomeType | ExpenseType) =>
  selected?.currency || "$";

export const defaultSource = (
  catalog: CatalogType | null,
  selected?: IncomeType
) => selected?.source || catalog?.income?.sources[0] || "";

export const defaultExpenseCategory = (
  catalog: CatalogType | null,
  selected?: ExpenseType
) => selected?.category || catalog?.expense?.categories[0] || "";

export const defaultIncomeCategory = (
  catalog: CatalogType | null,
  selected?: IncomeType
) => selected?.category || catalog?.income?.categories[0] || "";

export const defaultLocation = (
  catalog: CatalogType | null,
  selected?: ExpenseType
) => selected?.location || catalog?.expense?.locations[0] || "";

export const defaultOption = (
  field: "source" | "location" | "incomeCategory" | "expenseCategory",
  catalog: CatalogType | null,
  selected?: IncomeType | ExpenseType
) => {
  switch (field) {
    case "source":
      return defaultSource(catalog, selected as IncomeType);
    case "location":
      return defaultLocation(catalog, selected as ExpenseType);
    case "incomeCategory":
      return defaultIncomeCategory(catalog, selected as IncomeType);
    case "expenseCategory":
      return defaultExpenseCategory(catalog, selected as ExpenseType);
    default:
      return "";
  }
};
