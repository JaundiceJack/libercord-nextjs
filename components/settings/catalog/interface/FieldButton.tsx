import { FC } from "react";
import { capitalize } from "../../../../helpers/strings";
import type { FieldOption } from "../catalogWindow";

interface FieldButtonProps {
  name: FieldOption;
  selected: FieldOption;
  onClick: () => void;
}

const FieldButton: FC<FieldButtonProps> = ({ name, selected, onClick }) => {
  return (
    <button
      className={`group w-full h-full p-3 sm:p-4 text-neutral-100 `}
      style={{ background: "linear-gradient(180deg, #223, #334)" }}
      onClick={onClick}
    >
      <div className={`transform duration-150 group-hover:scale-103`}>
        {capitalize(name)}
      </div>
      <div
        style={{ height: "3px" }}
        className={`mx-auto rounded-full mt-2 w-20 h-1  ${
          selected === name ? "bg-green-500" : "group-hover:bg-green-400"
        }`}
      />
    </button>
  );
};

export default FieldButton;
