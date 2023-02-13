import { isSameYear, isSameMonth, getYear, getMonth } from "date-fns";
import { useState, useEffect } from "react";
import { capitalize, months } from "../../../helpers/strings";
import { useReduxSelector } from "../../../hooks/useRedux";
import { IncomeType } from "../../../models/Income";
import { selectDate } from "../../../redux/dateSlice";
import { selectIncome } from "../../../redux/incomeSlice";
import { Datum } from "../../elements/charts/types";

const useFilters = () => {
  const { date, dataTimeframe } = useReduxSelector(selectDate);
  const { incomes, incomeSortBy, incomeSortDir } =
    useReduxSelector(selectIncome);
  const [timeframedIncomes, setTimeframedIncomes] = useState<IncomeType[]>([]);
  const [sortedIncomes, setSortedIncomes] = useState<IncomeType[]>([]);
  const [categoryData, setCategoryData] = useState<Datum[]>([]);
  const [sourceData, setSourceData] = useState<Datum[]>([]);
  const [monthData, setMonthData] = useState<Datum[]>([]);
  const [yearData, setYearData] = useState<Datum[]>([]);

  // Arrays of the unique sources, categories, and years in the incomes
  const uniqueCategories = timeframedIncomes
    .map((income) => income.category.toLowerCase())
    .filter((value, index, self) => self.indexOf(value) === index);
  const uniqueSources = timeframedIncomes
    .map((income) => income.source.toLowerCase())
    .filter((value, index, self) => self.indexOf(value) === index);
  const uniqueYears = incomes
    .map((income) => getYear(new Date(income.date)))
    .filter((value, index, self) => self.indexOf(value) === index);

  // Total value reducer functions
  const totalValue = (total: number, income: IncomeType) =>
    total + income.amount;
  const totalByField =
    (field: "source" | "category", entry: string) =>
    (total: number, income: IncomeType) =>
      income[field].toLowerCase() === entry ? total + income.amount : total;
  const totalByMonth =
    (monthIndex: number) => (total: number, income: IncomeType) =>
      getMonth(new Date(income.date)) === monthIndex
        ? total + income.amount
        : total;
  const totalByYear = (index: number) => (total: number, income: IncomeType) =>
    getYear(new Date(income.date)) === uniqueYears[index]
      ? total + income.amount
      : total;

  // Income total and totals by field, month, & year
  const totalValueAllIncomes = timeframedIncomes.reduce(totalValue, 0);
  const totalValueByIncomeField = (
    field: "source" | "category",
    entry: string
  ) => timeframedIncomes.reduce(totalByField(field, entry), 0);
  const totalValueByIncomeMonth = (monthIndex: number) =>
    timeframedIncomes.reduce(totalByMonth(monthIndex), 0);
  const totalValueByIncomeYear = (yearIndex: number) =>
    timeframedIncomes.reduce(totalByYear(yearIndex), 0);

  // Income Graph Data Composers
  const dataByIncomeField = (field: "source" | "category"): Datum[] =>
    (field === "category" ? uniqueCategories : uniqueSources).map((entry) => {
      const entryTotal = totalValueByIncomeField(field, entry);
      return {
        name: capitalize(entry),
        value: entryTotal,
        percent: entryTotal / totalValueAllIncomes,
      };
    });
  const dataByIncomeMonth = (): Datum[] =>
    months.map((month, index) => {
      const monthTotal = totalValueByIncomeMonth(index);
      return {
        name: capitalize(month),
        value: monthTotal,
        percent: monthTotal / totalValueAllIncomes,
      };
    });
  const dataByIncomeYear = (): Datum[] =>
    uniqueYears.map((year, index) => {
      const yearTotal = totalValueByIncomeYear(index);
      return {
        name: year.toString(),
        value: yearTotal,
        percent: yearTotal / totalValueAllIncomes,
      };
    });

  // Income sorter for lists
  const sortIncomesByType = (a: IncomeType, b: IncomeType) => {
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

  // Limit incomes to the currently selected timeframe
  const filterIncomesByTimeframe = (inc: IncomeType, index: number) => {
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

  // Re-sort the incomes when the direction or sortBy change (list)
  useEffect(() => {
    setSortedIncomes(
      [...incomes].sort(sortIncomesByType).filter(filterIncomesByTimeframe)
    );
  }, [incomes, dataTimeframe, date, incomeSortBy, incomeSortDir]);

  // Re-filter the incomes when the date or timeframe change (graph)
  useEffect(() => {
    setTimeframedIncomes(incomes.filter(filterIncomesByTimeframe));
  }, [dataTimeframe, date, incomes]);

  // Recalculate the data when the incomes change (graph)
  useEffect(() => {
    if (timeframedIncomes) {
      setCategoryData(dataByIncomeField("category").sort(sortDataByPercent));
      setSourceData(dataByIncomeField("source").sort(sortDataByPercent));
      setMonthData(dataByIncomeMonth());
      setYearData(dataByIncomeYear().sort(sortDataAlphabetically));
    }
  }, [timeframedIncomes]);

  return { sortedIncomes, yearData, monthData, categoryData, sourceData };
};

export default useFilters;
