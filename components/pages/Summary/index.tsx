import { FC } from "react";
import { useReduxDispatch, useReduxSelector } from "../../../hooks/useRedux";
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
  const { summaryLineModalOpen } = useReduxSelector(selectSummary);

  return (
    <PageWindow>
      <DataWindow>
        <SummaryGraph />
      </DataWindow>

      <ToggleLines
        opened={summaryLineModalOpen}
        toggle={() => dispatch(toggleSummaryLineModal())}
      />
    </PageWindow>
  );
};

export default SummaryPage;
