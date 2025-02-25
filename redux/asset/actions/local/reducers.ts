import { PayloadAction } from "@reduxjs/toolkit";
import saveAs from "file-saver";
import { Types } from "mongoose";
import { formatDateMMDDYYYY } from "../../../../helpers/dates";
import { AssetChartTypeOption } from "../../../../models/types";
import {
  AssetSortOption,
  AssetViewByOption,
  WindowOption,
} from "../../../types";
import { AssetState, initialState } from "../../slice";
import tocsv from "papaparse";

export default {
  resetAsset: (state: AssetState) => {
    state = initialState;
  },
  pickAsset: (state: AssetState, action: PayloadAction<Types.ObjectId>) => {
    state.assetId = action.payload;
  },
  unpickAsset: (state: AssetState) => {
    state.assetId = null;
  },
  toggleAddAssetModal: (state: AssetState) => {
    state.assetAddModalOpen = !state.assetAddModalOpen;
  },
  toggleEditAssetModal: (state: AssetState) => {
    state.assetEditModalOpen = !state.assetEditModalOpen;
  },
  toggleDeleteAssetModal: (state: AssetState) => {
    state.assetDeleteModalOpen = !state.assetDeleteModalOpen;
  },
  toggleAssetColumnModal: (state: AssetState) => {
    state.assetColumnModalOpen = !state.assetColumnModalOpen;
  },
  clearAssetError: (state: AssetState) => {
    state.assetError = undefined;
  },
  setAssetSortBy: (
    state: AssetState,
    action: PayloadAction<AssetSortOption>
  ) => {
    if (state.assetSortBy === action.payload) {
      state.assetSortDir = state.assetSortDir === "asc" ? "desc" : "asc";
    } else state.assetSortBy = action.payload;
  },
  setAssetViewBy: (
    state: AssetState,
    action: PayloadAction<AssetViewByOption>
  ) => {
    state.assetViewBy = action.payload;
  },
  setAssetWindow: (state: AssetState, action: PayloadAction<WindowOption>) => {
    state.assetWindow = action.payload;
  },
  setAssetChartType: (
    state: AssetState,
    action: PayloadAction<AssetChartTypeOption>
  ) => {
    state.assetChartType = action.payload;
  },
  toggleAssetColumn: (
    state: AssetState,
    action: PayloadAction<AssetSortOption>
  ) => {
    // if the option is not in the list, add it, otherwise remove it
    if (state.assetColumns.includes(action.payload))
      state.assetColumns = state.assetColumns.filter(
        (col) => col !== action.payload
      );
    else state.assetColumns = [...state.assetColumns, action.payload];
  },
  setAssetColumns: (
    state: AssetState,
    action: PayloadAction<AssetSortOption[]>
  ) => {
    state.assetColumns = action.payload;
  },
  exportAssetData: (state: AssetState) => {
    saveAs(
      new Blob([
        tocsv.unparse(
          state.assets.map((ass) => {
            return {
              category: ass.category,
            };
          })
        ),
      ]),
      `Asset_Data-${formatDateMMDDYYYY(new Date())}.csv`
    );
  },
};
