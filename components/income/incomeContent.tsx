import { FC, useState } from "react";
import { useReduxDispatch, useReduxSelector } from "../../hooks/useRedux";
import WindowContainer from "../elements/containers/windowContainer";
import DetailWindow from "../elements/containers/DetailWindow/detailWindow";
import IncomeInput from "./incomeInput";
import IncomeGraph from "./incomeGraph";
import IncomeTable from "./incomeTable";
import { selectIncome, setIncomeWindow } from "../../redux/incomeSlice";
import tocsv from "papaparse";
import { saveAs } from "file-saver";
import { formatDateMMDDYYYY } from "../../helpers/dates";
import EditIncomeColumns from "./modals/EditIncomeColumns";

const IncomeContent: FC = () => {
  const dispatch = useReduxDispatch();
  const { incomes, incomeWindow } = useReduxSelector(selectIncome);
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
      <EditIncomeColumns
        opened={columnModalOpen}
        toggle={() => setColumnModalOpen(!columnModalOpen)}
      />
    </WindowContainer>
  );
};

export default IncomeContent;
