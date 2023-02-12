import { MutableRefObject, RefObject } from "react";
import { Datum } from "../../types";

interface RefTypes {
  refs: MutableRefObject<RefObject<HTMLLIElement>[]>;
  index: number;
}

interface IndexTypes {
  index: number;
  activeIndex: number;
}

export interface ActiveTypes {
  onHover: (data: Datum | null, index: number) => void;
  activeIndex: number;
}

export type InfoProps = {
  entry: Datum;
};

export type PercentageProps = InfoProps & IndexTypes;

export type ItemProps = InfoProps & ActiveTypes & RefTypes;
