import { useEffect, useMemo, useState } from "react";
import { Datum } from "../../../components/elements/charts/types";
import { useReduxSelector } from "../../useRedux";
import { ExpenseType } from "../../../models/Expense";
import { IncomeType } from "../../../models/Income";
import { selectCatalog } from "../../../redux/catalogSlice";
import { selectDate } from "../../../redux/dateSlice";
import { selectExpense } from "../../../redux/expenseSlice";
import { selectIncome } from "../../../redux/incomeSlice";
import { filterByTimeframe } from "../filters";
import useDataComposer from "./useDataComposer";
import { totalValue } from "./useDataComposer/totalReducers";
import { capitalize, months } from "../../../helpers/strings";
import {
  totalValueAllExpenses,
  totalValueAllIncomes,
} from "./useDataComposer/totalValues";
import useMakeDatum from "./useMakeDatum";
import { selectSummary } from "../../../redux/summarySlice";

const useChartData = () => {
  // States from Redux
  const { date, dataTimeframe } = useReduxSelector(selectDate);
  const { incomes } = useReduxSelector(selectIncome);
  const { expenses } = useReduxSelector(selectExpense);
  const { summaryLines } = useReduxSelector(selectSummary);

  // Trades filtered by the currently set timeframe,
  const [timeframedIncomes, setTimeframedIncomes] = useState<IncomeType[]>([]);
  const [timeframedExpenses, setTimeframedExpenses] = useState<ExpenseType[]>(
    []
  );
  const refilterIncomes = () =>
    setTimeframedIncomes(
      incomes.filter(filterByTimeframe({ date, dataTimeframe }))
    );
  const refilterExpenses = () =>
    setTimeframedExpenses(
      expenses.filter(filterByTimeframe({ date, dataTimeframe }))
    );

  // Refilter trades on load and when the time or data change
  useEffect(() => {
    refilterIncomes();
    refilterExpenses();
  }, []);
  useEffect(() => {
    refilterIncomes();
  }, [incomes, dataTimeframe, date]);
  useEffect(() => {
    refilterExpenses();
  }, [expenses, dataTimeframe, date]);

  // Graph Data by Field
  const [incomeCategoryData, setIncomeCategoryData] = useState<Datum[]>([]);
  const [incomeSourceData, setIncomeSourceData] = useState<Datum[]>([]);
  const [expenseCategoryData, setExpenseCategoryData] = useState<Datum[]>([]);
  const [expenseLocationData, setExpenseLocationData] = useState<Datum[]>([]);

  // Graph Data by Month
  const [incomeMonthlyData, setIncomeMonthlyData] = useState<Datum[]>([]);
  const [expenseMonthlyData, setExpenseMonthlyData] = useState<Datum[]>([]);
  const [savingsMonthlyData, setSavingsMonthlyData] = useState<Datum[]>([]);
  const [summaryMonthlyData, setSummaryMonthlyData] = useState<Datum[]>([]);

  // Graph Data by Year
  const [incomeYearlyData, setIncomeYearlyData] = useState<Datum[]>([]);
  const [expenseYearlyData, setExpenseYearlyData] = useState<Datum[]>([]);
  const [savingsYearlyData, setSavingsYearlyData] = useState<Datum[]>([]);
  const [summaryYearlyData, setSummaryYearlyData] = useState<Datum[]>([]);

  // Composers for By-Field, Monthly, & Yearly Graph Data
  const {
    dataByField,
    dataByMonth,
    dataByYear,
    savingsByMonth,
    savingsByYear,
    summaryByMonth,
    summaryByYear,
  } = useDataComposer({
    incomes: timeframedIncomes,
    expenses: timeframedExpenses,
  });

  // Recalculate the data when it gets refiltered
  useEffect(() => {
    if (timeframedIncomes) {
      setIncomeCategoryData(
        dataByField({ type: "income", incomeField: "category" })
      );
      setIncomeSourceData(
        dataByField({ type: "income", incomeField: "source" })
      );
      setIncomeMonthlyData(dataByMonth({ type: "income" }));
      setIncomeYearlyData(dataByYear({ type: "income" }));
    }
  }, [timeframedIncomes]);

  useEffect(() => {
    if (timeframedExpenses) {
      setExpenseCategoryData(
        dataByField({ type: "expense", expenseField: "category" })
      );
      setExpenseLocationData(
        dataByField({ type: "expense", expenseField: "location" })
      );
      setExpenseMonthlyData(dataByMonth({ type: "expense" }));
      setExpenseYearlyData(dataByYear({ type: "expense" }));
    }
  }, [timeframedExpenses]);

  useEffect(() => {
    setSavingsMonthlyData(
      savingsByMonth({ incomeMonthlyData, expenseMonthlyData })
    );
  }, [incomeMonthlyData, expenseMonthlyData]);

  useEffect(() => {
    setSavingsYearlyData(
      savingsByYear({ incomeYearlyData, expenseYearlyData })
    );
  }, [incomeYearlyData, expenseYearlyData]);

  useEffect(() => {
    setSummaryMonthlyData(
      summaryByMonth({
        incomeMonthlyData,
        expenseMonthlyData,
        savingsMonthlyData,
      })
    );
  }, [incomeMonthlyData, expenseMonthlyData, savingsMonthlyData, summaryLines]);

  useEffect(() => {
    setSummaryYearlyData(
      summaryByYear({
        incomeYearlyData,
        expenseYearlyData,
        savingsYearlyData,
      })
    );
  }, [incomeYearlyData, expenseYearlyData, savingsYearlyData, summaryLines]);

  return {
    incomeCategoryData,
    incomeSourceData,
    expenseCategoryData,
    expenseLocationData,
    incomeMonthlyData,
    incomeYearlyData,
    expenseMonthlyData,
    expenseYearlyData,
    summaryYearlyData,
    summaryMonthlyData,
  };
};

export default useChartData;
