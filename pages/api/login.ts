import type { NextApiRequest, NextApiResponse } from "next";
import type { UserType } from "../../models/User";
import passport from "passport";
import nextConnect from "next-connect";
import { localStrategy } from "../../passport/password-local";
import { setLoginSession } from "../../passport/session";
import { errString } from "../../helpers/errors";

const authenticate = (
  method: string,
  req: NextApiRequest,
  res: NextApiResponse
) =>
  new Promise<UserType>((resolve, reject) => {
    passport.authenticate(method, { session: false }, async (error, user) => {
      if (error) {
        reject(error);
      } else {
        resolve(await user);
      }
    })(req, res);
  });

passport.use(localStrategy);

export default nextConnect()
  .use(passport.initialize())
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const user: UserType = await authenticate("local", req, res);
      await setLoginSession(res, user);
      res.status(200).send({ done: true });
    } catch (e) {
      res.status(401).send(errString(e));
    }
  });
