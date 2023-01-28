import { FC } from "react";
import { useReduxDispatch, useReduxSelector } from "../../../hooks/useRedux";
import { selectIncome, toggleIncomeColumn } from "../../../redux/incomeSlice";

import Modal from "../../elements/containers/modal";
import CheckboxEntry from "../../elements/input/form/checkboxEntry";

interface EditIncomeColumnsProps {
  opened: boolean;
  toggle: () => void;
}

const EditIncomeColumns: FC<EditIncomeColumnsProps> = ({ opened, toggle }) => {
  const dispatch = useReduxDispatch();
  const { incomeColumns } = useReduxSelector(selectIncome);
  return (
    <Modal
      title="Toggle visible income columns:"
      opened={opened}
      toggle={toggle}
    >
      <div className="flex sm:flex-row flex-col">
        <CheckboxEntry
          label="Date"
          onClick={() => {
            dispatch(toggleIncomeColumn("date"));
          }}
          defaultChecked={incomeColumns.includes("date")}
          className="ml-4"
        />
        <CheckboxEntry
          label="Source"
          onClick={() => {
            dispatch(toggleIncomeColumn("source"));
          }}
          defaultChecked={incomeColumns.includes("source")}
          className="ml-4"
        />
        <CheckboxEntry
          label="Category"
          onClick={() => {
            dispatch(toggleIncomeColumn("category"));
          }}
          defaultChecked={incomeColumns.includes("category")}
          className="ml-4"
        />
        <CheckboxEntry
          label="Amount"
          onClick={() => {
            dispatch(toggleIncomeColumn("amount"));
          }}
          defaultChecked={incomeColumns.includes("amount")}
          className="ml-4"
        />
      </div>
    </Modal>
  );
};

export default EditIncomeColumns;
