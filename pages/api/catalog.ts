import type { NextApiRequest, NextApiResponse } from "next";
import type SessionType from "../../types/SessionType";
import { getLoginSession } from "../../passport/session";
import { errString } from "../../helpers/errors";
import {
  createCatalogItem,
  getCatalogByUserId,
  removeCatalogItem,
} from "../../handlers/catalogHandler";

const catalogRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Get the user's session for their id
    const session: SessionType | undefined = await getLoginSession(req);
    if (session) {
      // Get the option catalog
      if (req.method === "GET") {
        const catalog = await getCatalogByUserId(session._id);
        if (catalog) res.status(200).json(catalog);
        else throw new Error("Unable to retrieve user options.");
      }
      // Make a new option
      else if (req.method === "POST") {
        const catalog = await createCatalogItem({
          user: session._id,
          section: req.body.section,
          field: req.body.field,
          item: req.body.item,
        });
        if (catalog) res.status(200).json(catalog);
        else throw new Error("Unable to create a new option.");
      }
      // Remove an option
      else if (req.method === "DELETE") {
        const catalog = await removeCatalogItem({
          user: session._id,
          section: req.body.section,
          field: req.body.field,
          item: req.body.item,
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
