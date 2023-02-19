import { FC } from "react";
import {
  useReduxDispatch,
  useReduxSelector,
} from "../../../../../hooks/useRedux";
import {
  selectIncome,
  toggleIncomeColumn,
} from "../../../../../redux/incomeSlice";
import Modal from "../../../../elements/containers/Modal";
import type { ToggleProps } from "../../../../elements/containers/Modal/types";
import Checkbox from "../../../../elements/input/form/Checkbox";

const EditIncomeColumns: FC<ToggleProps> = ({ opened, toggle }) => {
  const dispatch = useReduxDispatch();
  const { incomeColumns } = useReduxSelector(selectIncome);
  return (
    <Modal
      title="Toggle visible income columns:"
      opened={opened}
      toggle={toggle}
    >
      <div className="flex justify-center sm:flex-row flex-col">
        <div className="flex flex-col">
          <Checkbox
            value="date"
            name="date"
            label="Date"
            labelColor="white"
            onClick={() => {
              dispatch(toggleIncomeColumn("date"));
            }}
            defaultChecked={incomeColumns.includes("date")}
            className="ml-4"
          />
          <Checkbox
            value="source"
            name="source"
            label="Source"
            labelColor="white"
            onClick={() => {
              dispatch(toggleIncomeColumn("source"));
            }}
            defaultChecked={incomeColumns.includes("source")}
            className="ml-4"
          />
        </div>
        <div className="flex flex-col">
          <Checkbox
            value="category"
            name="category"
            label="Category"
            labelColor="white"
            onClick={() => {
              dispatch(toggleIncomeColumn("category"));
            }}
            defaultChecked={incomeColumns.includes("category")}
            className="ml-4"
          />
          <Checkbox
            value="amount"
            name="amount"
            label="Amount"
            labelColor="white"
            onClick={() => {
              dispatch(toggleIncomeColumn("amount"));
            }}
            defaultChecked={incomeColumns.includes("amount")}
            className="ml-4"
          />
        </div>
      </div>
    </Modal>
  );
};

export default EditIncomeColumns;
