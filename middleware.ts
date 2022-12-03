// middleware.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { errString } from "./helpers/errors";
import { getLoginSession } from "./passport/session";

// TODO: ill come back to this later,
// for now i can just check the session in the api call to get session/user id
// i tried doing it like i had before where i attach user id to the request'
// but with TS, i have to add in the type and change a bunch of stuff

export default async (req: NextApiRequest) => {
  try {
    const session = await getLoginSession(req);
    if (session) {
      return;
    } else return NextResponse.redirect(new URL("/", req.url));
  } catch (e) {
    throw errString(e);
  }
};

export const config = {
  matcher: ["/catalog", "/income", "/expense", "/asset", "/debt"],
};
