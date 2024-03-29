import { Schema, Types, model, models, Document } from "mongoose";
import type { Currencies } from "./types";

export interface ExpenseType extends Document {
  _id?: Types.ObjectId;
  name?: string;
  user?: Types.ObjectId;
  category: string;
  location: string;
  amount: number;
  date: Date;
  currency: Currencies;
}

const expenseSchema = new Schema<ExpenseType>(
  {
    name: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    category: { type: String, required: true },
    location: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    currency: { type: String, default: "$" },
  },
  { timestamps: true }
);

export default models.Expense || model<ExpenseType>("Expense", expenseSchema);
