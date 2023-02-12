import { Types } from "mongoose";
import type { IncomeType } from "../../models/Income";
import type { UserIdProp } from "../types";

interface IncomeIdType {
  incomeId: Types.ObjectId | string;
}
interface CreateType {
  income: IncomeType;
}
interface EditType {
  updates: IncomeType;
}

export type CreateIncome = UserIdProp & CreateType;
export type EditIncome = UserIdProp & IncomeIdType & EditType;
export type RemoveIncome = UserIdProp & IncomeIdType;
