import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { CatalogState } from "../../slice";
import {
  addItemToCatalog,
  deleteCatalogItem,
  editCatalogItem,
  getInitialCatalog,
} from "./requests";
import { fulfilled, pending, rejected } from "./resolvers";

export default (builder: ActionReducerMapBuilder<CatalogState>) => {
  builder
    // Load Catalog
    .addCase(getInitialCatalog.pending, pending)
    .addCase(getInitialCatalog.fulfilled, fulfilled)
    .addCase(getInitialCatalog.rejected, rejected)
    // Add an item to it
    .addCase(addItemToCatalog.pending, pending)
    .addCase(addItemToCatalog.fulfilled, fulfilled)
    .addCase(addItemToCatalog.rejected, rejected)
    // Edit an option
    .addCase(editCatalogItem.pending, pending)
    .addCase(editCatalogItem.fulfilled, fulfilled)
    .addCase(editCatalogItem.rejected, rejected)
    // Remove an option
    .addCase(deleteCatalogItem.pending, pending)
    .addCase(deleteCatalogItem.fulfilled, fulfilled)
    .addCase(deleteCatalogItem.rejected, rejected);
};
