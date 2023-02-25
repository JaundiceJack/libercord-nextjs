import { Types } from "mongoose";
import { PreferenceType } from "../../../../models/Preferences";

export type EditPreferencesProps = {
  updates: PreferenceType;
};
