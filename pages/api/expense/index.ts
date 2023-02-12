import type { NextApiRequest, NextApiResponse } from "next";
import type SessionType from "../../../types/SessionType";
import { getLoginSession } from "../../../passport/session";
import { errString } from "../../../helpers/errors";
import {
  createExpense,
  editExpense,
  getExpensesByUserId,
} from "../../../handlers/expense";

const expenseRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Get the user's session for their id
    const session: SessionType | undefined = await getLoginSession(req);
    if (session) {
      // Get the user's expenses
      if (req.method === "GET") {
        const expenses = await getExpensesByUserId({ user: session._id });
        if (expenses) res.status(200).json(expenses);
        else if (expenses === []) res.status(200).json([]);
        else throw new Error("Unable to retrieve user expenses.");
      }
      // Make a new expense
      else if (req.method === "POST") {
        const body = JSON.parse(req.body);
        const expenses = await createExpense({
          user: session._id,
          expense: body.expense,
        });
        if (expenses) res.status(200).json(expenses);
        else throw new Error("Unable to create a new expense.");
      }
      // Edit an expense
      else if (req.method === "PUT") {
        const body = JSON.parse(req.body);
        const expenses = await editExpense({
          user: session._id,
          expenseId: body.expenseId,
          updates: body.updates,
        });
        if (expenses) res.status(200).json(expenses);
        else throw new Error("Unable to edit selected expense.");
      }
    } else throw new Error("Log in for expenses.");
  } catch (e) {
    res.status(401).send(errString(e));
  }
};

export default expenseRoute;
