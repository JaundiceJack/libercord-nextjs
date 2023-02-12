import { FC } from "react";
import Modal from "../../../../elements/containers/Modal";
import BareButton from "../../../../elements/input/button/BareButton";
import { FieldOption, SectionOption } from "../types";

interface DeleteModalProps {
  section: SectionOption;
  field: FieldOption;
  option: string;
  opened: boolean;
  toggle: () => void;
  onDelete: () => void;
}

const DeleteModal: FC<DeleteModalProps> = ({
  section,
  field,
  option,
  opened,
  toggle,
  onDelete,
}) => {
  return (
    <Modal
      title={`Delete ${section} ${field} option: ${option}?`}
      opened={opened}
      toggle={toggle}
    >
      <BareButton color="red" label="Remove Option" onClick={onDelete} />
    </Modal>
  );
};

export default DeleteModal;
