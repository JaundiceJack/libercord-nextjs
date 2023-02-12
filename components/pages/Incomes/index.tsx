import { FC, useState } from "react";
import { useReduxDispatch, useReduxSelector } from "../../../hooks/useRedux";
import DataWindow from "../../elements/containers/DataWindow";
import IncomeGraph from "./IncomeGraph";
import IncomeTable from "./IncomeTable";
import { selectIncome, setIncomeWindow } from "../../../redux/incomeSlice";
import tocsv from "papaparse";
import { saveAs } from "file-saver";
import { formatDateMMDDYYYY } from "../../../helpers/dates";
import EditIncomeColumns from "./modals/EditIncomeColumns";
import AddIncome from "./modals/AddIncome";
import EditIncome from "./modals/EditIncome";
import DeleteIncome from "./modals/DeleteIncome";
import PageWindow from "../../elements/containers/PageWindow";

const IncomePage: FC = () => {
  const dispatch = useReduxDispatch();
  const { incomeId, incomes, incomeWindow } = useReduxSelector(selectIncome);
  const [columnModalOpen, setColumnModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Export data to a .csv file for the user to do w/e with it
  const exportIncomeData = () => {
    const filteredIncomes = incomes.map((inc) => {
      return {
        name: inc.name,
        category: inc.category,
        source: inc.source,
        currency: inc.currency,
        amount: inc.amount,
        date: inc.date,
      };
    });
    const data = tocsv.unparse(filteredIncomes);
    saveAs(
      new Blob([data]),
      `Income_Data-${formatDateMMDDYYYY(new Date())}.csv`
    );
  };

  return (
    <PageWindow>
      <DataWindow
        dataType="income"
        isSelected={incomeId !== null}
        currentWindow={incomeWindow}
        openAddModal={() => setAddModalOpen(true)}
        openEditModal={() => setEditModalOpen(true)}
        openDeleteModal={() => setDeleteModalOpen(true)}
        openColumnModal={() => setColumnModalOpen(true)}
        exportData={() => {
          exportIncomeData();
        }}
        setWindow={() =>
          dispatch(setIncomeWindow(incomeWindow === "list" ? "graph" : "list"))
        }
      >
        {incomeWindow === "list" ? <IncomeTable /> : <IncomeGraph />}
      </DataWindow>

      <AddIncome
        opened={addModalOpen}
        toggle={() => setAddModalOpen(!addModalOpen)}
      />
      <EditIncome
        opened={editModalOpen}
        toggle={() => setEditModalOpen(!editModalOpen)}
      />
      <DeleteIncome
        opened={deleteModalOpen}
        toggle={() => setDeleteModalOpen(!deleteModalOpen)}
      />
      <EditIncomeColumns
        opened={columnModalOpen}
        toggle={() => setColumnModalOpen(!columnModalOpen)}
      />
    </PageWindow>
  );
};

export default IncomePage;
