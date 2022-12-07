import { FC, useEffect, useState } from "react";
import ScrollWindow, {
  ScrollWindowColumn,
} from "../elements/containers/ScrollWindow/scrollWindow";
import Spinner from "../elements/misc/spinner";
import Message from "../elements/misc/message";
import EmptyListMessage from "../elements/misc/emptyListMessage";
import { useReduxDispatch, useReduxSelector } from "../../hooks/useRedux";
import {
  pickIncome,
  selectIncome,
  setIncomeSortBy,
  incomeSortOption,
} from "../../redux/incomeSlice";
import { IncomeType } from "../../models/Income";
import { isSameYear, isSameMonth } from "date-fns";
import { selectDate } from "../../redux/dateSlice";

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
    incomeColumns,
  } = useReduxSelector(selectIncome);
  const { date, dataTimeframe } = useReduxSelector(selectDate);

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
      gridColSpan: `col-span-4`,
      setSort: () => dispatch(setIncomeSortBy("source")),
    },
    {
      name: "category",
      label: "Category",
      gridColSpan: `col-span-4`,
      setSort: () => dispatch(setIncomeSortBy("category")),
    },
    {
      name: "amount",
      label: "Amount",
      gridColSpan: "col-span-2",
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

  // Filter the incomes by year
  const incomeFilter = (inc: IncomeType, index: number) => {
    const incDate = new Date(inc.date);
    if (dataTimeframe === "year") {
      return isSameYear(incDate, date);
    } else if (dataTimeframe === "month") {
      return isSameMonth(incDate, date);
    } else return true;
  };

  // Display a sorted and filtered list of incomes
  const arrangeIncomes = () => {
    return [...incomes].sort(incomeSorter).filter(incomeFilter);
  };
  const [processedIncomes, setProcessedIncomes] = useState(arrangeIncomes());
  useEffect(() => {
    setProcessedIncomes(arrangeIncomes());
  }, [incomeSortBy, incomeSortDir, incomes, date, dataTimeframe]);

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
          items={processedIncomes}
          selectedId={incomeId}
          onItemClick={pickIncome}
          columns={columns.filter((col) => {
            const name = col.name as incomeSortOption;
            return incomeColumns.includes(name);
          })}
          currentSort={incomeSortBy}
          sortDirection={incomeSortDir}
        />
      )}
    </div>
  );
};

export default IncomeTable;
