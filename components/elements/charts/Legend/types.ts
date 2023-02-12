import { Datum } from "../types";
import type { ActiveTypes } from "./Item/types";
import type { TitleProps } from "./Title/types";

interface DataType {
  data: Datum[];
}

export type LegendProps = TitleProps & DataType & ActiveTypes;
