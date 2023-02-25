import Expense, { ExpenseType } from "../../models/Expense";
import dbConnect from "../../mongo/dbConnect";
import type { UserIdProp } from "../types";
import type { CreateExpense, EditExpense, RemoveExpense } from "./types";

const getExpenses = async ({ user }: UserIdProp) => {
  const expenses = await Expense.find<ExpenseType>({ user });
  if (!expenses) throw new Error("Expense Error: Unable to find expenses.");

  return expenses;
};

const createUserExpense = async ({ user, expense }: CreateExpense) => {
  const created = await Expense.create({
    user,
    ...expense,
  });
  if (!created) throw new Error("Expense Error: Unable to create an expense.");

  return await getExpenses({ user });
};

const editUserExpense = async ({ user, expenseId, updates }: EditExpense) => {
  const edited = await Expense.findByIdAndUpdate(expenseId, updates);
  if (!edited) throw new Error("Expense Error: Unable to edit expense.");

  return await getExpenses({ user });
};

const removeUserExpense = async ({ user, expenseId }: RemoveExpense) => {
  const deleted = await Expense.findByIdAndDelete(expenseId);
  if (!deleted) throw new Error("Expense Error: Unable to delete expense.");

  return await getExpenses({ user });
};

const handleExpense =
  (action: string) =>
  async (
    props: UserIdProp | CreateExpense | EditExpense | RemoveExpense
  ): Promise<ExpenseType[]> => {
    try {
      if (props.user) {
        await dbConnect();
        switch (action) {
          case "get":
            return getExpenses(props as UserIdProp);
          case "make":
            return createUserExpense(props as CreateExpense);
          case "edit":
            return editUserExpense(props as EditExpense);
          case "remove":
            return removeUserExpense(props as RemoveExpense);
          default:
            throw new Error("Incorrect action given.");
        }
      } else throw new Error("No user given.");
    } catch (e) {
      throw e;
    }
  };

export const getExpensesByUserId = handleExpense("get");
export const createExpense = handleExpense("make");
export const editExpense = handleExpense("edit");
export const removeExpense = handleExpense("remove");

export const updateExpenseFieldsAfterCatalogModified = async ({
  user,
  field,
  item,
  replaceWith,
}: UserIdProp & { field: string; item: string; replaceWith?: string }) => {
  const expenses = await Expense.find<ExpenseType>({ user });
  if (!expenses) return;
  expenses.forEach(async (expense) => {
    let modified = false;
    if (field === "locations" && expense.location === item) {
      expense.location = replaceWith ?? "n/a";
      modified = true;
    } else if (field === "categories" && expense.category === item) {
      expense.category = replaceWith ?? "n/a";
      modified = true;
    }
    if (modified) await expense.save();
  });
};
