import type { NextApiRequest, NextApiResponse } from "next";
import type SessionType from "../../types/SessionType";
import { getLoginSession } from "../../passport/session";
import { errString } from "../../helpers/errors";
import {
  createUserPreferences,
  editUserPreferences,
  getPreferencesByUserId,
  removeUserPreferences,
} from "../../handlers/preferences";

const preferencesRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Get the user's session for their id
    const session: SessionType | undefined = await getLoginSession(req);
    if (session) {
      // Get the user's preferences
      if (req.method === "GET") {
        const preferences = await getPreferencesByUserId({ user: session._id });
        if (preferences) res.status(200).json(preferences);
        else throw new Error("Unable to retrieve user preferences.");
      }
      // Make a new user preferences document
      else if (req.method === "POST") {
        const body = JSON.parse(req.body);
        const preferences = await createUserPreferences({
          user: session._id,
          preference: body.preference,
        });
        if (preferences) res.status(200).json(preferences);
        else throw new Error("Unable to create new user preferences.");
      }
      // Edit the user's preferences
      else if (req.method === "PUT") {
        const body = JSON.parse(req.body);
        const preferences = await editUserPreferences({
          user: session._id,
          updates: body.updates,
        });
        if (preferences) res.status(200).json(preferences);
        else throw new Error("Unable to edit user preferences.");
      }
      // Remove a user's preferences
      else if (req.method === "DELETE") {
        const body = JSON.parse(req.body);
        const preferences = await removeUserPreferences({
          user: session._id,
          preferenceId: body.preferenceId,
        });
        if (preferences) res.status(200).json(preferences);
        else throw new Error("Unable to remove user preferences.");
      }
    } else throw new Error("Log in for user preferences.");
  } catch (e) {
    res.status(401).send(errString(e));
  }
};

export default preferencesRoute;
