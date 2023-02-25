import { Types } from "mongoose";
import type { PreferenceType } from "../../models/Preferences";
import type { UserIdProp } from "../types";

interface PreferenceIdType {
  preferenceId: Types.ObjectId | string;
}
interface CreateType {
  preference: PreferenceType;
}
interface EditType {
  updates: PreferenceType;
}

export type CreatePreference = UserIdProp & CreateType;
export type EditPreference = UserIdProp & EditType;
export type RemovePreference = UserIdProp & PreferenceIdType;
