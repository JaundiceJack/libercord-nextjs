import dbConnect from "../../mongo/dbConnect";
import { Types } from "mongoose";
import Income, { IncomeType } from "../../models/Income";
import type { UserIdProp } from "../types";
import type { CreateIncome, EditIncome, RemoveIncome } from "./types";

// Try to find a user's incomes
export const getIncomesByUserId = async ({
  user,
}: UserIdProp): Promise<IncomeType[]> => {
  try {
    if (user) {
      await dbConnect();
      const incomes = await Income.find<IncomeType>({ user });
      if (incomes) return incomes;
      else throw new Error("Could not find user incomes.");
    } else throw new Error("No user provided for income search.");
  } catch (e) {
    throw e;
  }
};

// Return the user's incomes with the new one inserted
export const createIncome = async ({
  user,
  income,
}: CreateIncome): Promise<IncomeType[]> => {
  try {
    if (user) {
      // TODO: Validate the income
      // Connect to the db and try to save the new income under the user id
      await dbConnect();
      const userIncome: IncomeType = {
        user,
        ...income,
      };
      const saved = await Income.create(userIncome);
      if (saved) {
        return await getIncomesByUserId({ user });
      } else throw new Error("Unable to save new income.");
    } else throw new Error("No user given for income creation.");
  } catch (e) {
    throw e;
  }
};

// Modify an income record
export const editIncome = async ({
  user,
  incomeId,
  updates,
}: EditIncome): Promise<IncomeType[]> => {
  try {
    if (user) {
      await dbConnect();
      let found: IncomeType | null = await Income.findById(incomeId);
      if (found) {
        // TODO: Validate new income updates
        found = Object.assign(found, updates);
        const saved = found.save ? await found.save() : undefined;
        if (saved) {
          return await getIncomesByUserId({ user });
        } else throw new Error("Unable to save edits to the selected income.");
      } else throw new Error("Selected income not found while editing.");
    } else throw new Error("No user given when editing income.");
  } catch (e) {
    throw e;
  }
};

// Remove the given income
export const removeIncome = async ({
  user,
  incomeId,
}: RemoveIncome): Promise<IncomeType[]> => {
  try {
    if (user) {
      await dbConnect();
      const found = await Income.findById(incomeId);
      if (found) {
        const deleted = await found.delete();
        if (deleted) {
          return await getIncomesByUserId({ user });
        } else throw new Error("Unable to remove selected income.");
      } else throw new Error("Unable to find selected income.");
    } else throw new Error("No user given for income removal.");
  } catch (e) {
    throw e;
  }
};
