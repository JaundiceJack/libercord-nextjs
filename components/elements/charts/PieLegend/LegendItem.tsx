import { FC, MutableRefObject, RefObject } from "react";
import { Datum } from "../types";
import LegendInfo from "./LegendInfo";
import LegendPercentage from "./LegendPercentage";

interface LegendItemProps {
  activeIndex: number;
  refs: MutableRefObject<RefObject<HTMLLIElement>[]>;
  colors: string[];
  index: number;
  entry: Datum;
  onHover: (data: Datum | null, index: number) => void;
}

const LegendItem: FC<LegendItemProps> = ({
  activeIndex,
  refs,
  colors,
  index,
  entry,
  onHover,
}) => {
  return (
    <li
      ref={refs.current[index]}
      key={index}
      className={`grid grid-cols-4 items-center px-1 py-0.5 my-0.5 cursor-pointer 
      bg-gray-700 `}
      onMouseOver={() => onHover(null, index)}
    >
      <LegendPercentage
        index={index}
        activeIndex={activeIndex}
        colors={colors}
        entry={entry}
      />
      <LegendInfo entry={entry} />
    </li>
  );
};

export default LegendItem;
