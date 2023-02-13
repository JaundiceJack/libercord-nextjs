import { FC, useEffect, useRef, useState } from "react";
import {
  deleteExpense,
  selectExpense,
} from "../../../../../redux/expenseSlice";
import {
  useReduxDispatch,
  useReduxSelector,
} from "../../../../../hooks/useRedux";
import { ExpenseType } from "../../../../../models/Expense";
import ErrorMessages from "../../../../elements/misc/errorMessages";
import useErrMsgs from "../../../../../hooks/useErrMsgs";
import BareButton from "../../../../elements/input/button/BareButton";
import Spinner from "../../../../elements/misc/spinner";
import Modal from "../../../../elements/containers/Modal";
import type { ToggleProps } from "../../../../elements/containers/Modal/types";
import { formatDateMMDDYYYY } from "../../../../../helpers/dates";
import { capitalize } from "../../../../../helpers/strings";

const DeleteExpense: FC<ToggleProps> = ({ opened, toggle }) => {
  // Get component props and setup
  const dispatch = useReduxDispatch();
  const { expenseId, expenses, expenseLoading } =
    useReduxSelector(selectExpense);
  const { errMsgs, setErrMsgs } = useErrMsgs();
  const [selected, setSelected] = useState<ExpenseType | undefined>();

  useEffect(() => {
    setSelected(expenses.find((exp) => exp._id === expenseId));
  }, [expenses, expenseId]);

  const onDelete = () => {
    expenseId && dispatch(deleteExpense({ expenseId }));
  };

  return (
    <Modal title="Remove Selected Expense" opened={opened} toggle={toggle}>
      <>
        <h3 className="text-white font-jose font-semibold text-center ">
          Delete {capitalize(selected?.location || "")} <br />
          payment from {selected?.date && formatDateMMDDYYYY(selected.date)}?
        </h3>

        {expenseLoading ? (
          <Spinner />
        ) : (
          <BareButton
            label="Delete Selected Expense"
            color="red"
            onClick={() => {
              onDelete();
              errMsgs.length === 0 && toggle();
            }}
            className="mt-8"
          />
        )}

        <ErrorMessages errors={errMsgs} />
      </>
    </Modal>
  );
};

export default DeleteExpense;
