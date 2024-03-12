import { FC } from "react";
import DataWindow from "../../elements/containers/DataWindow";
import PageWindow from "../../elements/containers/PageWindow";
import SummaryGraph from "./SummaryGraph";

const SummaryPage: FC = () => {
  return (
    <PageWindow>
      <DataWindow>
        <SummaryGraph />
      </DataWindow>
    </PageWindow>
  );
};

export default SummaryPage;
