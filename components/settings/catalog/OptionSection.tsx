import { FC } from "react";
import SectionButton from "./interface/SectionButton";
import type { SectionOption } from "./catalogWindow";

interface OptionSectionProps {
  selected: SectionOption;
  setSection: (section: SectionOption) => void;
}

const OptionSection: FC<OptionSectionProps> = ({ selected, setSection }) => {
  return (
    <div
      id="catalogOptionSection"
      className="bg-slate-800 w-full flex justify-center"
    >
      <SectionButton
        name="income"
        selected={selected}
        onClick={() => setSection("income")}
      />
      <SectionButton
        name="expense"
        selected={selected}
        onClick={() => setSection("expense")}
      />
      <SectionButton
        name="asset"
        selected={selected}
        onClick={() => setSection("asset")}
      />
      <SectionButton
        name="debt"
        selected={selected}
        onClick={() => setSection("debt")}
      />
    </div>
  );
};

export default OptionSection;
