import { PayloadAction } from "@reduxjs/toolkit";
import { AssetType } from "../../../../models/Asset";
import { AssetState } from "../../slice";

export const pending = (state: AssetState) => {
  state.assetLoading = true;
};

export const getFulfilled = (
  state: AssetState,
  action: PayloadAction<AssetType[]>
) => {
  state.assetLoading = false;
  state.assets = action.payload;
};

export const addFulfilled = (
  state: AssetState,
  action: PayloadAction<AssetType[]>
) => {
  state.assetLoading = false;
  state.assets = action.payload;
  state.assetAddModalOpen = false;
};

export const editFulfilled = (
  state: AssetState,
  action: PayloadAction<AssetType[]>
) => {
  state.assetLoading = false;
  state.assets = action.payload;
  state.assetEditModalOpen = false;
};

export const deleteFulfilled = (
  state: AssetState,
  action: PayloadAction<AssetType[]>
) => {
  state.assetLoading = false;
  state.assets = action.payload;
  state.assetDeleteModalOpen = false;
  state.assetId = null;
};

export const rejected = (
  state: AssetState,
  action: PayloadAction<unknown, string>
) => {
  state.assetLoading = false;
  state.assetError =
    typeof action.payload === "string" ? action.payload : undefined;
};
