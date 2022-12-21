import { FC } from "react";
import { capitalize } from "../../../../helpers/strings";
import type { SectionOption } from "../catalogWindow";

interface SectionButtonProps {
  name: SectionOption;
  selected: SectionOption;
  onClick: () => void;
}

const SectionButton: FC<SectionButtonProps> = ({ name, selected, onClick }) => {
  return (
    <button
      className={`group w-full h-full p-3 sm:p-4 text-neutral-100`}
      style={{
        background: `linear-gradient(180deg, #252535, #353545)`,
      }}
      onClick={onClick}
    >
      <div className={`transform duration-150 group-hover:scale-103`}>
        {capitalize(name)}
      </div>
      <div
        style={{ height: "3px" }}
        className={`rounded-full mt-2 w-full   ${
          selected === name ? "bg-orange-500" : "group-hover:bg-amber-500"
        }`}
      />
    </button>
  );
};

export default SectionButton;
