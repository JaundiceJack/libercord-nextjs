import { Types } from "mongoose";
import { IncomeType } from "../../../../models/Income";

interface IncomeId {
  incomeId: Types.ObjectId | null;
}

interface EditIncome {
  updates: IncomeType;
}

interface AddIncome {
  income: IncomeType;
}

export type AddIncomeProps = AddIncome;

export type EditIncomeProps = EditIncome & IncomeId;

export type DeleteIncomeProps = IncomeId;
