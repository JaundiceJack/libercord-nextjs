import { FC, FormEvent } from "react";
import { FaPlus } from "react-icons/fa";
import BareButton from "../../../elements/input/button/BareButton";
import TextEntry from "../../../elements/input/form/Text";
import { OptionEntryProps } from "./types";

const OptionEntry: FC<OptionEntryProps> = ({
  field,
  newOption,
  setNewOption,
  onAdd,
}) => {
  return (
    <div
      id="catalogOptionEntry"
      className="flex items-center px-2 py-1 bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800"
    >
      <TextEntry
        placeholder={`Enter a new ${field}:`}
        value={newOption}
        name="newOption"
        onChange={setNewOption}
        className={`w-full`}
        inputWidth="full"
      />
      <BareButton
        color="green"
        title="Add a New Option"
        icon={<FaPlus size="10px" />}
        className={`h-7 w-8 ml-2`}
        disabled={newOption === ""}
        onClick={onAdd}
      />
    </div>
  );
};

export default OptionEntry;
