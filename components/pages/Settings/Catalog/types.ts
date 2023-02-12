import { FormEvent } from "react";

export type SectionOption = "income" | "expense" | "asset" | "debt";
export type FieldOption = "source" | "category" | "location";

interface ButtonProps {
  onClick: () => void;
}
interface SectionButtons {
  name: SectionOption;
  selected: SectionOption;
}
interface FieldButtons {
  name: FieldOption;
  selected: FieldOption;
}

export type SectionButtonProps = ButtonProps & SectionButtons;

export type FieldButtonProps = ButtonProps & FieldButtons;

export interface OptionSectionProps {
  selected: SectionOption;
  setSection: (section: SectionOption) => void;
}

export interface OptionFieldProps {
  selected: FieldOption;
  setField: (section: FieldOption) => void;
  section: SectionOption;
}

export interface OptionEntryProps {
  field: FieldOption;
  newOption: string;
  setNewOption: (e: FormEvent<HTMLInputElement>) => void;
  onAdd: () => void;
}
