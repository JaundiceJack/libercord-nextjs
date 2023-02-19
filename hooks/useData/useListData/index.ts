import { isSameYear, isSameMonth, getYear, getMonth } from "date-fns";
import { useState, useEffect } from "react";
import { capitalize, months } from "../../../helpers/strings";
import { useReduxSelector } from "../../useRedux";
import { IncomeType } from "../../../models/Income";
import { selectDate } from "../../../redux/dateSlice";
import { selectIncome } from "../../../redux/incomeSlice";
import { Datum } from "../../../components/elements/charts/types";
import { ExpenseType } from "../../../models/Expense";
import { selectExpense } from "../../../redux/expenseSlice";
import { filterByTimeframe } from "../filters";
import { sortExpensesByColumn, sortIncomesByColumn } from "../sorters";

const useListData = () => {
  const { date, dataTimeframe } = useReduxSelector(selectDate);
  const { incomes, incomeSortBy, incomeSortDir } =
    useReduxSelector(selectIncome);
  const { expenses, expenseSortBy, expenseSortDir } =
    useReduxSelector(selectExpense);

  const [sortedIncomes, setSortedIncomes] = useState<IncomeType[]>([]);
  const [sortedExpenses, setSortedExpenses] = useState<ExpenseType[]>([]);

  // Re-sort when the direction or sortBy change (list)
  useEffect(() => {
    setSortedIncomes(
      [...incomes]
        .sort(sortIncomesByColumn(incomeSortBy, incomeSortDir))
        .filter(filterByTimeframe({ date, dataTimeframe }))
    );
  }, [incomes, dataTimeframe, date, incomeSortBy, incomeSortDir]);
  useEffect(() => {
    setSortedExpenses(
      [...expenses]
        .sort(sortExpensesByColumn(expenseSortBy, expenseSortDir))
        .filter(filterByTimeframe({ date, dataTimeframe }))
    );
  }, [expenses, dataTimeframe, date, incomeSortBy, incomeSortDir]);

  return { sortedIncomes, sortedExpenses };
};

export default useListData;
