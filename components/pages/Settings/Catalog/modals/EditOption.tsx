import { FC, FormEvent } from "react";
import { capitalize } from "../../../../../helpers/strings";
import Modal from "../../../../elements/containers/Modal";
import BareButton from "../../../../elements/input/button/BareButton";
import TextEntry from "../../../../elements/input/form/Text";
import { FieldOption, SectionOption } from "../types";

interface EditModalProps {
  section: SectionOption;
  field: FieldOption;
  opened: boolean;
  toggle: () => void;
  value: string;
  onEdit: (e: FormEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

const EditModal: FC<EditModalProps> = ({
  section,
  field,
  opened,
  toggle,
  value,
  onEdit,
  onSubmit,
}) => {
  return (
    <Modal
      title={`${capitalize(section)} 
        ${field}:`}
      opened={opened}
      toggle={toggle}
    >
      <TextEntry
        label="Edit option:"
        value={value}
        name="editOption"
        onChange={onEdit}
        className="mb-6"
        inputWidth="auto"
      />
      <BareButton label="Confirm" onClick={onSubmit} color="green" />
    </Modal>
  );
};

export default EditModal;
