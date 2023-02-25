import { useMemo } from "react";
import { CatalogType } from "../../../../../models/Catalog";
import { ExpenseType } from "../../../../../models/Expense";
import { IncomeType } from "../../../../../models/Income";
import { selectCatalog } from "../../../../../redux/catalog";
import { useReduxSelector } from "../../../../useRedux";
import {
  uniqueIncomeCategories,
  uniqueExpenseCategories,
  uniqueIncomeSources,
  uniqueExpenseLocations,
  uniqueDataYears,
} from "./unique";

const useUniqueData = ({
  incomes,
  expenses,
}: {
  incomes: IncomeType[];
  expenses: ExpenseType[];
}) => {
  const { catalog } = useReduxSelector(selectCatalog);

  const incomeCategories = useMemo(
    () => uniqueIncomeCategories(incomes),
    [incomes, catalog?.income?.categories]
  );
  const expenseCategories = useMemo(
    () => uniqueExpenseCategories(expenses),
    [expenses, catalog?.expense?.categories]
  );
  const incomeSources = useMemo(
    () => uniqueIncomeSources(incomes),
    [incomes, catalog?.income?.sources]
  );
  const expenseLocations = useMemo(
    () => uniqueExpenseLocations(expenses),
    [expenses, catalog?.expense?.locations]
  );
  const years = useMemo(
    () => uniqueDataYears(incomes, expenses),
    [incomes, expenses]
  );

  return {
    incomeCategories,
    expenseCategories,
    incomeSources,
    expenseLocations,
    years,
  };
};

export default useUniqueData;
