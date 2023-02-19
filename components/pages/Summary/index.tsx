import { FC } from "react";
import { useReduxDispatch, useReduxSelector } from "../../../hooks/useRedux";
import { selectExpense } from "../../../redux/expenseSlice";
import { selectIncome } from "../../../redux/incomeSlice";
import {
  selectSummary,
  toggleSummaryLineModal,
} from "../../../redux/summarySlice";
import DataWindow from "../../elements/containers/DataWindow";
import PageWindow from "../../elements/containers/PageWindow";
import ToggleLines from "./modals/ToggleLines";
import SummaryGraph from "./SummaryGraph";

const SummaryPage: FC = () => {
  const dispatch = useReduxDispatch();
  const { incomes } = useReduxSelector(selectIncome);
  const { expenses } = useReduxSelector(selectExpense);
  const { summaryLineModalOpen } = useReduxSelector(selectSummary);

  return (
    <PageWindow>
      <DataWindow dataType="summary">{<SummaryGraph />}</DataWindow>

      <ToggleLines
        opened={summaryLineModalOpen}
        toggle={() => dispatch(toggleSummaryLineModal())}
      />
    </PageWindow>
  );
};

export default SummaryPage;
