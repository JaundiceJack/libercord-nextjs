import { FC } from "react";
import {
  useReduxDispatch,
  useReduxSelector,
} from "../../../../../hooks/useRedux";
import {
  selectExpense,
  toggleExpenseColumn,
} from "../../../../../redux/expense";
import Modal from "../../../../elements/containers/Modal";
import type { ToggleProps } from "../../../../elements/containers/Modal/types";
import Checkbox from "../../../../elements/input/form/Checkbox";
import Toggler from "../../../../elements/input/form/Toggler";

const EditExpenseColumns: FC<ToggleProps> = ({ opened, toggle }) => {
  const dispatch = useReduxDispatch();
  const { expenseColumns } = useReduxSelector(selectExpense);
  return (
    <Modal
      title="Toggle visible expense columns:"
      opened={opened}
      toggle={toggle}
    >
      <div className="flex justify-center sm:flex-row flex-col">
        <div className="flex flex-col">
          <Toggler
            label="Date"
            onClick={() => {
              dispatch(toggleExpenseColumn("date"));
            }}
            defaultChecked={expenseColumns.includes("date")}
          />
          <Toggler
            label="Location"
            onClick={() => {
              dispatch(toggleExpenseColumn("location"));
            }}
            defaultChecked={expenseColumns.includes("location")}
          />
          <Toggler
            label="Category"
            onClick={() => {
              dispatch(toggleExpenseColumn("category"));
            }}
            defaultChecked={expenseColumns.includes("category")}
          />
          <Toggler
            label="Amount"
            onClick={() => {
              dispatch(toggleExpenseColumn("amount"));
            }}
            defaultChecked={expenseColumns.includes("amount")}
          />
        </div>
      </div>
    </Modal>
  );
};

export default EditExpenseColumns;
