import { FC, RefObject, useEffect, useMemo, useRef, useState } from "react";

interface LabelProps {
  showInput: boolean;
  hovered: boolean;
  shortLabel?: string;
  label?: string;
}

const Label: FC<LabelProps> = ({ showInput, hovered, shortLabel, label }) => {
  return (
    <div
      className={`flex items-center justify-center h-10 transform duration-300 ease-in-out relative ${
        showInput ? "w-24 text-sm" : "w-full text-md"
      } group-hover:w-24 group-hover:text-sm border-b-2 border-blue-300`}
    >
      <label className={`whitespace-nowrap absolute transform duration-150`}>
        {(showInput || hovered) && shortLabel ? shortLabel : label}
      </label>
    </div>
  );
};

export default Label;
