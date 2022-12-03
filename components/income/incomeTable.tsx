// Import basics
import { FC, useEffect, useState } from "react";
// Import components
import ScrollWindow, {
  ScrollWindowColumn,
} from "../elements/containers/scrollWindow";
import Spinner from "../elements/misc/spinner";
import Message from "../elements/misc/message";
import EmptyListMessage from "../elements/misc/emptyListMessage";
// Import icons
import { useReduxDispatch, useReduxSelector } from "../../hooks/useRedux";
import {
  pickIncome,
  selectIncome,
  setIncomeSortBy,
} from "../../redux/incomeSlice";
import { IncomeType } from "../../models/Income";

const IncomeTable: FC = () => {
  // Get redux stuff for incomes
  const dispatch = useReduxDispatch();
  const {
    incomes,
    incomeId,
    incomeError,
    incomeLoading,
    incomeSortBy,
    incomeSortDir,
  } = useReduxSelector(selectIncome);

  // Set up the columns to be displayed
  const columns: ScrollWindowColumn[] = [
    {
      name: "date",
      label: "Date",
      gridColSpan: "col-span-2",
      setSort: () => dispatch(setIncomeSortBy("date")),
    },
    {
      name: "source",
      label: "Source",
      gridColSpan: "col-span-6",
      setSort: () => dispatch(setIncomeSortBy("source")),
    },
    {
      name: "amount",
      label: "Amount",
      gridColSpan: "col-span-4",
      setSort: () => dispatch(setIncomeSortBy("amount")),
    },
  ];

  // TODO: filter them by date as well,
  // maybe a reduxstate in income for viewYear/viewMonth
  // or that might be better in the date redux

  // Sort the incomes differently depending on their type
  const incomeSorter = (a: IncomeType, b: IncomeType) => {
    switch (incomeSortBy) {
      case "date":
        const date1 = new Date(a.date);
        const date2 = new Date(b.date);
        return incomeSortDir === "asc"
          ? date1.getTime() - date2.getTime()
          : date2.getTime() - date1.getTime();
      case "amount":
        return incomeSortDir === "asc"
          ? b.amount - a.amount
          : a.amount - b.amount;
      case "category":
      case "source":
        return incomeSortDir === "asc"
          ? a[incomeSortBy] < b[incomeSortBy]
            ? 1
            : -1
          : a[incomeSortBy] > b[incomeSortBy]
          ? 1
          : -1;
      default:
        return 0;
    }
  };

  // Set a state to hold the incomes in a sorted array
  const [sortedIncomes, setSortedIncomes] = useState(
    [...incomes].sort(incomeSorter)
  );
  // Re-sort when sortby, sortdir, or the income list changes
  useEffect(() => {
    setSortedIncomes([...incomes].sort(incomeSorter));
  }, [incomeSortBy, incomeSortDir, incomes]);

  return (
    <div className="rounded-md flex w-full h-full items-center justify-center">
      {incomeLoading ? (
        <Spinner />
      ) : incomeError ? (
        <Message error={incomeError} />
      ) : incomes.length === 0 ? (
        <EmptyListMessage listName="income" />
      ) : (
        <ScrollWindow
          items={sortedIncomes}
          selectedId={incomeId}
          onItemClick={pickIncome}
          columns={columns}
          currentSort={incomeSortBy}
          sortDirection={incomeSortDir}
        />
      )}
    </div>
  );
};

export default IncomeTable;
