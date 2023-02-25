import { FC } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import Fields from "./Fields";
import Sections from "./Sections";
import { FieldOption, SectionOption } from "../types";

interface SelectOptionTypeProps {
  selectedSection: SectionOption;
  setSelectedSection: (type: SectionOption) => void;
  selectedField: FieldOption;
  setSelectedField: (type: FieldOption) => void;
}

const SelectOptionType: FC<SelectOptionTypeProps> = ({
  selectedSection,
  setSelectedSection,
  selectedField,
  setSelectedField,
}) => {
  return (
    <>
      <Sections
        selected={selectedSection}
        setSection={(section: SectionOption) => {
          setSelectedSection(section);
          section === "income"
            ? setSelectedField("source")
            : section === "expense"
            ? setSelectedField("location")
            : setSelectedField("category");
        }}
      />
      <div className="w-full h-px bg-yellow-500" />
      <div className="relative w-full flex items-center justify-center">
        <IoMdArrowDropdown
          size="25px"
          color="#fa0"
          style={{ marginTop: "5px" }}
          className="absolute"
        />
      </div>
      <Fields
        section={selectedSection}
        selected={selectedField}
        setField={(field: FieldOption) => setSelectedField(field)}
      />
    </>
  );
};

export default SelectOptionType;
