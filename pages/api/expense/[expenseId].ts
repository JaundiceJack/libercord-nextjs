import type { NextApiRequest, NextApiResponse } from "next";
import type SessionType from "../../../types/SessionType";
import { getLoginSession } from "../../../passport/session";
import { errString } from "../../../helpers/errors";
import { removeExpense } from "../../../handlers/expense";

const expenseRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Get the user's session for their id
    const session: SessionType | undefined = await getLoginSession(req);
    if (session) {
      // Remove an expense
      if (req.method === "DELETE") {
        const expenseId = req?.query?.expenseId as string | undefined;
        if (expenseId) {
          const expenses = await removeExpense({
            user: session._id,
            expenseId,
          });
          if (expenses) res.status(200).json(expenses);
          else if (expenses === []) res.status(200).json([]);
          else throw new Error("Unable to remove expense.");
        } else throw new Error("No expense ID provided.");
      }
    } else throw new Error("Log in for expenses.");
  } catch (e) {
    res.status(401).send(errString(e));
  }
};

export default expenseRoute;
