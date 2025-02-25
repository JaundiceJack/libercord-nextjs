import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { AssetState } from "../../slice";
import { addAsset, deleteAsset, editAsset, getInitialAssets } from "./requests";
import {
  addFulfilled,
  deleteFulfilled,
  editFulfilled,
  getFulfilled,
  pending,
  rejected,
} from "./resolvers";

export default (builder: ActionReducerMapBuilder<AssetState>) => {
  builder
    // Initial Assets Reducer
    .addCase(getInitialAssets.pending, pending)
    .addCase(getInitialAssets.fulfilled, getFulfilled)
    .addCase(getInitialAssets.rejected, rejected)
    // Edit Asset Reducers
    .addCase(editAsset.pending, pending)
    .addCase(editAsset.fulfilled, editFulfilled)
    .addCase(editAsset.rejected, rejected)
    // Add Asset Reducers
    .addCase(addAsset.pending, pending)
    .addCase(addAsset.fulfilled, addFulfilled)
    .addCase(addAsset.rejected, rejected)
    // Delete Assets Reducers
    .addCase(deleteAsset.pending, pending)
    .addCase(deleteAsset.fulfilled, deleteFulfilled)
    .addCase(deleteAsset.rejected, rejected);
};
