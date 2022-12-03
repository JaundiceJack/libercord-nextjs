import type { NextApiRequest, NextApiResponse } from "next";
import { errString } from "../../helpers/errors";
import { createUser } from "../../handlers/userHandler";
import { setLoginSession } from "../../passport/session";

const signup = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const user = await createUser(req.body.email, req.body.password);
    await setLoginSession(res, user);
    res.status(200).send({ done: true });
  } catch (e) {
    res.status(500).end(errString(e));
  }
};

export default signup;
