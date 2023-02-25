import Expense, { ExpenseType } from "../../models/Expense";
import dbConnect from "../../mongo/dbConnect";
import { EditOption, RemoveOption } from "../catalog/types";
import type { UserIdProp } from "../types";
import type { CreateExpense, EditExpense, RemoveExpense } from "./types";

// Try to find a user's expenses
export const getExpensesByUserId = async ({
  user,
}: UserIdProp): Promise<ExpenseType[]> => {
  try {
    if (user) {
      await dbConnect();
      const expenses = await Expense.find<ExpenseType>({ user });
      if (expenses) return expenses;
      else throw new Error("Could not find user expenses.");
    } else throw new Error("No user provided for expense search.");
  } catch (e) {
    throw e;
  }
};

// Return the user's expenses with the new one inserted
export const createExpense = async ({ user, expense }: CreateExpense) => {
  try {
    if (user) {
      // TODO: Validate the expense
      // Connect to the db and try to save the new expense under the user id
      await dbConnect();
      const userExpense = {
        user,
        ...expense,
      };
      const saved = await Expense.create(userExpense);
      if (saved) {
        return await getExpensesByUserId({ user });
      } else throw new Error("Unable to save new expense.");
    } else throw new Error("No user given for expense creation.");
  } catch (e) {
    throw e;
  }
};

// Modify an expense record
export const editExpense = async ({
  user,
  expenseId,
  updates,
}: EditExpense): Promise<ExpenseType[]> => {
  try {
    if (user) {
      await dbConnect();
      let found: ExpenseType | null = await Expense.findById(expenseId);
      if (found) {
        // TODO: Validate new expense updates
        found = Object.assign(found, updates);
        const saved = found.save ? await found.save() : undefined;
        if (saved) {
          return await getExpensesByUserId({ user });
        } else throw new Error("Unable to save edits to the selected expense.");
      } else throw new Error("Selected expense not found while editing.");
    } else throw new Error("No user given when editing expense.");
  } catch (e) {
    throw e;
  }
};

// Remove the given expense
export const removeExpense = async ({
  user,
  expenseId,
}: RemoveExpense): Promise<ExpenseType[]> => {
  try {
    if (user) {
      await dbConnect();
      const found = await Expense.findById(expenseId);
      if (found) {
        const deleted = await found.delete();
        if (deleted) {
          return await getExpensesByUserId({ user });
        } else throw new Error("Unable to remove selected expense.");
      } else throw new Error("Unable to find selected expense.");
    } else throw new Error("No user given for expense removal.");
  } catch (e) {
    throw e;
  }
};

export const editExpenseFieldsAfterCatalogModified = async ({
  user,
  field,
  oldItem,
  newItem,
}: Omit<EditOption, "section">) => {
  const expenses = await Expense.find<ExpenseType>({ user });
  if (!expenses) return;
  expenses.forEach(async (expense) => {
    let modified = false;
    if (field === "locations" && expense.location === oldItem) {
      expense.location = newItem;
      modified = true;
    } else if (field === "categories" && expense.category === oldItem) {
      expense.category = newItem;
      modified = true;
    }
    if (modified) await expense.save();
  });
};

export const defaultExpenseFieldsAfterCatalogModified = async ({
  user,
  field,
  item,
}: Omit<RemoveOption, "section">) => {
  const expenses = await Expense.find<ExpenseType>({ user });
  if (!expenses) return;
  expenses.forEach(async (expense) => {
    let modified = false;
    if (field === "locations" && expense.location === item) {
      expense.location = "n/a";
      modified = true;
    } else if (field === "categories" && expense.category === item) {
      expense.category = "n/a";
      modified = true;
    }
    if (modified) await expense.save();
  });
};
