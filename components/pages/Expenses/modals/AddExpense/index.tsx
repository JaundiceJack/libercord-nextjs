import { FC } from "react";
import NewExpense from "../../../../elements/charts/Options/NewExpense";
import Modal from "../../../../elements/containers/Modal";
import type { ToggleProps } from "../../../../elements/containers/Modal/types";

const AddExpense: FC<ToggleProps> = ({ opened, toggle }) => {
  return (
    <Modal title="Add a New Expense" opened={opened} toggle={toggle}>
      <NewExpense />
    </Modal>
  );
};

export default AddExpense;
