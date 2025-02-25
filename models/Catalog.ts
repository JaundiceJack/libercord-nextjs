// The Catalog document contains user-created options for select-elements

import { Schema, Types, model, models, Document } from "mongoose";

/* While it increases the chance that I can accidentally try to save to a DB 
field that doesn't exist, defining the catalog by shape allows me to access
the arrays by less specific indices, like catalog[section][field] in TS. */
interface CatalogDetails extends Document {
  user: Types.ObjectId;
}
interface CatalogShape {
  [key: string]: {
    [key: string]: string[];
  };
}
export type CatalogType = CatalogDetails & CatalogShape;
export type CatalogSections = "income" | "expense" | "asset" | "debt";
export type CatalogFields = "sources" | "categories" | "locations";

const catalogSchema = new Schema<CatalogType>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    income: {
      categories: [{ type: String }],
      sources: [{ type: String }],
    },
    expense: {
      categories: [{ type: String }],
      locations: [{ type: String }],
    },
    asset: {
      accounts: [{ type: String }],
    },
    debt: {
      categories: [{ type: String }],
    },
  },
  { timestamps: true }
);

export default models.Catalog || model<CatalogType>("Catalog", catalogSchema);
