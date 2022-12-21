import { FC, FormEvent } from "react";
import { FaPlus } from "react-icons/fa";
import BasicButton from "../../../elements/input/button/basicButton";
import TextEntry from "../../../elements/input/form/textEntry";
import { FieldOption } from "../catalogWindow";

interface OptionEntryProps {
  field: FieldOption;
  newOption: string;
  setNewOption: (e: FormEvent<HTMLInputElement>) => void;
  onAdd: () => void;
}

const OptionEntry: FC<OptionEntryProps> = ({
  field,
  newOption,
  setNewOption,
  onAdd,
}) => {
  return (
    <div
      id="catalogOptionEntry"
      className="flex items-center py-1 bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800"
    >
      <TextEntry
        placeholder={`Enter a new ${field}:`}
        noLabel={true}
        value={newOption}
        name="newOption"
        onChange={setNewOption}
        className={`w-full ml-2`}
      />
      <BasicButton
        color="green"
        title="Add"
        icon={<FaPlus size="10px" />}
        className={`pr-2 pb-1 ml-2`}
        disabled={newOption === ""}
        onClick={onAdd}
      />
    </div>
  );
};

export default OptionEntry;
