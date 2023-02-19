import { FC } from "react";
import { useReduxDispatch, useReduxSelector } from "../../../hooks/useRedux";
import {
  selectIncome,
  toggleAddIncomeModal,
  toggleDeleteIncomeModal,
  toggleEditIncomeModal,
  toggleIncomeColumnModal,
} from "../../../redux/incomeSlice";
import DataWindow from "../../elements/containers/DataWindow";
import PageWindow from "../../elements/containers/PageWindow";
import IncomeGraph from "./IncomeGraph";
import IncomeTable from "./IncomeTable";
import AddIncome from "./modals/AddIncome";
import DeleteIncome from "./modals/DeleteIncome";
import EditIncome from "./modals/EditIncome";
import ToggleIncomeColumns from "./modals/ToggleIncomeColumns";

const IncomePage: FC = () => {
  const dispatch = useReduxDispatch();
  const {
    incomeWindow,
    incomeAddModalOpen,
    incomeColumnModalOpen,
    incomeDeleteModalOpen,
    incomeEditModalOpen,
  } = useReduxSelector(selectIncome);

  return (
    <PageWindow>
      <DataWindow dataType="income">
        {incomeWindow === "list" ? <IncomeTable /> : <IncomeGraph />}
      </DataWindow>

      <AddIncome
        opened={incomeAddModalOpen}
        toggle={() => dispatch(toggleAddIncomeModal())}
      />
      <EditIncome
        opened={incomeEditModalOpen}
        toggle={() => dispatch(toggleEditIncomeModal())}
      />
      <DeleteIncome
        opened={incomeDeleteModalOpen}
        toggle={() => dispatch(toggleDeleteIncomeModal())}
      />
      <ToggleIncomeColumns
        opened={incomeColumnModalOpen}
        toggle={() => dispatch(toggleIncomeColumnModal())}
      />
    </PageWindow>
  );
};

export default IncomePage;
