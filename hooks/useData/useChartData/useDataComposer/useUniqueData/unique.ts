import { getYear } from "date-fns";
import { ExpenseType } from "../../../../../models/Expense";
import { IncomeType } from "../../../../../models/Income";

export const uniqueIncomeCategories = (incomes: IncomeType[]) =>
  incomes
    .map((income) => income?.category?.toLowerCase())
    .filter((value, index, self) => self.indexOf(value) === index);

export const uniqueExpenseCategories = (expenses: ExpenseType[]) =>
  expenses
    .map((expense) => expense?.category?.toLowerCase())
    .filter((value, index, self) => self.indexOf(value) === index);

export const uniqueIncomeSources = (incomes: IncomeType[]) =>
  incomes
    .map((income) => income?.source?.toLowerCase())
    .filter((value, index, self) => self.indexOf(value) === index);

export const uniqueExpenseLocations = (expenses: ExpenseType[]) =>
  expenses
    .map((expense) => expense?.location?.toLowerCase())
    .filter((value, index, self) => self.indexOf(value) === index);

export const uniqueDataYears = (
  incomes: IncomeType[],
  expenses: ExpenseType[]
) =>
  [
    ...incomes
      .map((income) => getYear(new Date(income.date)))
      .filter((value, index, self) => self.indexOf(value) === index),
    ...expenses
      .map((expense) => getYear(new Date(expense.date)))
      .filter((value, index, self) => self.indexOf(value) === index),
  ].filter((value, index, self) => self.indexOf(value) === index);
