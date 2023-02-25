import { getYear } from "date-fns";
import type { Datum } from "../../../../components/elements/charts/types";
import { capitalize, months } from "../../../../helpers/strings";
import type { ExpenseType } from "../../../../models/Expense";
import type { IncomeType } from "../../../../models/Income";
import { TradeType } from "../../../../models/types";
import { selectDate } from "../../../../redux/date";
import { selectExpense } from "../../../../redux/expense";
import { selectIncome } from "../../../../redux/income";
import { selectPreferences } from "../../../../redux/preferences";
import { selectSummary } from "../../../../redux/summary";
import { useReduxSelector } from "../../../useRedux";
import { sortDataAlphabetically, sortDataByValue } from "../../sorters";
import { totalValue } from "./totalReducers";
import {
  totalValueAllExpenses,
  totalValueAllIncomes,
  totalValueByExpenseField,
  totalValueByIncomeField,
  totalValueByMonth,
  totalValueByYear,
} from "./totalValues";
import useUniqueData from "./useUniqueData";

const useDataComposer = ({
  incomes,
  expenses,
}: {
  incomes: IncomeType[];
  expenses: ExpenseType[];
}) => {
  const { summaryLines } = useReduxSelector(selectSummary);
  const { initialSavings, preferencesLoading } =
    useReduxSelector(selectPreferences);
  const { incomes: allIncomes } = useReduxSelector(selectIncome);
  const { expenses: allExpenses } = useReduxSelector(selectExpense);
  const { date } = useReduxSelector(selectDate);

  console.log("loading prefs:", preferencesLoading);

  const filterByOccursBefore =
    (year: number, month?: number) => (trade: TradeType, i: number) =>
      new Date(trade?.date) < new Date(year, month || 0);

  const totalTillMonth = (year: number, month?: number) => {
    const incomesTillMonth = allIncomes
      .filter(filterByOccursBefore(year, month))
      .reduce(totalValue, 0);
    const expensesTillMonth = allExpenses
      .filter(filterByOccursBefore(year, month))
      .reduce(totalValue, 0);
    return incomesTillMonth - expensesTillMonth;
  };

  // Arrays of the unique fields and years found in the data
  const {
    incomeCategories,
    incomeSources,
    expenseCategories,
    expenseLocations,
    years,
  } = useUniqueData({
    incomes,
    expenses,
  });

  // Graph Data Composers
  const selectFieldData = (type: "income" | "expense", field: string) =>
    type === "income"
      ? field === "category"
        ? incomeCategories
        : incomeSources
      : field === "category"
      ? expenseCategories
      : expenseLocations;

  const datumIncomeFieldTotal = ({
    field,
    entry,
  }: {
    field?: "source" | "category";
    entry: string;
  }) => {
    return field ? totalValueByIncomeField(incomes, field, entry) : 0;
  };

  const datumExpenseFieldTotal = ({
    field,
    entry,
  }: {
    field?: "location" | "category";
    entry: string;
  }) => {
    return field ? totalValueByExpenseField(expenses, field, entry) : 0;
  };

  const makeDatum = ({
    type,
    name,
    total,
  }: {
    type: "income" | "expense" | "savings";
    name: string;
    total: number;
  }) => ({
    name: capitalize(name),
    value: total,
    percent:
      total /
      (type === "income"
        ? totalValueAllIncomes(incomes)
        : type === "expense"
        ? totalValueAllExpenses(expenses)
        : totalValueAllIncomes(incomes) - totalValueAllExpenses(expenses)),
  });

  // By Field
  const dataByField = ({
    type,
    incomeField,
    expenseField,
  }: {
    type: "income" | "expense";
    incomeField?: "source" | "category";
    expenseField?: "location" | "category";
  }): Datum[] =>
    selectFieldData(
      type,
      type === "income" ? incomeField || "" : expenseField || ""
    )
      .map((entry: string) =>
        makeDatum({
          type,
          name: entry,
          total:
            type === "income"
              ? datumIncomeFieldTotal({ field: incomeField, entry })
              : datumExpenseFieldTotal({ field: expenseField, entry }),
        })
      )
      .sort(sortDataByValue);

  // By Month
  const dataByMonth = ({ type }: { type: "income" | "expense" }): Datum[] =>
    months.map((month, index) =>
      makeDatum({
        type,
        name: month,
        total: totalValueByMonth(
          type === "income" ? incomes : expenses,
          type,
          index
        ),
      })
    );

  // By Year
  const dataByYear = ({ type }: { type: "income" | "expense" }): Datum[] =>
    years
      .map((year, index) =>
        makeDatum({
          type,
          name: year.toString(),
          total: totalValueByYear(
            type === "income" ? incomes : expenses,
            type,
            years,
            index
          ),
        })
      )
      .sort(sortDataAlphabetically);

  const savingsByMonth = ({
    incomeMonthlyData,
    expenseMonthlyData,
  }: {
    incomeMonthlyData: Datum[];
    expenseMonthlyData: Datum[];
  }): Datum[] =>
    months.map((month, index) =>
      makeDatum({
        type: "savings",
        name: month,
        total:
          incomeMonthlyData[index]?.value - expenseMonthlyData[index]?.value,
      })
    );

  const savingsByYear = ({
    incomeYearlyData,
    expenseYearlyData,
  }: {
    incomeYearlyData: Datum[];
    expenseYearlyData: Datum[];
  }): Datum[] =>
    years.map((year, index) =>
      makeDatum({
        type: "savings",
        name: year.toString(),
        total: incomeYearlyData[index]?.value - expenseYearlyData[index]?.value,
      })
    );

  const summaryByMonth = ({
    incomeMonthlyData,
    expenseMonthlyData,
    savingsMonthlyData,
  }: {
    incomeMonthlyData: Datum[];
    expenseMonthlyData: Datum[];
    savingsMonthlyData: Datum[];
  }): Datum[] =>
    months.map((month, index) => ({
      name: capitalize(month),
      value: 0,
      income: summaryLines.includes("income")
        ? incomeMonthlyData[index]?.value
        : undefined,
      expense: summaryLines.includes("expense")
        ? expenseMonthlyData[index]?.value
        : undefined,
      savings: summaryLines.includes("savings")
        ? savingsMonthlyData[index]?.value
        : undefined,
      cash: summaryLines.includes("cash")
        ? initialSavings + totalTillMonth(getYear(date), index)
        : undefined,
    }));

  const summaryByYear = ({
    incomeYearlyData,
    expenseYearlyData,
    savingsYearlyData,
  }: {
    incomeYearlyData: Datum[];
    expenseYearlyData: Datum[];
    savingsYearlyData: Datum[];
  }): Datum[] =>
    years.map((year, index) => ({
      name: year.toString(),
      value: 0,
      income: summaryLines.includes("income")
        ? incomeYearlyData[index]?.value
        : undefined,
      expense: summaryLines.includes("expense")
        ? expenseYearlyData[index]?.value
        : undefined,
      savings: summaryLines.includes("savings")
        ? savingsYearlyData[index]?.value
        : undefined,
      cash: summaryLines.includes("cash")
        ? initialSavings + totalTillMonth(year)
        : undefined,
    }));

  return {
    dataByField,
    dataByMonth,
    dataByYear,
    savingsByMonth,
    savingsByYear,
    summaryByMonth,
    summaryByYear,
  };
};

export default useDataComposer;
