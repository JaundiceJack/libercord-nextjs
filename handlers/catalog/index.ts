import Catalog, { CatalogType } from "../../models/Catalog";
import dbConnect from "../../mongo/dbConnect";
import { createDefaultCatalog } from "../defaults";
import type { UserIdProp } from "../types";
import type {
  CreateOption,
  EditOption,
  RemoveOption,
  SaveOption,
} from "./types";

const getCatalog = async ({ user }: UserIdProp) => {
  const catalog = await Catalog.findOne<CatalogType>({ user });
  if (catalog) return catalog;
  else return createDefaultCatalog({ user }); // Create catalog if not found
};

const _saveCatalogItem = async ({
  catalog,
  section,
  field,
  item,
}: SaveOption) => {
  try {
    const optionArray = catalog[section][field];
    if (!optionArray)
      throw new Error(
        `Catalog Error: Catalog ${section} ${field} does not exist.`
      );

    // If the item has already been added, don't modify anything
    if (optionArray.includes(item.toLowerCase())) return catalog;

    // If the user has no array of the given, put the item in a new one
    if (optionArray.length === 0)
      catalog[section][field] = [item.toLowerCase()];
    // Otherwise add the item to the user's catalog
    else catalog[section][field].push(item.toLowerCase());

    const saved = await catalog.save();
    if (saved) return saved;
    else throw new Error("Catalog Error: Unable to save new option.");
  } catch (e) {
    throw e;
  }
};

const makeCatalogItem = async ({
  user,
  section,
  field,
  item,
}: CreateOption) => {
  const catalog =
    (await Catalog.findOne<CatalogType>({ user })) ??
    (await createDefaultCatalog({ user }));
  if (!catalog) throw new Error("Catalog Error: No user catalog found.");

  const saved = await _saveCatalogItem({
    catalog,
    section,
    field,
    item,
  });
  if (saved) return saved;
  else throw new Error(`Catalog Error: Unable to save to ${section}.`);
};

const editCatalogItem = async ({
  user,
  section,
  field,
  oldItem,
  newItem,
}: EditOption) => {
  const catalog = await Catalog.findOne({ user });
  if (!catalog) throw new Error("Catalog Error: Unable to find user catalog.");

  // Find the item to edit in the catalog's field option array
  const editIndex = catalog[section][field].findIndex(
    (item: string) => item === oldItem
  );
  if (editIndex !== -1) {
    catalog[section][field][editIndex] = newItem;
    const saved = await catalog.save();
    if (saved) return saved;
    else throw new Error("Catalog Error: Unable to save edited item.");
  } else throw new Error("Catalog Error: Unable to find item to edit.");
};

const removeCatalogItem = async ({
  user,
  section,
  field,
  item,
}: RemoveOption) => {
  const catalog = await Catalog.findOne({ user });
  if (!catalog) throw new Error("Catalog Error: Unable to find user catalog.");

  catalog[section][field] = catalog[section][field].filter(
    (option: string) => option.toLowerCase() !== item.toLowerCase()
  );
  const saved = await catalog.save();
  if (saved) return saved;
  else throw new Error("Catalog Error: Unable to remove option.");
};

const handleCatalog =
  (action: string) =>
  async (
    props: UserIdProp | CreateOption | EditOption | RemoveOption
  ): Promise<CatalogType> => {
    try {
      if (props.user) {
        await dbConnect();
        switch (action) {
          case "get":
            return getCatalog(props as UserIdProp);
          case "make":
            return makeCatalogItem(props as CreateOption);
          case "edit":
            return editCatalogItem(props as EditOption);
          case "remove":
            return removeCatalogItem(props as RemoveOption);
          default:
            throw new Error("Incorrect action given.");
        }
      } else throw new Error("No user given.");
    } catch (e) {
      throw e;
    }
  };

export const getUserCatalog = handleCatalog("get");
export const createUserCatalogItem = handleCatalog("make");
export const editUserCatalogItem = handleCatalog("edit");
export const removeUserCatalogItem = handleCatalog("remove");
