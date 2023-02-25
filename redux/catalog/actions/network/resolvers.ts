import { PayloadAction } from "@reduxjs/toolkit";
import { CatalogType } from "../../../../models/Catalog";
import { CatalogState } from "../../slice";

export const pending = (state: CatalogState) => {
  state.catalogLoading = true;
};

export const fulfilled = (
  state: CatalogState,
  action: PayloadAction<CatalogType>
) => {
  state.catalogLoading = false;
  state.catalog = action.payload;
};

export const rejected = (
  state: CatalogState,
  action: PayloadAction<unknown, string>
) => {
  state.catalogLoading = false;
  state.catalogError =
    typeof action.payload === "string" ? action.payload : undefined;
};
