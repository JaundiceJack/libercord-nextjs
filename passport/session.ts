import Iron from "@hapi/iron";
import { MAX_AGE, setTokenCookie, getTokenCookie } from "./auth-cookies";
import type { NextApiRequest, NextApiResponse } from "next";
import { UserType } from "../models/User";
import SessionType from "../types/SessionType";

const pass = { secret: process.env.TOKEN_SECRET || "" };

export const setLoginSession = async (res: NextApiResponse, user: UserType) => {
  // Create a session object with a max age that we can validate later
  const session: SessionType = {
    ...user,
    createdAt: Date.now(),
    maxAge: MAX_AGE,
  };
  const cookie = await Iron.seal(session, pass, Iron.defaults);
  setTokenCookie(res, cookie);
};

export const getLoginSession = async (req: NextApiRequest) => {
  try {
    const cookie = getTokenCookie(req);
    if (!cookie) return;
    const session: SessionType = await Iron.unseal(
      cookie,
      pass.secret,
      Iron.defaults
    );
    const expiresAt = session.createdAt + session.maxAge * 1000;
    // Validate the expiration date of the session
    if (Date.now() > expiresAt) {
      throw new Error("Session expired");
    }
    return session;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
