import { useEffect, useState } from "react";
import useErrMsgs from "../useErrMsgs";
import { useReduxDispatch } from "../useRedux";
import { addItemToCatalog } from "../../redux/catalog";
import { errString } from "../../helpers/errors";
import { CatalogType } from "../../models/Catalog";
import { AssetType } from "../../models/Asset";
import { defaultOption } from "../../helpers/defaults/fields";
import { capitalize } from "../../helpers/strings";

interface UseAssetAccountProps {
  catalog: CatalogType | null;
  selected?: AssetType;
}

export const useAssetAccount = ({
  catalog,
  selected,
}: UseAssetAccountProps) => {
  const dispatch = useReduxDispatch();

  const [account, setAccount] = useState("");

  const { errMsgs, setErrMsgs } = useErrMsgs();

  const createAccount = (query: string) => {
    try {
      dispatch(
        addItemToCatalog({
          section: "asset",
          field: "accounts",
          item: query,
        })
      );
    } catch (e) {
      setAccount("");
      setErrMsgs([...errMsgs, errString(e)]);
    }
    return { value: query, label: query };
  };

  const setDefaultAccount = () => {
    setAccount(capitalize(defaultOption("assetAccount", catalog, selected)));
  };

  const setCatalogAccount = () => {
    const catalogOption = catalog?.asset?.accounts.find(
      (cat) => cat === account.toLowerCase()
    );
    !catalogOption
      ? setDefaultAccount()
      : setAccount(capitalize(catalogOption));
  };

  useEffect(() => {
    account === "" || selected ? setDefaultAccount() : setCatalogAccount();
  }, [catalog, selected]);

  return {
    account,
    setAccount,
    createAccount,
  };
};
