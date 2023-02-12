import dbConnect from "../../mongo/dbConnect";
import Catalog, {
  CatalogType,
  CatalogSections,
  CatalogFields,
} from "../../models/Catalog";
import type { UserIdProp } from "../types";
import type {
  CreateOption,
  SaveOption,
  EditOption,
  RemoveOption,
} from "./types";

export const createDefaultCatalog = async ({
  user,
}: UserIdProp): Promise<CatalogType> => {
  try {
    if (user) {
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
          categories: ["gold", "real-estate", "bitcoin", "stock", "bond"],
        },
        debt: {
          categories: ["mortgage", "student loan", "credit card"],
        },
      });
      if (catalog) return catalog;
      else
        throw new Error(
          "Catalog Error: Unable to create a default option catalog."
        );
    } else
      throw new Error(
        "Catalog Error: No user id given for default option catalog."
      );
  } catch (e) {
    throw e;
  }
};

// Try to find a user's catalog of options for select elements,
export const getCatalogByUserId = async ({
  user,
}: UserIdProp): Promise<CatalogType | Error> => {
  try {
    if (user) {
      await dbConnect();
      const catalog = await Catalog.findOne<CatalogType>({ user });
      if (catalog) return catalog;
      // create one for them if none was found
      else return createDefaultCatalog({ user });
    } else
      throw new Error(
        "Catalog Retrieval Error: No user provided for catalog search."
      );
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
}: CreateOption): Promise<CatalogType> => {
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
        const generated = await createDefaultCatalog({ user });
        if (generated) {
          const saved = await _saveCatalogItem({
            catalog: generated,
            section,
            field,
            item,
          });
          if (saved) return saved;
          else
            throw new Error(
              "Catalog Create Error: Unable to save new option to user catalog."
            );
        } else
          throw new Error(
            "Catalog Create Error: Unable to create user catalog."
          );
      }
    } else throw new Error("Catalog Create Error: No user provided.");
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
}: SaveOption): Promise<CatalogType> => {
  try {
    let optionArray = catalog[section][field];
    if (!optionArray)
      throw new Error(
        `Catalog Save Error: Catalog field: ${field} does not exist.`
      );
    else {
      // If the user has no array of the given, put the item in a new one
      if (optionArray.length === 0 && catalog.save) {
        catalog[section][field] = [item.toLowerCase()];
        return await catalog.save();
      }
      // If the item has already been added, don't modify anything
      else if (optionArray.includes(item.toLowerCase())) {
        return catalog;
      }
      // Otherwise add the item to the user's catalog
      else if (catalog.save) {
        catalog[section][field].push(item.toLowerCase());
        return await catalog.save();
      } else
        throw new Error("Catalog Save Error: Catalog missing save function.");
    }
  } catch (e) {
    throw e;
  }
};

// Edit a given catalog item to the newItem
export const editCatalogItem = async ({
  user,
  section,
  field,
  oldItem,
  newItem,
}: EditOption): Promise<CatalogType> => {
  try {
    if (user) {
      await dbConnect();
      // Find the user's catalog of options
      const catalog = await Catalog.findOne<CatalogType>({ user });
      if (catalog) {
        // Try to edit the item from the old one to the new
        const editIndex = catalog[section][field].findIndex(
          (item) => item === oldItem
        );
        if (editIndex !== -1) {
          catalog[section][field][editIndex] = newItem;
          const saved = catalog.save && (await catalog.save());
          if (saved) return saved;
          else
            throw new Error("Catalog Edit Error: Unable to save edited item.");
        } else
          throw new Error(
            "Catalog Edit Error: Unable to find old item to edit."
          );
      } else
        throw new Error("Catalog Edit Error: Unable to find user's catalog.");
    } else throw new Error("Catalog Edit Error: No user provided.");
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
}: RemoveOption): Promise<CatalogType> => {
  try {
    if (user) {
      await dbConnect();
      const catalog = await Catalog.findOne({ user });
      if (catalog) {
        catalog[section][field] = catalog[section][field].filter(
          (option: string) => option !== item.toLowerCase()
        );
        const saved = await catalog.save();
        if (saved) return saved;
        else throw new Error("Catalog Delete Error: Unable to remove option.");
      } else
        throw new Error(
          "Catalog Delete Error: Unable to find user option catalog."
        );
    } else throw new Error("Catalog Delete Error: No user provided.");
  } catch (e) {
    throw e;
  }
};
