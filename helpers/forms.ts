import { CatalogType } from "../models/Catalog";
import { IncomeType } from "../models/Income";
import { IncomeMode } from "../redux/incomeSlice";
import { formatDateForInput } from "./dates";

export const defaultName = (mode: IncomeMode, inc?: IncomeType): string => {
  if (!inc) return "";
  else return mode === "editing" ? (inc?.name ? inc.name : "") : "";
};

export const defaultAmount = (mode: IncomeMode, inc?: IncomeType): string => {
  if (!inc) return "";
  else
    return mode === "editing" ? (inc?.amount ? inc.amount.toString() : "") : "";
};

type IncomeOptionField = "source" | "category";
export const defaultIncomeOption = ({
  income,
  catalog,
  field,
  mode,
}: {
  income?: IncomeType;
  catalog: CatalogType | null;
  field: IncomeOptionField;
  mode: IncomeMode;
}): string => {
  if (!catalog?.income) return "";
  // Get the first option from the catalog for the given (pluralized) field
  const fromCatalog =
    catalog?.income[field === "category" ? "categories" : "sources"][0] ?? "";
  if (!income || mode === "adding") return fromCatalog;
  else if (mode === "editing") return income[field] ?? fromCatalog;
  else return fromCatalog;
};

export const defaultDate = (mode: IncomeMode, inc?: IncomeType): string => {
  if (!inc) return formatDateForInput(new Date());
  else
    return mode === "editing"
      ? inc?.date
        ? formatDateForInput(inc.date)
        : formatDateForInput(new Date())
      : formatDateForInput(new Date());
};

export const defaultCurrency = (mode: IncomeMode, inc?: IncomeType) => {
  if (!inc) return "$";
  else return mode === "editing" ? (inc?.currency ? inc.currency : "$") : "$";
};
