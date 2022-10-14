import type { NextApiRequest, NextApiResponse } from "next";
import { getLoginSession } from "../../lib/auth";
import { findUser } from "../../lib/user";

const user = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getLoginSession(req);
    console.log("Session: ", session);
    const user = (session && (await findUser(session.email))) ?? null;
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).end("Authentication token is invalid, please log in");
  }
};

export default user;
