import { FC } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { HiOutlineTrash } from "react-icons/hi";
import { TbFilePlus } from "react-icons/tb";
import { capitalize } from "../../../../../helpers/strings";
import usePath from "../../../../../hooks/usePath";
import {
  useReduxDispatch,
  useReduxSelector,
} from "../../../../../hooks/useRedux";
import {
  selectExpense,
  toggleAddExpenseModal,
  toggleDeleteExpenseModal,
  toggleEditExpenseModal,
} from "../../../../../redux/expense";
import {
  selectIncome,
  toggleAddIncomeModal,
  toggleDeleteIncomeModal,
  toggleEditIncomeModal,
} from "../../../../../redux/income";
import ItemOptionButton from "../../../input/button/ItemOptionButton";
import BasicButton from "../../../input/button/BasicButton";

const ItemOptions: FC = () => {
  const dispatch = useReduxDispatch();
  const { incomes, incomeId, incomeWindow } = useReduxSelector(selectIncome);
  const { expenses, expenseId, expenseWindow } =
    useReduxSelector(selectExpense);

  const { recordPath: dataType } = usePath();

  return (
    <div className={`flex flew-row items-center`}>
      {dataType !== "summary" &&
        (dataType === "income" ? incomeWindow : expenseWindow) === "list" && (
          <BasicButton
            hint={`Add a New ${capitalize(dataType)}`}
            icon={<TbFilePlus size="18px" />}
            color="green"
            onClick={() =>
              dataType === "income"
                ? dispatch(toggleAddIncomeModal())
                : dispatch(toggleAddExpenseModal())
            }
            className="ml-1"
          />
        )}
      {dataType !== "summary" &&
        (dataType === "income" ? incomes : expenses)?.length > 0 &&
        (dataType === "income" ? incomeWindow : expenseWindow) === "list" && (
          <BasicButton
            hint={
              (dataType === "income" ? incomeId !== null : expenseId !== null)
                ? `Edit Selected ${capitalize(dataType)}`
                : `Select ${dataType === "debt" ? "a" : "an"} ${capitalize(
                    dataType
                  )} to Edit`
            }
            disabled={
              !(dataType === "income" ? incomeId !== null : expenseId !== null)
            }
            icon={<AiOutlineEdit size="18px" />}
            color="yellow"
            onClick={() =>
              dataType === "income"
                ? dispatch(toggleEditIncomeModal())
                : dispatch(toggleEditExpenseModal())
            }
            className="ml-1"
          />
        )}
      {dataType !== "summary" &&
        (dataType === "income" ? incomes : expenses)?.length > 0 &&
        (dataType === "income" ? incomeWindow : expenseWindow) === "list" && (
          <BasicButton
            hint={
              (dataType === "income" ? incomeId !== null : expenseId !== null)
                ? `Remove Selected ${capitalize(dataType)}`
                : `Select ${dataType === "debt" ? "a" : "an"} ${capitalize(
                    dataType
                  )} to Remove`
            }
            disabled={
              !(dataType === "income" ? incomeId !== null : expenseId !== null)
            }
            icon={<HiOutlineTrash size="18px" />}
            color="red"
            onClick={() =>
              dataType === "income"
                ? dispatch(toggleDeleteIncomeModal())
                : dispatch(toggleDeleteExpenseModal())
            }
            className="ml-1"
          />
        )}
    </div>
  );
};

export default ItemOptions;
