import { Datum } from "../../components/elements/charts/types";
import { ExpenseType } from "../../models/Expense";
import { IncomeType } from "../../models/Income";
import { ExpenseSortOption } from "../../redux/expenseSlice";
import { IncomeSortOption } from "../../redux/incomeSlice";
import { SortDirection } from "../../redux/types";

// By Datum Percent
export const sortDataByPercent = (a: Datum, b: Datum) =>
  a.percent! > b.percent! ? -1 : 1;

// By Datum Name
export const sortDataAlphabetically = (a: Datum, b: Datum) =>
  Number(a.name) > Number(b.name) ? 1 : -1;

// By Datum Value
export const sortDataByValue = (a: Datum, b: Datum) =>
  a.value > b.value ? -1 : 1;

// Income sorter for lists
export const sortIncomesByColumn =
  (incomeSortBy: IncomeSortOption, incomeSortDir: SortDirection) =>
  (a: IncomeType, b: IncomeType) => {
    switch (incomeSortBy) {
      case "date": // Sort Dates
        const date1 = new Date(a.date);
        const date2 = new Date(b.date);
        return incomeSortDir === "desc"
          ? date1.getTime() - date2.getTime()
          : date2.getTime() - date1.getTime();
      case "amount": // Sort Numbers
        return incomeSortDir === "asc"
          ? b.amount - a.amount
          : a.amount - b.amount;
      case "category":
      case "source": // Sort Strings
        return incomeSortDir === "asc"
          ? a[incomeSortBy] < b[incomeSortBy]
            ? 1
            : -1
          : a[incomeSortBy] > b[incomeSortBy]
          ? 1
          : -1;
      default:
        return 0;
    }
  };

// Expense sorter for lists
export const sortExpensesByColumn =
  (expenseSortBy: ExpenseSortOption, expenseSortDir: SortDirection) =>
  (a: ExpenseType, b: ExpenseType) => {
    switch (expenseSortBy) {
      case "date": // Sort Dates
        const date1 = new Date(a.date);
        const date2 = new Date(b.date);
        return expenseSortDir === "desc"
          ? date1.getTime() - date2.getTime()
          : date2.getTime() - date1.getTime();
      case "amount": // Sort Numbers
        return expenseSortDir === "asc"
          ? b.amount - a.amount
          : a.amount - b.amount;
      case "category":
      case "location": // Sort Strings
        return expenseSortDir === "asc"
          ? a[expenseSortBy] < b[expenseSortBy]
            ? 1
            : -1
          : a[expenseSortBy] > b[expenseSortBy]
          ? 1
          : -1;
      default:
        return 0;
    }
  };
