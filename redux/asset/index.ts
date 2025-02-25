import { ReduxState } from "../store";
import { assetSlice } from "./slice";

export {
  getInitialAssets,
  editAsset,
  addAsset,
  deleteAsset,
} from "./actions/network/requests";

export const selectAsset = (state: ReduxState) => state.asset;

export const {
  resetAsset,
  pickAsset,
  unpickAsset,
  toggleAddAssetModal,
  toggleEditAssetModal,
  toggleDeleteAssetModal,
  toggleAssetColumnModal,
  clearAssetError,
  setAssetSortBy,
  setAssetWindow,
  toggleAssetColumn,
  setAssetColumns,
  exportAssetData,
  setAssetChartType,
  setAssetViewBy,
} = assetSlice.actions;

export default assetSlice.reducer;
