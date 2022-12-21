import { FC, FormEvent } from "react";
import { capitalize } from "../../../../helpers/strings";
import Modal from "../../../elements/containers/modal";
import BasicButton from "../../../elements/input/button/basicButton";
import TextEntry from "../../../elements/input/form/textEntry";
import { FieldOption, SectionOption } from "../catalogWindow";

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
        labelColor="black"
        value={value}
        name="editOption"
        onChange={onEdit}
        className="mb-4"
      />
      <button
        onClick={onSubmit}
        className="w-full p-4 rounded-lg bg-green-400 font-jose transform duration-150 hover:scale-103"
      >
        Confirm
      </button>
    </Modal>
  );
};

export default EditModal;
