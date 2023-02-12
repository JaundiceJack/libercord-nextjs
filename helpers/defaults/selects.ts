import { useRef } from "react";
import useErrMsgs from "../../hooks/useErrMsgs";
import { useReduxDispatch, useReduxSelector } from "../../hooks/useRedux";
import { ExpenseType } from "../../models/Expense";
import type { IncomeType } from "../../models/Income";
import { addItemToCatalog, selectCatalog } from "../../redux/catalogSlice";
import {
  defaultExpenseCategory,
  defaultIncomeCategory,
  defaultLocation,
  defaultSource,
} from "./fields";
import { errString } from "../errors";

// Handle option creation
export const useCreateOptions = () => {
  const dispatch = useReduxDispatch();

  const newCategoryOption = useRef("");
  const newSourceOption = useRef("");
  const newLocationOption = useRef("");

  const { catalog } = useReduxSelector(selectCatalog);
  const { errMsgs, setErrMsgs } = useErrMsgs();

  const defaultOption = (
    field: "source" | "location" | "incomeCategory" | "expenseCategory",
    selected?: IncomeType | ExpenseType
  ) => {
    switch (field) {
      case "source":
        return defaultSource(catalog, selected as IncomeType);
      case "location":
        return defaultLocation(catalog, selected as ExpenseType);
      case "incomeCategory":
        return defaultIncomeCategory(catalog, selected as IncomeType);
      case "expenseCategory":
        return defaultExpenseCategory(catalog, selected as ExpenseType);
      default:
        return "";
    }
  };

  const setNewOption = (
    field: "sources" | "categories" | "locations",
    value: string
  ) => {
    switch (field) {
      case "sources":
        newSourceOption.current = value;
        break;
      case "categories":
        newCategoryOption.current = value;
        break;
      case "locations":
        newLocationOption.current = value;
        break;
      default:
        break;
    }
  };

  // Dispatch a create-request to make a new dropdown option
  const createIncomeOption =
    (field: "sources" | "categories") => (query: string) => {
      setNewOption(field, query);
      try {
        dispatch(
          addItemToCatalog({
            section: "income",
            field,
            item: query,
          })
        );
      } catch (e) {
        setNewOption(field, "");
        setErrMsgs([...errMsgs, errString(e)]);
      }
      return { value: query, label: query };
    };

  const createExpenseOption =
    (field: "categories" | "locations") => (query: string) => {
      setNewOption(field, query);
      try {
        dispatch(
          addItemToCatalog({
            section: "expense",
            field,
            item: query,
          })
        );
      } catch (e) {
        setNewOption(field, "");
        setErrMsgs([...errMsgs, errString(e)]);
      }
      return { value: query, label: query };
    };

  return {
    newCategoryOption,
    newSourceOption,
    newLocationOption,
    defaultOption,
    createIncomeOption,
    createExpenseOption,
  };
};
