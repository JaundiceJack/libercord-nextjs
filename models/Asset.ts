import { Schema, Types, model, models, Document } from "mongoose";
import type { Currencies, TaxStatus } from "./types";

export interface AssetType extends Document {
  _id?: Types.ObjectId;
  name?: string;
  user?: Types.ObjectId;

  account: string; // coinbase, vanguard, self-custody, bank
  category: string; // such as stocks, bonds, options, crypto, gold
  ticker?: string; // BTC/SPROTT/TESLA the ticker or symbol it's listed under
  unitsPurchased: number; //
  taxStatus: TaxStatus;

  maturityDate?: Date; // for CDs/bonds
  yieldRate?: number; // % annual yield for bonds & crypto staking
  riskLevel?: number;
  notes?: string;

  // optional data about this asset document's timeOfPurchase info (can be ignored for a bulk entry)
  purchase?: {
    costBasis?: number; // unit price at time of purchase (to determine gains/losses later)
    averagePurchasePrice?: number; // if adding multiple purchases at once, APP could be used instead of costBasis
    totalAmountPaid?: number;
    totalFees?: number;
    currency?: Currencies; // currency used to purchase
    date?: Date;
    country?: string; // where it was purchased (for crazy international tax stuff)
    region?: string;
  };
}

const assetSchema = new Schema<AssetType>(
  {
    name: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "User" },

    account: { type: String, required: true },
    category: { type: String, required: true },
    ticker: { type: String },
    unitsPurchased: { type: Number, required: true },
    taxStatus: { type: String },
    maturityDate: { type: Date },
    yieldRate: { type: Number },
    riskLevel: { type: Number },
    notes: { type: String },

    purchase: {
      costBasis: { type: Number },
      averagePurchasePrice: { type: Number },
      totalAmountPaid: { type: Number },
      totalFees: { type: Number },
      dividendYield: { type: Number },
      currency: { type: String, default: "$" },
      date: { type: Date },
      country: { type: String },
      region: { type: String },
    },
  },
  { timestamps: true }
);

export default models.Asset || model<AssetType>("Asset", assetSchema);
