import { createSlice } from "@reduxjs/toolkit";
import { CatalogType } from "../../models/Catalog";
import localReducers from "./actions/local/reducers";
import networkReducers from "./actions/network/reducers";

export interface CatalogState {
  catalog: CatalogType | null;
  catalogMode: "viewing" | "adding" | "editing" | "deleting";
  catalogError: string | undefined;
  catalogLoading: boolean;
}

export const initialState: CatalogState = {
  catalog: null,
  catalogMode: "viewing",
  catalogError: undefined,
  catalogLoading: false,
};

export const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: localReducers,
  extraReducers: networkReducers,
});
