import { isSameYear, isSameMonth, getYear, getMonth } from "date-fns";
import { useState, useEffect } from "react";
import { capitalize, months } from "../../../helpers/strings";
import { useReduxSelector } from "../../../hooks/useRedux";
import { ExpenseType } from "../../../models/Expense";
import { selectDate } from "../../../redux/dateSlice";
import { selectExpense } from "../../../redux/expenseSlice";
import { Datum } from "../../elements/charts/types";

const useFilters = () => {
  const { date, dataTimeframe } = useReduxSelector(selectDate);
  const { expenses, expenseSortBy, expenseSortDir } =
    useReduxSelector(selectExpense);
  const [timeframedExpenses, setTimeframedExpenses] = useState<ExpenseType[]>(
    []
  );
  const [sortedExpenses, setSortedExpenses] = useState<ExpenseType[]>([]);
  const [categoryData, setCategoryData] = useState<Datum[]>([]);
  const [locationData, setLocationData] = useState<Datum[]>([]);
  const [monthData, setMonthData] = useState<Datum[]>([]);
  const [yearData, setYearData] = useState<Datum[]>([]);

  // Arrays of the unique locations, categories, and years in the expenses
  const uniqueCategories = timeframedExpenses
    .map((expense) => expense.category.toLowerCase())
    .filter((value, index, self) => self.indexOf(value) === index);
  const uniqueLocations = timeframedExpenses
    .map((expense) => expense.location.toLowerCase())
    .filter((value, index, self) => self.indexOf(value) === index);
  const uniqueYears = expenses
    .map((expense) => getYear(new Date(expense.date)))
    .filter((value, index, self) => self.indexOf(value) === index);

  // Total value reducer functions
  const totalValue = (total: number, expense: ExpenseType) =>
    total + expense.amount;
  const totalByField =
    (field: "location" | "category", entry: string) =>
    (total: number, expense: ExpenseType) =>
      expense[field].toLowerCase() === entry ? total + expense.amount : total;
  const totalByMonth =
    (monthIndex: number) => (total: number, expense: ExpenseType) =>
      getMonth(new Date(expense.date)) === monthIndex
        ? total + expense.amount
        : total;
  const totalByYear =
    (index: number) => (total: number, expense: ExpenseType) =>
      getYear(new Date(expense.date)) === uniqueYears[index]
        ? total + expense.amount
        : total;

  // Expense total and totals by field, month, & year
  const totalValueAllExpenses = timeframedExpenses.reduce(totalValue, 0);
  const totalValueByExpenseField = (
    field: "location" | "category",
    entry: string
  ) => timeframedExpenses.reduce(totalByField(field, entry), 0);
  const totalValueByExpenseMonth = (monthIndex: number) =>
    timeframedExpenses.reduce(totalByMonth(monthIndex), 0);
  const totalValueByExpenseYear = (yearIndex: number) =>
    timeframedExpenses.reduce(totalByYear(yearIndex), 0);

  // Expense Graph Data Composers
  const dataByExpenseField = (field: "location" | "category"): Datum[] =>
    (field === "category" ? uniqueCategories : uniqueLocations).map((entry) => {
      const entryTotal = totalValueByExpenseField(field, entry);
      return {
        name: capitalize(entry),
        value: entryTotal,
        percent: entryTotal / totalValueAllExpenses,
      };
    });
  const dataByExpenseMonth = (): Datum[] =>
    months.map((month, index) => {
      const monthTotal = totalValueByExpenseMonth(index);
      return {
        name: capitalize(month),
        value: monthTotal,
        percent: monthTotal / totalValueAllExpenses,
      };
    });
  const dataByExpenseYear = (): Datum[] =>
    uniqueYears.map((year, index) => {
      const yearTotal = totalValueByExpenseYear(index);
      return {
        name: year.toString(),
        value: yearTotal,
        percent: yearTotal / totalValueAllExpenses,
      };
    });

  // Expense sorter for lists
  const sortExpensesByType = (a: ExpenseType, b: ExpenseType) => {
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

  // Limit expenses to the currently selected timeframe
  const filterExpensesByTimeframe = (inc: ExpenseType, index: number) => {
    const incDate = new Date(inc.date);
    return dataTimeframe === "year"
      ? isSameYear(incDate, date)
      : dataTimeframe === "month"
      ? isSameMonth(incDate, date)
      : true;
  };

  // Data sorters (graph-legend)
  const sortDataByPercent = (a: Datum, b: Datum) =>
    a.percent! > b.percent! ? -1 : 1;
  const sortDataAlphabetically = (a: Datum, b: Datum) =>
    Number(a.name) > Number(b.name) ? 1 : -1;

  // Re-sort the expenses when the direction or sortBy change (list)
  useEffect(() => {
    setSortedExpenses(
      [...expenses].sort(sortExpensesByType).filter(filterExpensesByTimeframe)
    );
  }, [expenses, dataTimeframe, date, expenseSortBy, expenseSortDir]);

  // Re-filter the expenses when the date or timeframe change (graph)
  useEffect(() => {
    setTimeframedExpenses(expenses.filter(filterExpensesByTimeframe));
  }, [dataTimeframe, date, expenses]);

  // Recalculate the data when the expenses change (graph)
  useEffect(() => {
    if (timeframedExpenses) {
      setCategoryData(dataByExpenseField("category").sort(sortDataByPercent));
      setLocationData(dataByExpenseField("location").sort(sortDataByPercent));
      setMonthData(dataByExpenseMonth());
      setYearData(dataByExpenseYear().sort(sortDataAlphabetically));
    }
  }, [timeframedExpenses]);

  return { sortedExpenses, yearData, monthData, categoryData, locationData };
};

export default useFilters;
