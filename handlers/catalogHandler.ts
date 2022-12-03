import dbConnect from "../mongo/dbConnect";
import Catalog, {
  CatalogType,
  CatalogSections,
  CatalogFields,
} from "../models/Catalog";
import { Types } from "mongoose";

export const createDefaultCatalog = async (
  user: Types.ObjectId | undefined
): Promise<CatalogType> => {
  try {
    if (user) {
      const catalog = await Catalog.create({
        user,
        income: {
          categories: ["Paycheck", "Bonus"],
          sources: ["Full-time Job", "Part-time Job"],
        },
        expense: {
          categories: ["Groceries", "Gas", "Rent"],
          locations: ["Albertson's", "Walmart", "Amazon"],
        },
        asset: {
          categories: ["Gold", "Real-Estate", "Bitcoin", "Stock", "Bond"],
        },
        debt: {
          categories: ["Mortgage", "Student Loan", "Credit Card"],
        },
      });
      if (catalog) return catalog;
      else throw new Error("Unable to create a default option catalog.");
    } else throw new Error("No user id given for default option catalog.");
  } catch (e) {
    throw e;
  }
};

// Try to find a user's catalog of options for select elements
export const getCatalogByUserId = async (
  user: Types.ObjectId | undefined
): Promise<CatalogType | Error> => {
  try {
    if (user) {
      await dbConnect();
      const catalog = await Catalog.findOne<CatalogType>({ user });
      if (catalog) return catalog;
      else throw new Error("Could not find user catalog.");
    } else throw new Error("No user provided for catalog search.");
  } catch (e) {
    throw e;
  }
};

// Return the user's catalog with the new item inserted
export const createCatalogItem = async ({
  user,
  section,
  field,
  item,
}: {
  user: Types.ObjectId | undefined;
  section: CatalogSections;
  field: CatalogFields;
  item: string;
}): Promise<CatalogType> => {
  try {
    if (user) {
      await dbConnect();
      // Find the user's catalog of options
      const catalog = await Catalog.findOne<CatalogType>({ user });
      if (catalog) {
        // Try to save the new item to their catalog
        const saved = await _saveCatalogItem({
          catalog,
          section,
          field,
          item,
        });
        if (saved) return saved;
        else throw new Error(`Unable to save to ${section}.`);
      } else {
        // Create a catalog for the user if they had none
        const generated = await createDefaultCatalog(user);
        if (generated) {
          const saved = await _saveCatalogItem({
            catalog: generated,
            section,
            field,
            item,
          });
          if (saved) return saved;
          else throw new Error("Unable to save new option to user catalog.");
        } else throw new Error("Unable to create user catalog.");
      }
    } else throw new Error("No user provided when creating catalog item.");
  } catch (e) {
    throw e;
  }
};

// Try to save the new item to the given catalog
const _saveCatalogItem = async ({
  catalog,
  section,
  field,
  item,
}: {
  catalog: CatalogType;
  section: CatalogSections;
  field: CatalogFields;
  item: string;
}): Promise<CatalogType> => {
  try {
    // If the user has no array of the given, put the item in a new one
    if (!catalog[section][field] && catalog.save) {
      catalog[section][field] = [item];
      return await catalog.save();
    }
    // If the item has already been added, don't modify anything
    else if (catalog[section][field].includes(item)) {
      return catalog;
    }
    // Otherwise add the item to the user's catalog
    else if (catalog.save) {
      catalog[section][field].push(item);
      return await catalog.save();
    } else throw new Error("Catalog missing save function.");
  } catch (e) {
    throw e;
  }
};

// Remove the given item from a user's catalog
export const removeCatalogItem = async ({
  user,
  section,
  field,
  item,
}: {
  user: Types.ObjectId | undefined;
  section: CatalogSections;
  field: CatalogFields;
  item: string;
}): Promise<CatalogType> => {
  try {
    if (user) {
      await dbConnect();
      const catalog = await Catalog.findOne({ user });
      if (catalog) {
        catalog[section][field] = catalog[section][field].filter(
          (option: string) => option !== item
        );
        const saved = await catalog.save();
        if (saved) return saved;
        else throw new Error("Unable to remove option.");
      } else throw new Error("Unable to find user option catalog.");
    } else throw new Error("No user provided when removing catalog item.");
  } catch (e) {
    throw e;
  }
};
