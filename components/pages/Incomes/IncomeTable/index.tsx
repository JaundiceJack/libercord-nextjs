import { FC, useEffect } from "react";
import useListData from "../../../../hooks/useData/useListData";
import { useReduxDispatch, useReduxSelector } from "../../../../hooks/useRedux";
import {
  pickIncome,
  selectIncome,
  setIncomeColumns,
  setIncomeSortBy,
} from "../../../../redux/income";
import { selectPreferences } from "../../../../redux/preferences";
import { IncomeSortOption } from "../../../../redux/types";
import ContentWindow from "../../../elements/containers/ContentWindow";
import ListWindow from "../../../elements/containers/ListWindow";
import type { ListWindowColumn } from "../../../elements/containers/ListWindow/types";
import EmptyListMessage from "../../../elements/misc/emptyListMessage";
import Message from "../../../elements/misc/message";
import Spinner from "../../../elements/misc/spinner";

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

  const { defaultIncomeColumns } = useReduxSelector(selectPreferences);
  useEffect(() => {
    dispatch(setIncomeColumns(defaultIncomeColumns));
  }, []);

  const { sortedIncomes } = useListData();

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
