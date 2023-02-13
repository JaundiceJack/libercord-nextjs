import { useState, useRef, useEffect } from "react";
import { clearCatalogError, selectCatalog } from "../redux/catalogSlice";
import { clearExpenseError, selectExpense } from "../redux/expenseSlice";
import { clearIncomeError, selectIncome } from "../redux/incomeSlice";
import { useReduxDispatch, useReduxSelector } from "./useRedux";

const useErrMsgs = () => {
  // Set up error messages
  const [errMsgs, setErrMsgs] = useState<string[]>([]);
  const { incomeError } = useReduxSelector(selectIncome);
  const { expenseError } = useReduxSelector(selectExpense);
  const { catalogError } = useReduxSelector(selectCatalog);
  const timer = useRef<null | NodeJS.Timeout>(null);
  const dispatch = useReduxDispatch();

  // Add redux errors to the errmsgs list
  useEffect(() => {
    if (catalogError) setErrMsgs([...errMsgs, catalogError]);
    if (expenseError) setErrMsgs([...errMsgs, expenseError]);
    if (incomeError) setErrMsgs([...errMsgs, incomeError]);
  }, [catalogError, incomeError]);

  // Clear error messages after 5 seconds
  useEffect(() => {
    if (!timer.current) {
      timer.current = setTimeout(() => {
        timer.current = null;
        clearErrors();
      }, 5000);
    }
  });

  const clearErrors = () => {
    setErrMsgs([]);
    dispatch(clearIncomeError());
    dispatch(clearExpenseError());
    dispatch(clearCatalogError());
  };

  return { errMsgs, setErrMsgs, clearErrors };
};

export default useErrMsgs;
