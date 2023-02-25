import type { NextApiRequest, NextApiResponse } from "next";
import type SessionType from "../../types/SessionType";
import { getLoginSession } from "../../passport/session";
import { errString } from "../../helpers/errors";
import {
  getUserCatalog,
  createUserCatalogItem,
  editUserCatalogItem,
  removeUserCatalogItem,
} from "../../handlers/catalog";
import { CatalogFields, CatalogSections } from "../../models/Catalog";

const catalogRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Get the user's session for their id
    const session: SessionType | undefined = await getLoginSession(req);
    if (session) {
      // Get the option catalog
      if (req.method === "GET") {
        const catalog = await getUserCatalog({ user: session._id });
        if (catalog) res.status(200).json(catalog);
        else throw new Error("Unable to retrieve user options.");
      }
      // Make a new option
      else if (req.method === "POST") {
        const body = JSON.parse(req.body);
        const catalog = await createUserCatalogItem({
          user: session._id,
          section: body.section as CatalogSections,
          field: body.field as CatalogFields,
          item: body.item,
        });
        if (catalog) res.status(200).json(catalog);
        else throw new Error("Unable to create a new option.");
      }
      // Edit an option
      else if (req.method === "PUT") {
        const body = JSON.parse(req.body);
        const catalog = await editUserCatalogItem({
          user: session._id,
          section: body.section as CatalogSections,
          field: body.field as CatalogFields,
          oldItem: body.oldItem,
          newItem: body.newItem,
        });
        if (catalog) res.status(200).json(catalog);
        else throw new Error("Unable to edit option.");
      }
      // Remove an option
      else if (req.method === "DELETE") {
        const body = JSON.parse(req.body);
        const catalog = await removeUserCatalogItem({
          user: session._id,
          section: body.section,
          field: body.field,
          item: body.item,
        });
        if (catalog) res.status(200).json(catalog);
        else throw new Error("Unable to remove option.");
      }
    } else throw new Error("Log in for options.");
  } catch (e) {
    res.status(401).send(errString(e));
  }
};

export default catalogRoute;
