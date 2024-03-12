import { Dispatch, SetStateAction } from "react";
import { CatalogType } from "../../../../../models/Catalog";

export interface SelectOption {
  value: string;
  label?: string;
  aliases?: string[];
  disabled?: boolean;
  [key: string]: any;
}

export interface CreatableProps {
  catalog?: CatalogType | null;
  catalogSection?: string;
  catalogField?: string;
  catalogLoading?: boolean;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  defaultValue?: string;
  isSearchableOnly?: boolean;
  name: string;
  onTextEntry: (e: React.FormEvent<HTMLInputElement>) => void;

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
