import { FC } from "react";
import FieldButton from "./interface/FieldButton";
import type { FieldOption, SectionOption } from "./catalogWindow";

interface OptionFieldProps {
  section: SectionOption;
  selected: FieldOption;
  setField: (section: FieldOption) => void;
}

const OptionField: FC<OptionFieldProps> = ({ section, selected, setField }) => {
  return (
    <div
      id="catalogOptionField"
      className="bg-slate-800 w-full flex justify-evenly"
    >
      {section === "income" ? (
        <FieldButton
          name="source"
          selected={selected}
          onClick={() => setField("source")}
        />
      ) : (
        section === "expense" && (
          <FieldButton
            name="location"
            selected={selected}
            onClick={() => setField("location")}
          />
        )
      )}
      <FieldButton
        name="category"
        selected={selected}
        onClick={() => setField("category")}
      />
    </div>
  );
};

export default OptionField;
