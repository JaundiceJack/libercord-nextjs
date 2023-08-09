import { SelectItem } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";

interface CommonTypes {
  label?: string;
  shortLabel?: string;
  value: string | number | undefined;
  name: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
}

interface CheckboxTypes {
  defaultChecked: boolean;
  onClick: () => void;
}

interface TextualTypes {
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export type SelectOption = {
  value: string;
  label?: string;
  disabled?: boolean;
  [key: string]: any;
};

interface SelectTypes {
  loading?: boolean;
  options?: SelectOption[];
  onChange: (e: React.FormEvent<HTMLSelectElement>) => void;
}

interface TextEntryType {
  type?: string;
}

export type CheckboxProps = CommonTypes & CheckboxTypes;

export type TextEntryProps = CommonTypes & TextualTypes & TextEntryType;

export type DateEntryProps = CommonTypes & TextualTypes;

export type NumberEntryProps = CommonTypes & TextualTypes;

export type SelectProps = CommonTypes &
  Omit<TextualTypes, "onChange"> &
  SelectTypes;

export type CreatableSelect = SelectProps & {
  onTextEntry: (e: React.FormEvent<HTMLInputElement>) => void;
  setValue: Dispatch<SetStateAction<string>>;
};
