import { useEffect, useState } from "react";
import useErrMsgs from "../../hooks/useErrMsgs";
import { useReduxDispatch } from "../../hooks/useRedux";
import { addItemToCatalog } from "../../redux/catalog";
import { errString } from "../../helpers/errors";
import { CatalogType } from "../../models/Catalog";
import { defaultOption } from "../../helpers/defaults/fields";
import { IncomeType } from "../../models/Income";
import { capitalize } from "../../helpers/strings";

interface UseSourceProps {
  catalog: CatalogType | null;
  selected?: IncomeType;
}

export const useSource = ({ catalog, selected }: UseSourceProps) => {
  const dispatch = useReduxDispatch();

  const [source, setSource] = useState("");

  const { errMsgs, setErrMsgs } = useErrMsgs();

  // Add a new source to the catalog
  const createSource = (query: string) => {
    try {
      dispatch(
        addItemToCatalog({
          section: "income",
          field: "sources",
          item: query,
        })
      );
    } catch (e) {
      setSource("");
      setErrMsgs([...errMsgs, errString(e)]);
    }
    return { value: query, label: query };
  };

  const setDefaultSource = () => {
    setSource(capitalize(defaultOption("source", catalog, selected)));
  };

  const setCatalogSource = () => {
    const catalogOption = catalog?.income?.sources.find(
      (cat) => cat === source.toLowerCase()
    );
    !catalogOption ? setDefaultSource() : setSource(capitalize(catalogOption));
  };

  useEffect(() => {
    source === "" || selected ? setDefaultSource() : setCatalogSource();
  }, [catalog, selected]);

  return {
    source,
    setSource,
    createSource,
  };
};
