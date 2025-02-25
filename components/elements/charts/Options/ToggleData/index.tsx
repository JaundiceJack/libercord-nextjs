import { FC } from "react";
import {
  useReduxDispatch,
  useReduxSelector,
} from "../../../../../hooks/useRedux";
import { selectSummary, toggleSummaryLine } from "../../../../../redux/summary";
import Checkbox from "../../../input/form/Checkbox";
import Toggler from "../../../input/form/Toggler";

const ToggleData: FC = () => {
  const dispatch = useReduxDispatch();
  const { summaryLines } = useReduxSelector(selectSummary);

  return (
    <div className="flex justify-center flex-row">
      <div className="flex flex-col">
        <Toggler
          label="Income"
          onClick={() => {
            dispatch(toggleSummaryLine("income"));
          }}
          defaultChecked={summaryLines.includes("income")}
          className=""
        />
        <Toggler
          label="Expenses"
          onClick={() => {
            dispatch(toggleSummaryLine("expense"));
          }}
          defaultChecked={summaryLines.includes("expense")}
          className=""
        />
        <Toggler
          label="Savings"
          onClick={() => {
            dispatch(toggleSummaryLine("savings"));
          }}
          defaultChecked={summaryLines.includes("savings")}
          className=""
        />
        <Toggler
          label="Cash"
          onClick={() => {
            dispatch(toggleSummaryLine("cash"));
          }}
          defaultChecked={summaryLines.includes("cash")}
          className=""
        />
      </div>
    </div>
  );
};

export default ToggleData;
