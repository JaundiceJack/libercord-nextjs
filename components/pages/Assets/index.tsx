import { FC } from "react";
import { useReduxDispatch, useReduxSelector } from "../../../hooks/useRedux";
import {
  selectAsset,
  toggleAddAssetModal,
  toggleDeleteAssetModal,
  toggleEditAssetModal,
  toggleAssetColumnModal,
} from "../../../redux/asset";
import DataWindow from "../../elements/containers/DataWindow";
import PageWindow from "../../elements/containers/PageWindow";
import AssetGraph from "./AssetGraph";
// import AssetTable from "./AssetTable";
// import AddAsset from "./modals/AddAsset";
// import DeleteAsset from "./modals/DeleteAsset";
// import EditAsset from "./modals/EditAsset";
// import ToggleAssetColumns from "./modals/ToggleAssetColumns";

const AssetPage: FC = () => {
  const dispatch = useReduxDispatch();
  const {
    assetWindow,
    assetAddModalOpen,
    assetColumnModalOpen,
    assetDeleteModalOpen,
    assetEditModalOpen,
  } = useReduxSelector(selectAsset);

  return (
    <PageWindow>
      <DataWindow>
        {/* {assetWindow === "list" ? <AssetTable /> : <AssetGraph />} */}
        <AssetGraph />
      </DataWindow>

      {/* <AddAsset
        opened={assetAddModalOpen}
        toggle={() => dispatch(toggleAddAssetModal())}
      />
      <EditAsset
        opened={assetEditModalOpen}
        toggle={() => dispatch(toggleEditAssetModal())}
      />
      <DeleteAsset
        opened={assetDeleteModalOpen}
        toggle={() => dispatch(toggleDeleteAssetModal())}
      />
      <ToggleAssetColumns
        opened={assetColumnModalOpen}
        toggle={() => dispatch(toggleAssetColumnModal())}
      /> */}
    </PageWindow>
  );
};

export default AssetPage;
