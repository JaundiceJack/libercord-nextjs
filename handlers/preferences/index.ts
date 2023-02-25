import Preference, { PreferenceType } from "../../models/Preferences";
import dbConnect from "../../mongo/dbConnect";
import { createDefaultPreferences } from "../defaults";
import type { UserIdProp } from "../types";
import type {
  CreatePreference,
  EditPreference,
  RemovePreference,
} from "./types";

const getPreferences = async ({ user }: UserIdProp) => {
  const preferences = await Preference.findOne<PreferenceType>({ user });
  if (preferences) return preferences;
  else return createDefaultPreferences({ user }); // Create preferences if not found
};

const makePreferences = async ({ user, preference }: CreatePreference) => {
  const saved = await Preference.create({
    user,
    ...preference,
  });
  if (saved) return await getPreferences({ user });
  else throw new Error("Preference Error: Unable to create user preferences.");
};

const editPreferences = async ({ user, updates }: EditPreference) => {
  const edited = await Preference.findOneAndUpdate<PreferenceType>(
    { user },
    updates
  );
  if (edited) return await getPreferences({ user });
  else throw new Error("Preference Error: Unable to edit user preferences.");
};

const removePreferences = async ({ user, preferenceId }: RemovePreference) => {
  const deleted = await Preference.findByIdAndRemove(preferenceId);
  if (deleted) return await getPreferences({ user });
  else throw new Error("Preference Error: Unable to remove user preferences.");
};

const handlePreference =
  (action: string) =>
  async (
    props: UserIdProp | CreatePreference | EditPreference | RemovePreference
  ): Promise<PreferenceType> => {
    try {
      if (props.user) {
        await dbConnect();
        switch (action) {
          case "get":
            return getPreferences(props as UserIdProp);
          case "make":
            return makePreferences(props as CreatePreference);
          case "edit":
            return editPreferences(props as EditPreference);
          case "remove":
            return removePreferences(props as RemovePreference);
          default:
            throw new Error("Incorrect action given.");
        }
      } else throw new Error("No user given.");
    } catch (e) {
      throw e;
    }
  };

export const getPreferencesByUserId = handlePreference("get");
export const createUserPreferences = handlePreference("make");
export const editUserPreferences = handlePreference("edit");
export const removeUserPreferences = handlePreference("remove");
