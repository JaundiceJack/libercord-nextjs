import { FC, useState } from "react";
import Header from "../Header";
import SettingsWindow from "../SettingsWindow";
import OptionsList from "./OptionsList";
import SelectOptionType from "./SelectOptionType";
import type { FieldOption, SectionOption } from "./types";

const Catalog: FC = () => {
  const [selectedSection, setSelectedSection] =
    useState<SectionOption>("income");
  const [selectedField, setSelectedField] = useState<FieldOption>("source");

  return (
    <SettingsWindow>
      <Header title="User-created Options" />
      <div className="w-full h-px bg-gray-700" />
      <SelectOptionType
        selectedField={selectedField}
        selectedSection={selectedSection}
        setSelectedField={setSelectedField}
        setSelectedSection={setSelectedSection}
      />
      <div className="w-full h-px bg-gray-700" />
      <OptionsList
        selectedField={selectedField}
        selectedSection={selectedSection}
      />
    </SettingsWindow>
  );
};

export default Catalog;
