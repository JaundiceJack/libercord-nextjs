import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { Types } from "mongoose";
import { CSSProperties } from "react";
import { ExpenseType } from "../../../../models/Expense";
import { IncomeType } from "../../../../models/Income";

interface ListProps {
  items: IncomeType[] | ExpenseType[];
}

interface ColumnProps {
  columns: ListWindowColumn[];
  editable: boolean;
}

interface RowItemProps {
  item: IncomeType | ExpenseType;
}

interface RowOtherProps {
  selected: Types.ObjectId | null;
  onItemClick: ActionCreatorWithPayload<Types.ObjectId, string>;
  editItem?: (value: IncomeType | ExpenseType) => void;
  deleteItem?: (value: IncomeType | ExpenseType) => void;
}

interface SortProps {
  currentSort: string;
  sortDirection: "asc" | "desc";
}

export type PresentRowProps = {
  index: number;
  style: CSSProperties;
};
export type AutoSizerProps = {
  height: number;
  width: number;
};

export type TitlesProps = SortProps & ColumnProps;
export type RowProps = PresentRowProps &
  ColumnProps &
  RowItemProps &
  RowOtherProps;
export type ListWindowProps = ListProps &
  ColumnProps &
  SortProps &
  RowOtherProps;
export type ListWindowColumn = {
  name: string;
  label: string;
  setSort: () => void;
};
