import { useEffect, useState } from "react";
import useErrMsgs from "../../hooks/useErrMsgs";
import { useReduxDispatch } from "../../hooks/useRedux";
import { addItemToCatalog } from "../../redux/catalogSlice";
import { errString } from "../../helpers/errors";
import { CatalogType } from "../../models/Catalog";
import { defaultOption } from "../../helpers/defaults/fields";
import { IncomeType } from "../../models/Income";

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
    setSource(defaultOption("source", catalog, selected));
  };

  const setCatalogSource = () => {
    const catalogIndex = catalog?.income?.sources.findIndex(
      (cat) => cat === source.toLowerCase()
    );
    !catalogIndex || catalogIndex === -1
      ? setDefaultSource()
      : setSource(catalog?.income?.sources[catalogIndex] || "");
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
