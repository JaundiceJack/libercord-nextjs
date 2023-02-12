import { SelectItem } from "@mantine/core";

interface CommonTypes {
  label?: string;
  labelColor?: string;
  value: string;
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
  inputWidth?: string;
  labelWidth?: string;
}

interface SelectTypes {
  loading?: boolean;
  options?: (string | SelectItem)[];
  onChange: (value: string) => void;
  createOption?: (query: string) => string | SelectItem | null | undefined;
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
