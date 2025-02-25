import { Document, Types } from "mongoose";
import { AssetType } from "../../../../models/Asset";

interface AssetId {
  assetId: Types.ObjectId | null;
}

interface EditAsset {
  updates: AssetType;
}

interface AddAsset {
  asset: Omit<AssetType, keyof Document>;
}

export type AddAssetProps = AddAsset;

export type EditAssetProps = EditAsset & AssetId;

export type DeleteAssetProps = AssetId;
