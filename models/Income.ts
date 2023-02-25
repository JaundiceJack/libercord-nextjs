import { Schema, Types, model, models, Document } from "mongoose";
import type { Currencies } from "./types";

export interface IncomeType extends Document {
  _id?: Types.ObjectId;
  name?: string;
  user?: Types.ObjectId;
  category: string;
  source: string;
  amount: number;
  date: Date;
  currency: Currencies;
}

const incomeSchema = new Schema<IncomeType>(
  {
    name: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    category: { type: String, required: true },
    source: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    currency: { type: String, default: "$" },
  },
  { timestamps: true }
);

export default models.Income || model<IncomeType>("Income", incomeSchema);
