import { FC } from "react";
import { useReduxDispatch, useReduxSelector } from "../../../hooks/useRedux";
import {
  selectExpense,
  toggleAddExpenseModal,
  toggleDeleteExpenseModal,
  toggleEditExpenseModal,
  toggleExpenseColumnModal,
} from "../../../redux/expenseSlice";
import DataWindow from "../../elements/containers/DataWindow";
import PageWindow from "../../elements/containers/PageWindow";
import ExpenseGraph from "./ExpenseGraph";
import ExpenseTable from "./ExpenseTable";
import AddExpense from "./modals/AddExpense";
import DeleteExpense from "./modals/DeleteExpense";
import EditExpense from "./modals/EditExpense";
import ToggleExpenseColumns from "./modals/ToggleExpenseColumns";

const ExpensePage: FC = () => {
  const dispatch = useReduxDispatch();
  const {
    expenseWindow,
    expenseAddModalOpen,
    expenseColumnModalOpen,
    expenseDeleteModalOpen,
    expenseEditModalOpen,
  } = useReduxSelector(selectExpense);

  return (
    <PageWindow>
      <DataWindow dataType="expense">
        {expenseWindow === "list" ? <ExpenseTable /> : <ExpenseGraph />}
      </DataWindow>

      <AddExpense
        opened={expenseAddModalOpen}
        toggle={() => dispatch(toggleAddExpenseModal())}
      />
      <EditExpense
        opened={expenseEditModalOpen}
        toggle={() => dispatch(toggleEditExpenseModal())}
      />
      <DeleteExpense
        opened={expenseDeleteModalOpen}
        toggle={() => dispatch(toggleDeleteExpenseModal())}
      />
      <ToggleExpenseColumns
        opened={expenseColumnModalOpen}
        toggle={() => dispatch(toggleExpenseColumnModal())}
      />
    </PageWindow>
  );
};

export default ExpensePage;
