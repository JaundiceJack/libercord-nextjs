import { FC, MutableRefObject, RefObject } from "react";
import Info from "./Info";
import Percentage from "./Percentage";
import type { ItemProps } from "./types";

const Item: FC<ItemProps> = ({ activeIndex, refs, index, entry, onHover }) => {
  return (
    <li
      ref={refs.current[index]}
      key={index}
      className={`grid grid-cols-4 items-center px-1 py-0.5 mx-1 my-0.5 
      cursor-pointer bg-gray-700 md:rounded-md`}
      onMouseOver={() => onHover(null, index)}
    >
      <Percentage index={index} activeIndex={activeIndex} entry={entry} />
      <Info entry={entry} />
    </li>
  );
};

export default Item;
