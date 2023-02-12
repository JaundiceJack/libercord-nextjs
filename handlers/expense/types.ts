import { Types } from "mongoose";
import type { ExpenseType } from "../../models/Expense";
import type { UserIdProp } from "../types";

interface ExpenseIdType {
  expenseId: Types.ObjectId | string;
}
interface CreateType {
  expense: ExpenseType;
}
interface EditType {
  updates: ExpenseType;
}

export type CreateExpense = UserIdProp & CreateType;
export type EditExpense = UserIdProp & ExpenseIdType & EditType;
export type RemoveExpense = UserIdProp & ExpenseIdType;
