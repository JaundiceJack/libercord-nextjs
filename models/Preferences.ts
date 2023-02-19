import { Schema, Types, model, models } from "mongoose";
import {
  DistributionChartPreference,
  SequentialChartPreference,
} from "./types";

export interface PreferenceType {
  _id?: Types.ObjectId;
  user?: Types.ObjectId;
  initialSavings?: number;
  defaultSequentialChartType?: SequentialChartPreference;
  defaultDistributionChartType?: DistributionChartPreference;
  save?: () => Promise<PreferenceType | Error>;
}

const perferenceSchema = new Schema<PreferenceType>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    initialSavings: { type: Number },
    defaultSequentialChartType: { type: String, default: "line" },
    defaultDistributionChartType: { type: String, default: "pie" },
  },
  { timestamps: true }
);

export default models.Preference ||
  model<PreferenceType>("Preference", perferenceSchema);
