import type { NextApiRequest, NextApiResponse } from "next";
import { errString } from "../../utils/helpers";
import { createUser } from "../../lib/user";
import { setLoginSession } from "../../lib/auth";

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
