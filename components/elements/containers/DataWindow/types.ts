import { IncomeType } from "../../../../models/Income";

export type ContentProps = {
  children: React.ReactNode;
};

export type DataWindowProps = ContentProps & {
  className?: string;
};
