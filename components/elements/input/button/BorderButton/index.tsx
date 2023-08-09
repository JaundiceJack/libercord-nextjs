import { FC } from "react";
import { capitalize } from "../../../../../helpers/strings";
import type { BorderButtonProps } from "./types";

const BorderButton: FC<BorderButtonProps> = ({
  name,
  selected,
  onClick,
  color,
}) => {
  const borderColor =
    color === "green"
      ? selected
        ? "bg-green-500"
        : "group-hover:bg-green-400"
      : selected
      ? "bg-orange-500"
      : "group-hover:bg-amber-500";

  return (
    <button
      className={`group w-full h-full p-3 sm:p-4 text-neutral-100 `}
      onClick={onClick}
    >
      <div className={`transform duration-150 group-hover:scale-103`}>
        {capitalize(name)}
      </div>
      <div
        style={{ height: "3px" }}
        className={`mx-auto rounded-full mt-2 w-14 sm:w-16 transform duration-300 ${borderColor}`}
      />
    </button>
  );
};

export default BorderButton;
