import { createAsyncThunk } from "@reduxjs/toolkit";
import { AssetType } from "../../../../models/Asset";
import { AddAssetProps, DeleteAssetProps, EditAssetProps } from "./types";

const assetRequest =
  (method: string) =>
  async (
    props?: AddAssetProps | EditAssetProps | DeleteAssetProps
  ): Promise<AssetType[]> => {
    try {
      return await (
        await fetch("/api/asset", {
          method,
          body: props ? JSON.stringify(props) : undefined,
        })
      ).json();
    } catch (e) {
      throw new Error(`Asset Error: ${e}`);
    }
  };

export const getInitialAssets = createAsyncThunk(
  "asset/load",
  assetRequest("GET")
);

export const editAsset = createAsyncThunk("asset/edit", assetRequest("PUT"));

export const addAsset = createAsyncThunk("asset/add", assetRequest("POST"));

export const deleteAsset = createAsyncThunk(
  "asset/delete",
  assetRequest("DELETE")
);
