import { FC, useEffect, useState } from "react";
import { useReduxDispatch, useReduxSelector } from "../../hooks/useRedux";
import { formatDateMMDDYYYY } from "../../helpers/dates";
import { deleteIncome, selectIncome } from "../../redux/incomeSlice";
import ErrorMessages from "../elements/misc/errorMessages";
import useErrMsgs from "../../hooks/useErrMsgs";
import BasicButton from "../elements/input/button/basicButton";

const IncomeDelete: FC = () => {
  // Get props from redux
  const dispatch = useReduxDispatch();
  const { incomeId, incomes, incomeLoading } = useReduxSelector(selectIncome);

  // Set a state to hold the currently selected income for deleting
  const [incomeToDelete, setIncomeToDelete] = useState(
    incomes.find((inc) => inc._id === incomeId)
  );

  // Set up error messages
  const { errMsgs, setErrMsgs } = useErrMsgs();

  // Change input values when a new income is selected
  useEffect(() => {
    setIncomeToDelete(incomes.find((inc) => inc._id === incomeId));
  }, [incomeId]);

  const onDelete = () => {
    incomeId && dispatch(deleteIncome({ incomeId }));
  };

  return (
    <div
      style={{ minHeight: 230 + "px" }}
      className="flex flex-col justify-center pb-4 bg-tab rounded-b-xl"
    >
      {incomeToDelete ? (
        <>
          <h3 className="text-white font-semibold text-center ">
            Delete {incomeToDelete.source} <br />
            payment from {formatDateMMDDYYYY(incomeToDelete.date)}?
          </h3>

          <BasicButton
            label="Delete It"
            color="red"
            title="Delete Selected Income"
            onClick={onDelete}
            className="w-36 mx-auto"
          />

          <ErrorMessages errors={errMsgs} />
        </>
      ) : (
        <>Select an income to delete.</>
      )}
    </div>
  );
};

export default IncomeDelete;
