import type { NextApiRequest, NextApiResponse } from "next";
import type SessionType from "../../types/SessionType";
import { getLoginSession } from "../../passport/session";
import { errString } from "../../helpers/errors";
import {
  createIncome,
  editIncome,
  getIncomesByUserId,
} from "../../handlers/income";
import { removeIncome } from "../../handlers/income";

const incomeRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Get the user's session for their id
    const session: SessionType | undefined = await getLoginSession(req);
    if (session) {
      // Get the user's incomes
      if (req.method === "GET") {
        const incomes = await getIncomesByUserId({ user: session._id });
        if (incomes) res.status(200).json(incomes);
        else if (incomes === []) res.status(200).json([]);
        else throw new Error("Unable to retrieve user incomes.");
      }
      // Make a new income
      else if (req.method === "POST") {
        const body = JSON.parse(req.body);
        const incomes = await createIncome({
          user: session._id,
          income: body.income,
        });
        if (incomes) res.status(200).json(incomes);
        else throw new Error("Unable to create a new income.");
      }
      // Edit an income
      else if (req.method === "PUT") {
        const body = JSON.parse(req.body);
        const incomes = await editIncome({
          user: session._id,
          incomeId: body.incomeId,
          updates: body.updates,
        });
        if (incomes) res.status(200).json(incomes);
        else throw new Error("Unable to edit selected income.");
      }
      // Remove an income
      else if (req.method === "DELETE") {
        const body = JSON.parse(req.body);
        const incomes = await removeIncome({
          user: session._id,
          incomeId: body.incomeId,
        });
        if (incomes) res.status(200).json(incomes);
        else if (incomes === []) res.status(200).json([]);
        else throw new Error("Unable to remove income.");
      }
    } else throw new Error("Log in for incomes.");
  } catch (e) {
    res.status(401).send(errString(e));
  }
};

export default incomeRoute;
