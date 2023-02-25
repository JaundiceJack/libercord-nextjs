import Income, { IncomeType } from "../../models/Income";
import dbConnect from "../../mongo/dbConnect";
import type { UserIdProp } from "../types";
import type { CreateIncome, EditIncome, RemoveIncome } from "./types";

const getIncomes = async ({ user }: UserIdProp) => {
  const incomes = await Income.find<IncomeType>({ user });
  if (!incomes) throw new Error("Income Error: Unable to find incomes.");

  return incomes;
};

const createUserIncome = async ({ user, income }: CreateIncome) => {
  const created = await Income.create({
    user,
    ...income,
  });
  if (!created) throw new Error("Income Error: Unable to create an income.");

  return await getIncomes({ user });
};

const editUserIncome = async ({ user, incomeId, updates }: EditIncome) => {
  const edited = await Income.findByIdAndUpdate(incomeId, updates);
  if (!edited) throw new Error("Income Error: Unable to edit income.");

  return await getIncomes({ user });
};

const removeUserIncome = async ({ user, incomeId }: RemoveIncome) => {
  const deleted = await Income.findByIdAndDelete(incomeId);
  if (!deleted) throw new Error("Income Error: Unable to delete income.");

  return await getIncomes({ user });
};

const handleIncome =
  (action: string) =>
  async (
    props: UserIdProp | CreateIncome | EditIncome | RemoveIncome
  ): Promise<IncomeType[]> => {
    try {
      if (props.user) {
        await dbConnect();
        switch (action) {
          case "get":
            return getIncomes(props as UserIdProp);
          case "make":
            return createUserIncome(props as CreateIncome);
          case "edit":
            return editUserIncome(props as EditIncome);
          case "remove":
            return removeUserIncome(props as RemoveIncome);
          default:
            throw new Error("Incorrect action given.");
        }
      } else throw new Error("No user given.");
    } catch (e) {
      throw e;
    }
  };

export const getIncomesByUserId = handleIncome("get");
export const createIncome = handleIncome("make");
export const editIncome = handleIncome("edit");
export const removeIncome = handleIncome("remove");

export const updateIncomeFieldsAfterCatalogModified = async ({
  user,
  field,
  item,
  replaceWith,
}: UserIdProp & { field: string; item: string; replaceWith?: string }) => {
  const incomes = await Income.find<IncomeType>({ user });
  if (!incomes) return;
  incomes.forEach(async (income) => {
    let modified = false;
    if (field === "source" && income.source === item) {
      income.source = replaceWith ?? "n/a";
      modified = true;
    } else if (field === "categories" && income.category === item) {
      income.category = replaceWith ?? "n/a";
      modified = true;
    }
    if (modified) await income.save();
  });
};
