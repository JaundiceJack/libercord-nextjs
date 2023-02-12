import { FC, useEffect, useState } from "react";
import ListWindow from "../../../elements/containers/ListWindow";
import type { ListWindowColumn } from "../../../elements/containers/ListWindow/types";
import Spinner from "../../../elements/misc/spinner";
import Message from "../../../elements/misc/message";
import EmptyListMessage from "../../../elements/misc/emptyListMessage";
import { useReduxDispatch, useReduxSelector } from "../../../../hooks/useRedux";
import {
  pickIncome,
  selectIncome,
  setIncomeSortBy,
  IncomeSortOption,
} from "../../../../redux/incomeSlice";
import type { IncomeType } from "../../../../models/Income";
import { isSameYear, isSameMonth } from "date-fns";
import { selectDate } from "../../../../redux/dateSlice";
import useIncomeData from "../useIncomeData";
import ContentWindow from "../../../elements/containers/ContentWindow";

const IncomeTable: FC = () => {
  // Get redux stuff for incomes
  const { date, dataTimeframe } = useReduxSelector(selectDate);
  const dispatch = useReduxDispatch();
  const {
    incomes,
    incomeId,
    incomeError,
    incomeLoading,
    incomeSortBy,
    incomeSortDir,
    incomeColumns,
  } = useReduxSelector(selectIncome);

  const { sortedIncomes } = useIncomeData();

  // Set up the columns to be displayed
  const columns: ListWindowColumn[] = [
    {
      name: "date",
      label: "Date",
      setSort: () => dispatch(setIncomeSortBy("date")),
    },
    {
      name: "source",
      label: "Source",
      setSort: () => dispatch(setIncomeSortBy("source")),
    },
    {
      name: "category",
      label: "Category",
      setSort: () => dispatch(setIncomeSortBy("category")),
    },
    {
      name: "amount",
      label: "Amount",
      setSort: () => dispatch(setIncomeSortBy("amount")),
    },
  ];

  return (
    <ContentWindow>
      {incomeLoading ? (
        <Spinner />
      ) : incomeError ? (
        <Message error={incomeError} />
      ) : incomes.length === 0 ? (
        <EmptyListMessage listName="income" />
      ) : (
        <ListWindow
          items={sortedIncomes}
          selected={incomeId}
          onItemClick={pickIncome}
          columns={columns.filter((col) => {
            const name = col.name as IncomeSortOption;
            return incomeColumns.includes(name);
          })}
          currentSort={incomeSortBy}
          sortDirection={incomeSortDir}
          editable={false}
        />
      )}
    </ContentWindow>
  );
};

export default IncomeTable;
