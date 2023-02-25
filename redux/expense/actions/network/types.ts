import { Types } from "mongoose";
import { ExpenseType } from "../../../../models/Expense";

interface ExpenseId {
  expenseId: Types.ObjectId | null;
}

interface EditExpense {
  updates: ExpenseType;
}

interface AddExpense {
  expense: ExpenseType;
}

export type AddExpenseProps = AddExpense;

export type EditExpenseProps = EditExpense & ExpenseId;

export type DeleteExpenseProps = ExpenseId;
