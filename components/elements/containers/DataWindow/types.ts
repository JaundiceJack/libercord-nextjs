import { IncomeType } from "../../../../models/Income";

interface DataType {
  dataType: "summary" | "income" | "expense" | "asset" | "debt";
}

export type DateOptionsProps = DataType;

export type WindowActionsProps = DataType;

export type WindowOptionsProps = DataType;

export type TimeframeOptionsProps = DataType;

export type ItemOptionProps = DataType;

export type ContentProps = {
  children: React.ReactNode;
};

export type HeaderProps = DataType;

export type DataWindowProps = ContentProps &
  DataType & {
    className?: string;
  };
