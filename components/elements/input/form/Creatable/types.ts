import { Dispatch, SetStateAction } from "react";

export interface SelectOption {
  value: string;
  label?: string;
  disabled?: boolean;
  [key: string]: any;
}

export interface CreatableProps {
  value: string;
  name: string;
  onTextEntry: (e: React.FormEvent<HTMLInputElement>) => void;
  setValue: Dispatch<SetStateAction<string>>;
  label?: string;
  type?: string;
  options?: SelectOption[];
  loading?: boolean;
  shortLabel?: string;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
  required?: boolean;
  disabled?: boolean;
}
