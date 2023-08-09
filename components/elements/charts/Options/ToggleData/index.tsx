import { FC } from "react";
import {
  useReduxDispatch,
  useReduxSelector,
} from "../../../../../hooks/useRedux";
import { selectSummary, toggleSummaryLine } from "../../../../../redux/summary";
import Checkbox from "../../../input/form/Checkbox";

const ToggleData: FC = () => {
  const dispatch = useReduxDispatch();
  const { summaryLines } = useReduxSelector(selectSummary);

  return (
    <div className="flex justify-center flex-row">
      <div className="flex flex-col">
        <Checkbox
          value="income"
          name="income"
          label="Income"
          labelColor="white"
          onClick={() => {
            dispatch(toggleSummaryLine("income"));
          }}
          defaultChecked={summaryLines.includes("income")}
          className="sn: "
        />
        <Checkbox
          value="expense"
          name="expense"
          label="Expenses"
          labelColor="white"
          onClick={() => {
            dispatch(toggleSummaryLine("expense"));
          }}
          defaultChecked={summaryLines.includes("expense")}
          className="sn: "
        />
      </div>
      <div className="flex flex-col">
        <Checkbox
          value="savings"
          name="savings"
          label="Savings"
          labelColor="white"
          onClick={() => {
            dispatch(toggleSummaryLine("savings"));
          }}
          defaultChecked={summaryLines.includes("savings")}
          className="ml-4"
        />
        <Checkbox
          value="cash"
          name="cash"
          label="Cash"
          labelColor="white"
          onClick={() => {
            dispatch(toggleSummaryLine("cash"));
          }}
          defaultChecked={summaryLines.includes("cash")}
          className="ml-4"
        />
      </div>
    </div>
  );
};

export default ToggleData;
