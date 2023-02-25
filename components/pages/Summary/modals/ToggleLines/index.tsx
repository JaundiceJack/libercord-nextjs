import { FC } from "react";
import {
  useReduxDispatch,
  useReduxSelector,
} from "../../../../../hooks/useRedux";
import { selectSummary, toggleSummaryLine } from "../../../../../redux/summary";
import Modal from "../../../../elements/containers/Modal";
import type { ToggleProps } from "../../../../elements/containers/Modal/types";
import Checkbox from "../../../../elements/input/form/Checkbox";

const ToggleLines: FC<ToggleProps> = ({ opened, toggle }) => {
  const dispatch = useReduxDispatch();
  const { summaryLines } = useReduxSelector(selectSummary);

  return (
    <Modal title="Toggle visible chart lines:" opened={opened} toggle={toggle}>
      <div className="flex justify-center sm:flex-row flex-col">
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
            className="ml-4"
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
            className="ml-4"
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
    </Modal>
  );
};

export default ToggleLines;
