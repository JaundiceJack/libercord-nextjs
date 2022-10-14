import type { NextApiRequest, NextApiResponse } from "next";
import { removeTokenCookie } from "../../lib/auth-cookies";

const logout = async (req: NextApiRequest, res: NextApiResponse) => {
  removeTokenCookie(res);
  res.writeHead(302, { Location: "/" });
  res.end();
};

export default logout;
