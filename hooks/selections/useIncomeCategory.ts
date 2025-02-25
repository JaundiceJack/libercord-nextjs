import { useEffect, useState } from "react";
import useErrMsgs from "../useErrMsgs";
import { useReduxDispatch } from "../useRedux";
import { addItemToCatalog } from "../../redux/catalog";
import { errString } from "../../helpers/errors";
import { CatalogType } from "../../models/Catalog";
import { IncomeType } from "../../models/Income";
import { defaultOption } from "../../helpers/defaults/fields";
import { capitalize } from "../../helpers/strings";

interface UseIncomeCategoryProps {
  catalog: CatalogType | null;
  selected?: IncomeType;
}

export const useIncomeCategory = ({
  catalog,
  selected,
}: UseIncomeCategoryProps) => {
  const dispatch = useReduxDispatch();

  const [category, setCategory] = useState("");

  const { errMsgs, setErrMsgs } = useErrMsgs();

  const createCategory = (query: string) => {
    try {
      dispatch(
        addItemToCatalog({
          section: "income",
          field: "categories",
          item: query,
        })
      );
    } catch (e) {
      setCategory("");
      setErrMsgs([...errMsgs, errString(e)]);
    }
    return { value: query, label: query };
  };

  const setDefaultCategory = () => {
    setCategory(capitalize(defaultOption("incomeCategory", catalog, selected)));
  };

  const setCatalogCategory = () => {
    const catalogOption = catalog?.income?.categories.find(
      (cat) => cat === category.toLowerCase()
    );
    !catalogOption
      ? setDefaultCategory()
      : setCategory(capitalize(catalogOption));
  };

  useEffect(() => {
    category === "" || selected ? setDefaultCategory() : setCatalogCategory();
  }, [catalog, selected]);

  return {
    category,
    setCategory,
    createCategory,
  };
};
