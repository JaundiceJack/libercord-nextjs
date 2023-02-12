import { FC, useState } from "react";
import { useReduxDispatch, useReduxSelector } from "../../../hooks/useRedux";
import DataWindow from "../../elements/containers/DataWindow";
import ExpenseGraph from "./ExpenseGraph";
import ExpenseTable from "./ExpenseTable";
import { selectExpense, setExpenseWindow } from "../../../redux/expenseSlice";
import tocsv from "papaparse";
import { saveAs } from "file-saver";
import { formatDateMMDDYYYY } from "../../../helpers/dates";
import EditExpenseColumns from "./modals/EditExpenseColumns";
import AddExpense from "./modals/AddExpense";
import EditExpense from "./modals/EditExpense";
import DeleteExpense from "./modals/DeleteExpense";
import PageWindow from "../../elements/containers/PageWindow";

const ExpensePage: FC = () => {
  const dispatch = useReduxDispatch();
  const { expenseId, expenses, expenseWindow } =
    useReduxSelector(selectExpense);
  const [columnModalOpen, setColumnModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Export data to a .csv file for the user to do w/e with it
  const exportExpenseData = () => {
    const filteredExpenses = expenses.map((exp) => {
      return {
        name: exp.name,
        category: exp.category,
        location: exp.location,
        currency: exp.currency,
        amount: exp.amount,
        date: exp.date,
      };
    });
    const data = tocsv.unparse(filteredExpenses);
    saveAs(
      new Blob([data]),
      `Expense_Data-${formatDateMMDDYYYY(new Date())}.csv`
    );
  };

  return (
    <PageWindow>
      <DataWindow
        dataType="expense"
        isSelected={expenseId !== null}
        currentWindow={expenseWindow}
        openAddModal={() => setAddModalOpen(true)}
        openEditModal={() => setEditModalOpen(true)}
        openDeleteModal={() => setDeleteModalOpen(true)}
        openColumnModal={() => setColumnModalOpen(true)}
        exportData={() => {
          exportExpenseData();
        }}
        setWindow={() =>
          dispatch(
            setExpenseWindow(expenseWindow === "list" ? "graph" : "list")
          )
        }
      >
        {expenseWindow === "list" ? <ExpenseTable /> : <ExpenseGraph />}
      </DataWindow>

      <AddExpense
        opened={addModalOpen}
        toggle={() => setAddModalOpen(!addModalOpen)}
      />
      <EditExpense
        opened={editModalOpen}
        toggle={() => setEditModalOpen(!editModalOpen)}
      />
      <DeleteExpense
        opened={deleteModalOpen}
        toggle={() => setDeleteModalOpen(!deleteModalOpen)}
      />
      <EditExpenseColumns
        opened={columnModalOpen}
        toggle={() => setColumnModalOpen(!columnModalOpen)}
      />
    </PageWindow>
  );
};

export default ExpensePage;
