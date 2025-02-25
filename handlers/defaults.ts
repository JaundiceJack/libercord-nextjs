import Catalog, { CatalogType } from "../models/Catalog";
import Preference, { PreferenceType } from "../models/Preferences";
import { UserIdProp } from "./types";

export const createDefaultPreferences = async ({
  user,
  initialSavings,
}: UserIdProp & { initialSavings?: number }): Promise<PreferenceType> => {
  try {
    if (!user)
      throw new Error(
        "Preference Error: No user id given for default user preferences."
      );

    const preferences = await Preference.create({
      user,
      initialSavings,
    });

    if (!preferences)
      throw new Error(
        "Preference Error: Unable to create default user preferences."
      );
    return preferences;
  } catch (e) {
    throw e;
  }
};

export const createDefaultCatalog = async ({
  user,
}: UserIdProp): Promise<CatalogType> => {
  try {
    if (!user)
      throw new Error(
        "Catalog Error: No user id given for default user catalog."
      );

    const catalog = await Catalog.create({
      user,
      income: {
        categories: ["paycheck", "bonus"],
        sources: ["full-time job", "part-time job"],
      },
      expense: {
        categories: ["groceries", "gas", "rent"],
        locations: ["albertson's", "walmart", "amazon"],
      },
      asset: {
        // since these would be pretty much the same for all,
        // might move this out of the users' catalog so its not duplicated eveywhere needlessly
        // further, shouldn't this be determined from the ticker, or i guess not
        // i would use the selection here to determine which API to use for querying a list of assets
        //
        accounts: ["default"],
      },
      debt: {
        categories: ["mortgage", "student loan", "credit card"],
      },
    });

    if (!catalog)
      throw new Error(
        "Catalog Error: Unable to create a default option catalog."
      );
    return catalog;
  } catch (e) {
    throw e;
  }
};
