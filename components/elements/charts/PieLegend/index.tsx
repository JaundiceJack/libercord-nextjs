import { createRef, FC, RefObject, useEffect, useRef, useState } from "react";
import type { Datum } from "../Pie";
import LegendItem from "./LegendItem";
import LegendTitle from "./LegendTitle";

interface PieLegendProps {
  title: string;
  data: Datum[];
  onPieHover: (data: Datum | null, index: number) => void;
  activeIndex: number;
  colors: string[];
}

const PieLegend: FC<PieLegendProps> = ({
  title,
  data,
  onPieHover,
  activeIndex,
  colors,
}) => {
  const refs = useRef<RefObject<HTMLLIElement>[]>([]);
  const [mouseInUL, setMouseInUL] = useState<boolean>(false);
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
  }, []);
  useEffect(() => {
    // Only scroll if the mouse is off of the list
    !mouseInUL && scrollToRef(refs.current[activeIndex]);
  }, [activeIndex]);

  return (
    <div className="mb-10 md:mb-0 w-full md:w-56 h-96 md:h-full flex flex-col">
      <LegendTitle title={title} />
      <ul
        className="mb-4 overflow-y-auto"
        onMouseEnter={() => setMouseInUL(true)}
        onMouseLeave={() => setMouseInUL(false)}
      >
        {data.map((entry: Datum, index: number) => (
          <LegendItem
            onHover={onPieHover}
            activeIndex={activeIndex}
            refs={refs}
            colors={colors}
            index={index}
            entry={entry}
          />
        ))}
      </ul>
    </div>
  );
};

export default PieLegend;
