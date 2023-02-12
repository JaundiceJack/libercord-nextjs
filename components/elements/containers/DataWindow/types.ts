import { IncomeType } from "../../../../models/Income";

interface CurrentWindowType {
  currentWindow: string;
}

interface ItemOptionsTypes {
  dataType: "income" | "expense" | "asset" | "debt";
  isSelected: boolean;
  openAddModal: () => void;
  openEditModal?: () => void;
  openDeleteModal?: () => void;
}

interface WindowOptionsType {
  setWindow: () => void;
}

interface WindowActionTypes {
  openColumnModal: () => void;
  exportData: () => void;
}

export type WindowActionsProps = CurrentWindowType & WindowActionTypes;

export type WindowOptionsProps = CurrentWindowType & WindowOptionsType;

export type ItemOptionProps = CurrentWindowType & ItemOptionsTypes;

export type ContentProps = {
  children: React.ReactNode;
};

export type HeaderProps = ItemOptionProps &
  WindowOptionsProps &
  WindowActionsProps;

export type DetailWindowProps = ContentProps &
  HeaderProps & {
    className?: string;
  };
