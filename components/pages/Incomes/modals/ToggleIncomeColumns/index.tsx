import { FC } from "react";
import {
  useReduxDispatch,
  useReduxSelector,
} from "../../../../../hooks/useRedux";
import { selectIncome, toggleIncomeColumn } from "../../../../../redux/income";
import Modal from "../../../../elements/containers/Modal";
import type { ToggleProps } from "../../../../elements/containers/Modal/types";
import Checkbox from "../../../../elements/input/form/Checkbox";
import Toggler from "../../../../elements/input/form/Toggler";

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
          <Toggler
            label="Date"
            onClick={() => {
              dispatch(toggleIncomeColumn("date"));
            }}
            defaultChecked={incomeColumns.includes("date")}
          />
          <Toggler
            label="Source"
            onClick={() => {
              dispatch(toggleIncomeColumn("source"));
            }}
            defaultChecked={incomeColumns.includes("source")}
          />
          <Toggler
            label="Category"
            onClick={() => {
              dispatch(toggleIncomeColumn("category"));
            }}
            defaultChecked={incomeColumns.includes("category")}
          />
          <Toggler
            label="Amount"
            onClick={() => {
              dispatch(toggleIncomeColumn("amount"));
            }}
            defaultChecked={incomeColumns.includes("amount")}
          />
        </div>
      </div>
    </Modal>
  );
};

export default EditIncomeColumns;
