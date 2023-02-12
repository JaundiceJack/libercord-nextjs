import { CatalogType } from "../../models/Catalog";
import { ExpenseType } from "../../models/Expense";
import { IncomeType } from "../../models/Income";
import { Mode } from "../../redux/types";
import { formatDateForInput } from "../dates";

export const defaultName = (selected?: IncomeType | ExpenseType): string => {
  return selected?.name || "";
};

export const defaultAmount = (selected?: IncomeType | ExpenseType): string => {
  return selected?.amount?.toString() || "";
};

export const defaultDate = (selected?: IncomeType | ExpenseType): string => {
  return selected?.date
    ? formatDateForInput(selected.date)
    : formatDateForInput(new Date());
};

export const defaultCurrency = (selected?: IncomeType | ExpenseType) => {
  return selected?.currency || "$";
};

export const defaultSource = (
  catalog: CatalogType | null,
  selected?: IncomeType
): string => {
  if (!catalog?.income) return "";
  const fromCatalog = catalog?.income?.sources[0] || "";
  return selected?.source || fromCatalog;
};

export const defaultExpenseCategory = (
  catalog: CatalogType | null,
  selected?: ExpenseType
) => {
  if (!catalog?.expense) return "";
  const fromCatalog = catalog?.expense?.categories[0] || "";
  return selected?.category || fromCatalog;
};

export const defaultIncomeCategory = (
  catalog: CatalogType | null,
  selected?: IncomeType
) => {
  if (!catalog?.income) return "";
  const fromCatalog = catalog?.income?.categories[0] || "";
  return selected?.category || fromCatalog;
};

export const defaultLocation = (
  catalog: CatalogType | null,
  selected?: ExpenseType
): string => {
  if (!catalog?.expense) return "";
  const fromCatalog = catalog?.expense?.locations[0] || "";
  return selected?.location || fromCatalog;
};
