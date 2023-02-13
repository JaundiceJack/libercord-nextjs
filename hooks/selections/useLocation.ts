import { useEffect, useState } from "react";
import useErrMsgs from "../../hooks/useErrMsgs";
import { useReduxDispatch } from "../../hooks/useRedux";
import { addItemToCatalog } from "../../redux/catalogSlice";
import { errString } from "../../helpers/errors";
import { CatalogType } from "../../models/Catalog";
import { defaultOption } from "../../helpers/defaults/fields";
import { ExpenseType } from "../../models/Expense";

interface UseLocationProps {
  catalog: CatalogType | null;
  selected?: ExpenseType;
}

export const useLocation = ({ catalog, selected }: UseLocationProps) => {
  const dispatch = useReduxDispatch();

  const [location, setLocation] = useState("");

  const { errMsgs, setErrMsgs } = useErrMsgs();

  // Add a new location to the catalog
  const createLocation = (query: string) => {
    try {
      dispatch(
        addItemToCatalog({
          section: "expense",
          field: "locations",
          item: query,
        })
      );
    } catch (e) {
      setLocation("");
      setErrMsgs([...errMsgs, errString(e)]);
    }
    return { value: query, label: query };
  };

  const setDefaultLocation = () => {
    setLocation(defaultOption("location", catalog, selected));
  };

  const setCatalogLocation = () => {
    const catalogIndex = catalog?.expense?.locations.findIndex(
      (cat) => cat === location.toLowerCase()
    );
    !catalogIndex || catalogIndex === -1
      ? setDefaultLocation()
      : setLocation(catalog?.expense?.locations[catalogIndex] || "");
  };

  useEffect(() => {
    location === "" || selected ? setDefaultLocation() : setCatalogLocation();
  }, [catalog, selected]);

  return {
    location,
    setLocation,
    createLocation,
  };
};
