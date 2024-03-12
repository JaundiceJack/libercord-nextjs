import { FC } from "react";
import NewIncome from "../../../../elements/charts/Options/NewIncome";
import Modal from "../../../../elements/containers/Modal";
import type { ToggleProps } from "../../../../elements/containers/Modal/types";

const AddIncome: FC<ToggleProps> = ({ opened, toggle }) => {
  return (
    <Modal title="Add a New Income" opened={opened} toggle={toggle}>
      <NewIncome />
    </Modal>
  );
};

export default AddIncome;
