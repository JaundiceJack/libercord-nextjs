import { ReduxState } from "../store";
import { incomeSlice } from "./slice";

export {
  getInitialIncomes,
  editIncome,
  addIncome,
  deleteIncome,
} from "./actions/network/requests";

export const selectIncome = (state: ReduxState) => state.income;

export const {
  resetIncome,
  pickIncome,
  unpickIncome,
  toggleAddIncomeModal,
  toggleEditIncomeModal,
  toggleDeleteIncomeModal,
  toggleIncomeColumnModal,
  clearIncomeError,
  setIncomeSortBy,
  setIncomeWindow,
  toggleIncomeColumn,
  setIncomeColumns,
  exportIncomeData,
  setIncomeChartType,
  setIncomeViewBy,
} = incomeSlice.actions;

export default incomeSlice.reducer;
