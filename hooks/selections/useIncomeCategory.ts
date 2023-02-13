import { useEffect, useState } from "react";
import useErrMsgs from "../useErrMsgs";
import { useReduxDispatch } from "../useRedux";
import { addItemToCatalog } from "../../redux/catalogSlice";
import { errString } from "../../helpers/errors";
import { CatalogType } from "../../models/Catalog";
import { IncomeType } from "../../models/Income";
import { defaultOption } from "../../helpers/defaults/fields";

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
    setCategory(defaultOption("incomeCategory", catalog, selected));
  };

  const setCatalogCategory = () => {
    const catalogIndex = catalog?.income?.categories.findIndex(
      (cat) => cat === category.toLowerCase()
    );
    !catalogIndex || catalogIndex === -1
      ? setDefaultCategory()
      : setCategory(catalog?.income?.categories[catalogIndex] || "");
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
