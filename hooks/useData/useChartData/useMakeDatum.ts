import { capitalize } from "../../../helpers/strings";
import { selectExpense } from "../../../redux/expenseSlice";
import { selectIncome } from "../../../redux/incomeSlice";
import { useReduxSelector } from "../../useRedux";
import {
  totalValueAllIncomes,
  totalValueAllExpenses,
} from "./useDataComposer/totalValues";

const useMakeDatum = () => {
  const { incomes } = useReduxSelector(selectIncome);
  const { expenses } = useReduxSelector(selectExpense);

  return ({
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
};

export default useMakeDatum;
