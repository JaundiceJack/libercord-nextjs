import { createAsyncThunk } from "@reduxjs/toolkit";
import { CatalogType } from "../../../../models/Catalog";
import { AddRemoveProps, EditProps } from "./types";

const catalogRequest =
  (method: string) =>
  async (props?: AddRemoveProps | EditProps): Promise<CatalogType> => {
    try {
      return await (
        await fetch("/api/catalog", {
          method,
          body: props ? JSON.stringify(props) : undefined,
        })
      ).json();
    } catch (e) {
      throw new Error(`Catalog Error: ${e}`);
    }
  };

export const getInitialCatalog = createAsyncThunk(
  "catalog/load",
  catalogRequest("GET")
);

export const addItemToCatalog = createAsyncThunk(
  "catalog/add",
  catalogRequest("POST")
);

export const editCatalogItem = createAsyncThunk(
  "catalog/edit",
  catalogRequest("PUT")
);

export const deleteCatalogItem = createAsyncThunk(
  "catalog/delete",
  catalogRequest("DELETE")
);
