import { FormEvent } from "react";

export type SectionOption = "income" | "expense" | "asset" | "debt";
export type FieldOption = "source" | "category" | "location";

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

export interface OptionsListProps {
  selectedField: FieldOption;
  selectedSection: SectionOption;
}
