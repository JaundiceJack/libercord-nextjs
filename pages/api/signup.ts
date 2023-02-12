import type { NextApiRequest, NextApiResponse } from "next";
import { errString } from "../../helpers/errors";
import { createUser } from "../../handlers/user";
import { setLoginSession } from "../../passport/session";

const signup = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const user = await createUser({
      email: req.body.email,
      password: req.body.password,
    });
    await setLoginSession(res, user);
    res.status(200).send({ done: true });
  } catch (e) {
    res.status(500).end(errString(e));
  }
};

export default signup;
