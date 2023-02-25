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
          <Checkbox
            value="date"
            name="date"
            label="Date"
            labelColor="white"
            onClick={() => {
              dispatch(toggleExpenseColumn("date"));
            }}
            defaultChecked={expenseColumns.includes("date")}
            className="ml-4"
          />
          <Checkbox
            value="location"
            name="location"
            label="Location"
            labelColor="white"
            onClick={() => {
              dispatch(toggleExpenseColumn("location"));
            }}
            defaultChecked={expenseColumns.includes("location")}
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
              dispatch(toggleExpenseColumn("category"));
            }}
            defaultChecked={expenseColumns.includes("category")}
            className="ml-4"
          />
          <Checkbox
            value="amount"
            name="amount"
            label="Amount"
            labelColor="white"
            onClick={() => {
              dispatch(toggleExpenseColumn("amount"));
            }}
            defaultChecked={expenseColumns.includes("amount")}
            className="ml-4"
          />
        </div>
      </div>
    </Modal>
  );
};

export default EditExpenseColumns;
