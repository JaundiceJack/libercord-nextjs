import { FC } from "react";
import Modal from "../../../elements/containers/modal";
import BasicButton from "../../../elements/input/button/basicButton";
import { FieldOption, SectionOption } from "../catalogWindow";

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
      title={`Delete 
  ${section} 
  ${field} option: ${option}?`}
      opened={opened}
      toggle={toggle}
    >
      <BasicButton
        color="red"
        label="Remove Option"
        className="w-full"
        onClick={onDelete}
      />
    </Modal>
  );
};

export default DeleteModal;
