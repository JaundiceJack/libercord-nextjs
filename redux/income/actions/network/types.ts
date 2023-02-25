import { Types } from "mongoose";
import { IncomeType } from "../../../../models/Income";

interface IncomeId {
  expenseId: Types.ObjectId | null;
}

interface EditIncome {
  updates: IncomeType;
}

interface AddIncome {
  expense: IncomeType;
}

export type AddIncomeProps = AddIncome;

export type EditIncomeProps = EditIncome & IncomeId;

export type DeleteIncomeProps = IncomeId;
