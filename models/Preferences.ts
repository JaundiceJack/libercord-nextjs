import { Schema, Types, model, models, Document } from "mongoose";
import { ExpenseSortOption, IncomeSortOption } from "../redux/types";
import {
  AssetChartTypeOption,
  ExpenseChartTypeOption,
  IncomeChartTypeOption,
  SummaryChartTypeOption,
} from "./types";

export interface PreferenceType extends Document {
  _id?: Types.ObjectId;
  user?: Types.ObjectId;
  initialSavings?: number;
  useNegativeExpenses?: boolean;
  defaultSummaryChartType?: SummaryChartTypeOption;
  defaultIncomeChartType?: IncomeChartTypeOption;
  defaultExpenseChartType?: ExpenseChartTypeOption;
  defaultAssetChartType?: AssetChartTypeOption;
  defaultExpenseColumns?: ExpenseSortOption[];
  defaultIncomeColumns?: IncomeSortOption[];
}

const perferenceSchema = new Schema<PreferenceType>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", unique: true },
    initialSavings: { type: Number, default: 0 },
    useNegativeExpenses: { type: Boolean, default: true },
    defaultSummaryChartType: { type: String, default: "line" },
    defaultIncomeChartType: { type: String, default: "pie" },
    defaultExpenseChartType: { type: String, default: "pie" },
    defaultAssetChartType: { type: String, default: "pie" },

    defaultExpenseColumns: {
      type: [String],
      default: ["date", "location", "category", "amount"],
    },
    defaultIncomeColumns: {
      type: [String],
      default: ["date", "source", "category", "amount"],
    },
  },
  { timestamps: true }
);

export default models.Preference ||
  model<PreferenceType>("Preference", perferenceSchema);
