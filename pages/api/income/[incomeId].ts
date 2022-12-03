import type { NextApiRequest, NextApiResponse } from "next";
import type SessionType from "../../../types/SessionType";
import { getLoginSession } from "../../../passport/session";
import { errString } from "../../../helpers/errors";
import { removeIncome } from "../../../handlers/incomeHandler";

const incomeRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Get the user's session for their id
    const session: SessionType | undefined = await getLoginSession(req);
    if (session) {
      // Remove an income
      if (req.method === "DELETE") {
        const { incomeId } = req.query;
        if (incomeId && typeof incomeId === "string") {
          const incomes = await removeIncome({
            userId: session._id,
            incomeId,
          });
          if (incomes) res.status(200).json(incomes);
          else if (incomes === []) res.status(200).json([]);
          else throw new Error("Unable to remove income.");
        } else throw new Error("No income ID provided.");
      }
    } else throw new Error("Log in for incomes.");
  } catch (e) {
    res.status(401).send(errString(e));
  }
};

export default incomeRoute;
