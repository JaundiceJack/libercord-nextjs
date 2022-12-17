import { FC, useState } from "react";
import { useReduxDispatch, useReduxSelector } from "../../hooks/useRedux";
import WindowContainer from "../elements/containers/windowContainer";
import DetailWindow from "../elements/containers/DetailWindow/detailWindow";
import IncomeInput from "./incomeInput";
import IncomeGraph from "./incomeGraph";
import IncomeTable from "./incomeTable";
import {
  selectIncome,
  setIncomeWindow,
  toggleIncomeColumn,
} from "../../redux/incomeSlice";
import Modal from "../elements/containers/modal";
import CheckboxEntry from "../elements/input/form/checkboxEntry";
import tocsv from "papaparse";
import { saveAs } from "file-saver";
import { formatDateMMDDYYYY } from "../../helpers/dates";
import { pipeline } from "stream/promises";

const IncomeContent: FC = () => {
  const dispatch = useReduxDispatch();
  const { incomes, incomeWindow, incomeColumns } =
    useReduxSelector(selectIncome);
  const [columnModalOpen, setColumnModalOpen] = useState(false);

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
    <WindowContainer>
      <IncomeInput />
      <DetailWindow
        setWindow={() =>
          dispatch(setIncomeWindow(incomeWindow === "list" ? "graph" : "list"))
        }
        currentWindow={incomeWindow}
        openColumnModal={() => setColumnModalOpen(true)}
        exportData={() => {
          exportIncomeData();
        }}
      >
        {incomeWindow === "list" ? <IncomeTable /> : <IncomeGraph />}
      </DetailWindow>
      <Modal
        title="Toggle visible income columns:"
        opened={columnModalOpen}
        toggle={() => setColumnModalOpen(!columnModalOpen)}
      >
        <div className="flex sm:flex-row flex-col">
          <CheckboxEntry
            label="Date"
            onClick={() => {
              dispatch(toggleIncomeColumn("date"));
            }}
            defaultChecked={incomeColumns.includes("date")}
            className="ml-4"
          />
          <CheckboxEntry
            label="Source"
            onClick={() => {
              dispatch(toggleIncomeColumn("source"));
            }}
            defaultChecked={incomeColumns.includes("source")}
            className="ml-4"
          />
          <CheckboxEntry
            label="Category"
            onClick={() => {
              dispatch(toggleIncomeColumn("category"));
            }}
            defaultChecked={incomeColumns.includes("category")}
            className="ml-4"
          />
          <CheckboxEntry
            label="Amount"
            onClick={() => {
              dispatch(toggleIncomeColumn("amount"));
            }}
            defaultChecked={incomeColumns.includes("amount")}
            className="ml-4"
          />
        </div>
      </Modal>
    </WindowContainer>
  );
};

export default IncomeContent;
