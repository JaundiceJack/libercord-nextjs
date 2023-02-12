import {
  CatalogFields,
  CatalogSections,
  CatalogType,
} from "../../models/Catalog";
import type { UserIdProp } from "../types";

interface CatalogSubTypes {
  section: CatalogSections;
  field: CatalogFields;
}
interface OptionType {
  item: string;
}
interface SaveType {
  catalog: CatalogType;
}
interface EditTypes {
  oldItem: string;
  newItem: string;
}

export type CreateOption = UserIdProp & CatalogSubTypes & OptionType;
export type SaveOption = SaveType & CatalogSubTypes & OptionType;
export type EditOption = UserIdProp & CatalogSubTypes & EditTypes;
export type RemoveOption = UserIdProp & CatalogSubTypes & OptionType;
