import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { CatalogType } from "../models/Catalog";
import type { ReduxState, ReduxThunk } from "./store";

export interface CatalogState {
  catalog: CatalogType | null;
  catalogMode: "viewing" | "adding" | "editing" | "deleting";
  catalogError: string | undefined;
  catalogLoading: boolean;
}

const initialState: CatalogState = {
  catalog: null,
  catalogMode: "viewing",
  catalogError: undefined,
  catalogLoading: false,
};

// Export a function to load a user's catalogs to run at page load
export const getInitialCatalog = createAsyncThunk("catalog/load", async () => {
  try {
    const catalog = await (await fetch("/api/catalog")).json();
    return catalog;
  } catch (e) {
    return `Catalog Error: ${e}`;
  }
});

export const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    toggleAddingCatalog: (state: CatalogState) => {
      state.catalogMode = "adding";
    },
    toggleEditingCatalog: (state: CatalogState) => {
      state.catalogMode = "editing";
    },
    toggleDeletingCatalog: (state: CatalogState) => {
      state.catalogMode = "deleting";
    },
    clearCatalogError: (state: CatalogState) => {
      state.catalogError = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInitialCatalog.pending, (state: CatalogState) => {
        state.catalogLoading = true;
      })
      .addCase(getInitialCatalog.fulfilled, (state: CatalogState, action) => {
        state.catalogLoading = false;
        state.catalog = action.payload;
      })
      .addCase(getInitialCatalog.rejected, (state: CatalogState, action) => {
        state.catalogLoading = false;
        if (typeof action.payload === "string")
          state.catalogError = action.payload;
      });
  },
});

export const {
  toggleAddingCatalog,
  toggleEditingCatalog,
  toggleDeletingCatalog,
  clearCatalogError,
} = catalogSlice.actions;
export const selectCatalog = (state: ReduxState) => state.catalog;
export default catalogSlice.reducer;
