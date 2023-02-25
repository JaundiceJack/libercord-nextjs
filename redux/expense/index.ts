import { ReduxState } from "../store";
import { expenseSlice } from "./slice";

export {
  getInitialExpenses,
  editExpense,
  addExpense,
  deleteExpense,
} from "./actions/network/requests";

export const selectExpense = (state: ReduxState) => state.expense;

export const {
  resetExpense,
  pickExpense,
  unpickExpense,
  toggleAddExpenseModal,
  toggleEditExpenseModal,
  toggleDeleteExpenseModal,
  toggleExpenseColumnModal,
  clearExpenseError,
  setExpenseSortBy,
  setExpenseWindow,
  toggleExpenseColumn,
  setExpenseColumns,
  exportExpenseData,
  setExpenseChartType,
  setExpenseViewBy,
} = expenseSlice.actions;

export default expenseSlice.reducer;
