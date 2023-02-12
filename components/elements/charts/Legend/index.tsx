import { createRef, FC, RefObject, useEffect, useRef, useState } from "react";
import { useReduxSelector } from "../../../../hooks/useRedux";
import { useWindowSize } from "../../../../hooks/useWindowSize";
import { selectDate } from "../../../../redux/dateSlice";
import { Datum } from "../types";
import Item from "./Item";
import Title from "./Title";
import type { LegendProps } from "./types";
import BgCSS from "../../../../styles/Background.module.css";

const Legend: FC<LegendProps> = ({ title, data, onHover, activeIndex }) => {
  const refs = useRef<RefObject<HTMLLIElement>[]>([]);
  const [mouseInUL, setMouseInUL] = useState<boolean>(false);
  const { dataTimeframe } = useReduxSelector(selectDate);
  const { width: screenWidth, height: screenHeight } = useWindowSize();

  const populateRefs = () => {
    refs.current = Array.from(Array(data.length).keys()).map(
      (_, i) => refs.current[i] ?? createRef<HTMLLIElement>()
    );
  };
  const scrollToRef = (ref: RefObject<HTMLLIElement>) => {
    ref?.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  // Populate refs when the page loads and scroll to it when the index changes
  useEffect(() => {
    populateRefs();
  }, [data, dataTimeframe]);
  useEffect(() => {
    // Only scroll if the mouse is off of the list
    !mouseInUL &&
      screenWidth &&
      screenWidth >= 1024 &&
      scrollToRef(refs.current[activeIndex]);
  }, [activeIndex]);

  return (
    <div
      className={`flex flex-col w-full h-full mb-10 md:mb-0 ${BgCSS.sidebar} `}
    >
      <Title title={title} />
      <ul
        className="overflow-y-auto"
        onMouseEnter={() => setMouseInUL(true)}
        onMouseLeave={() => setMouseInUL(false)}
      >
        {data.map((entry: Datum, index: number) => (
          <Item
            key={index}
            onHover={onHover}
            activeIndex={activeIndex}
            refs={refs}
            index={index}
            entry={entry}
          />
        ))}
      </ul>
    </div>
  );
};

export default Legend;
