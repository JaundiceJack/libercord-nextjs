import { FC } from "react";
import { capitalize } from "../../../../helpers/strings";
import GraphOptionButton from "../../input/button/GraphOptionButton";
import BgCSS from "../../../../styles/Background.module.css";

import type { OptionsProps } from "./types";
import { useReduxDispatch, useReduxSelector } from "../../../../hooks/useRedux";
import {
  selectIncome,
  setIncomeGraph,
  setIncomeViewBy,
} from "../../../../redux/incomeSlice";
import {
  selectExpense,
  setExpenseGraph,
  setExpenseViewBy,
} from "../../../../redux/expenseSlice";

const Options: FC<OptionsProps> = ({ dataType }) => {
  const dispatch = useReduxDispatch();
  const { incomeGraph, incomeSortBy, incomeViewBy } =
    useReduxSelector(selectIncome);
  const { expenseGraph, expenseSortBy, expenseViewBy } =
    useReduxSelector(selectExpense);
  const incomeFilters = ["category", "source"];
  const expenseFilters = ["category", "location"];

  return (
    <div className={`flex flex-col p-2 py-6 ${BgCSS.sidebar} w-full h-full`}>
      {dataType !== "summary" && (
        <GraphOptionButton
          label={`View ${
            dataType === "income"
              ? incomeGraph === "pie"
                ? "Bar"
                : "Pie"
              : expenseGraph === "pie"
              ? "Bar"
              : "Pie"
          } Chart`}
          onClick={() =>
            dataType === "income"
              ? dispatch(setIncomeGraph(incomeGraph === "bar" ? "pie" : "bar"))
              : dispatch(
                  setExpenseGraph(expenseGraph === "bar" ? "pie" : "bar")
                )
          }
          className={
            dataType === "income"
              ? incomeGraph === "pie"
                ? ""
                : "rounded-b-lg"
              : expenseGraph === "pie"
              ? ""
              : "rounded-b-lg"
          }
        />
      )}

      {((dataType === "income" && incomeGraph === "pie") ||
        (dataType === "expense" && expenseGraph === "pie")) && (
        <>
          <div className="w-full bg-gray-900 h-px" />
          <GraphOptionButton
            label={`View by ${
              dataType === "income"
                ? incomeViewBy === incomeFilters[0]
                  ? capitalize(incomeFilters[1])
                  : capitalize(incomeFilters[0])
                : expenseViewBy === expenseFilters[0]
                ? capitalize(expenseFilters[1])
                : capitalize(expenseFilters[0])
            }`}
            onClick={() =>
              dataType === "income"
                ? dispatch(
                    setIncomeViewBy(
                      incomeViewBy === "category" ? "source" : "category"
                    )
                  )
                : dispatch(
                    setExpenseViewBy(
                      expenseViewBy === "category" ? "location" : "category"
                    )
                  )
            }
            pos="bottom"
          />
        </>
      )}
    </div>
  );
};

export default Options;
