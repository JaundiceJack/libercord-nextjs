import { createSlice } from "@reduxjs/toolkit";
import { Types } from "mongoose";
import { AssetType } from "../../models/Asset";
import { AssetChartTypeOption } from "../../models/types";
import type {
  AssetSortOption,
  AssetViewByOption,
  SortDirection,
  WindowOption,
} from "../types";
import localReducers from "./actions/local/reducers";
import networkReducers from "./actions/network/reducers";

export interface AssetState {
  assets: AssetType[];
  assetId: Types.ObjectId | null;
  assetWindow: WindowOption;
  assetChartType: AssetChartTypeOption;
  assetError: string | undefined;
  assetLoading: boolean;
  assetSortBy: AssetSortOption;
  assetViewBy: AssetViewByOption;
  assetSortDir: SortDirection;
  assetColumns: AssetSortOption[];
  assetColumnModalOpen: boolean;
  assetAddModalOpen: boolean;
  assetEditModalOpen: boolean;
  assetDeleteModalOpen: boolean;
}

export const initialState: AssetState = {
  assets: [],
  assetId: null,
  assetWindow: "graph",
  assetChartType: "pie",
  assetError: undefined,
  assetLoading: false,
  assetSortBy: "date",
  assetViewBy: "category",
  assetSortDir: "desc",
  assetColumns: ["date", "location", "category", "amount"],
  assetColumnModalOpen: false,
  assetAddModalOpen: false,
  assetEditModalOpen: false,
  assetDeleteModalOpen: false,
};

export const assetSlice = createSlice({
  name: "asset",
  initialState,
  reducers: localReducers,
  extraReducers: networkReducers,
});
