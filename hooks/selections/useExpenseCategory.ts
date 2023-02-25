import { useEffect, useState } from "react";
import useErrMsgs from "../useErrMsgs";
import { useReduxDispatch } from "../useRedux";
import { addItemToCatalog } from "../../redux/catalog";
import { errString } from "../../helpers/errors";
import { CatalogType } from "../../models/Catalog";
import { ExpenseType } from "../../models/Expense";
import { defaultOption } from "../../helpers/defaults/fields";

interface UseExpenseCategoryProps {
  catalog: CatalogType | null;
  selected?: ExpenseType;
}

export const useExpenseCategory = ({
  catalog,
  selected,
}: UseExpenseCategoryProps) => {
  const dispatch = useReduxDispatch();

  const [category, setCategory] = useState("");

  const { errMsgs, setErrMsgs } = useErrMsgs();

  const createCategory = (query: string) => {
    try {
      dispatch(
        addItemToCatalog({
          section: "expense",
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
    setCategory(defaultOption("expenseCategory", catalog, selected));
  };

  const setCatalogCategory = () => {
    const catalogIndex = catalog?.expense?.categories.findIndex(
      (cat) => cat === category.toLowerCase()
    );
    !catalogIndex || catalogIndex === -1
      ? setDefaultCategory()
      : setCategory(catalog?.expense?.categories[catalogIndex] || "");
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
