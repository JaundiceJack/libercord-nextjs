import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CatalogType } from "../models/Catalog";
import type { ReduxState } from "./store";

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

// Add an item to the catalog
export const addItemToCatalog = createAsyncThunk(
  "catalog/add",
  async ({
    section,
    field,
    item,
  }: {
    section: string;
    field: string;
    item: string;
  }) => {
    try {
      const body = JSON.stringify({ section, field, item });
      const catalog = await (
        await fetch("/api/catalog", {
          method: "POST",
          body,
        })
      ).json();
      return catalog;
    } catch (e) {
      return `Catalog Error: ${e}`;
    }
  }
);

// Edit an existing catalog item
export const editCatalogItem = createAsyncThunk(
  "catalog/edit",
  async ({
    section,
    field,
    oldItem,
    newItem,
  }: {
    section: string;
    field: string;
    oldItem: string;
    newItem: string;
  }) => {
    try {
      const body = JSON.stringify({ section, field, oldItem, newItem });
      const catalog = await (
        await fetch("/api/catalog", {
          method: "PUT",
          body,
        })
      ).json();
      return catalog;
    } catch (e) {
      return `Catalog Error: ${e}`;
    }
  }
);

// Remove an item from the catalog
export const deleteCatalogItem = createAsyncThunk(
  "catalog/delete",
  async ({
    section,
    field,
    item,
  }: {
    section: string;
    field: string;
    item: string;
  }) => {
    try {
      const body = JSON.stringify({ section, field, item });
      const catalog = await (
        await fetch("/api/catalog", {
          method: "DELETE",
          body,
        })
      ).json();
      return catalog;
    } catch (e) {
      return `Catalog Error: ${e}`;
    }
  }
);

export const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    resetCatalog: (state: CatalogState) => {
      state = initialState;
    },
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
      })
      .addCase(addItemToCatalog.pending, (state: CatalogState) => {
        state.catalogLoading = true;
      })
      .addCase(addItemToCatalog.fulfilled, (state: CatalogState, action) => {
        state.catalogLoading = false;
        state.catalog = action.payload;
      })
      .addCase(addItemToCatalog.rejected, (state: CatalogState, action) => {
        state.catalogLoading = false;
        if (typeof action.payload === "string")
          state.catalogError = action.payload;
      })
      .addCase(editCatalogItem.pending, (state: CatalogState) => {
        state.catalogLoading = true;
      })
      .addCase(editCatalogItem.fulfilled, (state: CatalogState, action) => {
        state.catalogLoading = false;
        state.catalog = action.payload;
      })
      .addCase(editCatalogItem.rejected, (state: CatalogState, action) => {
        state.catalogLoading = false;
        if (typeof action.payload === "string")
          state.catalogError = action.payload;
      })
      .addCase(deleteCatalogItem.pending, (state: CatalogState) => {
        state.catalogLoading = true;
      })
      .addCase(deleteCatalogItem.fulfilled, (state: CatalogState, action) => {
        state.catalogLoading = false;
        state.catalog = action.payload;
      })
      .addCase(deleteCatalogItem.rejected, (state: CatalogState, action) => {
        state.catalogLoading = false;
        if (typeof action.payload === "string")
          state.catalogError = action.payload;
      });
  },
});

export const {
  resetCatalog,
  toggleAddingCatalog,
  toggleEditingCatalog,
  toggleDeletingCatalog,
  clearCatalogError,
} = catalogSlice.actions;
export const selectCatalog = (state: ReduxState) => state.catalog;
export default catalogSlice.reducer;
