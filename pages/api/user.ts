import type { NextApiRequest, NextApiResponse } from "next";
import { getLoginSession } from "../../passport/session";
import { findUser } from "../../handlers/user";

const user = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getLoginSession(req);
    const user =
      (session && (await findUser({ email: session.email }))) ?? null;
    // TODO: do this better somehow... idk
    if (user) {
      res.status(200).json({ user });
    } else {
      res.writeHead(302, { Location: "/" }).end();
    }
  } catch (error) {
    res.status(500).end("Authentication token is invalid, please log in");
  }
};

export default user;
