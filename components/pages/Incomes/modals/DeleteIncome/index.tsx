import { FC, useEffect, useRef, useState } from "react";
import { deleteIncome, selectIncome } from "../../../../../redux/incomeSlice";
import {
  useReduxDispatch,
  useReduxSelector,
} from "../../../../../hooks/useRedux";
import { IncomeType } from "../../../../../models/Income";
import ErrorMessages from "../../../../elements/misc/errorMessages";
import useErrMsgs from "../../../../../hooks/useErrMsgs";
import BareButton from "../../../../elements/input/button/BareButton";
import Spinner from "../../../../elements/misc/spinner";
import Modal from "../../../../elements/containers/Modal";
import type { ToggleProps } from "../../../../elements/containers/Modal/types";
import { formatDateMMDDYYYY } from "../../../../../helpers/dates";

const DeleteIncome: FC<ToggleProps> = ({ opened, toggle }) => {
  // Get component props and setup
  const dispatch = useReduxDispatch();
  const { incomeId, incomes, incomeLoading } = useReduxSelector(selectIncome);
  const { errMsgs, setErrMsgs } = useErrMsgs();
  const [selected, setSelected] = useState<IncomeType | undefined>();

  useEffect(() => {
    setSelected(incomes.find((inc) => inc._id === incomeId));
  }, [incomes, incomeId]);

  const onDelete = () => {
    incomeId && dispatch(deleteIncome({ incomeId }));
  };

  return (
    <Modal title="Remove Selected Income" opened={opened} toggle={toggle}>
      <>
        <h3 className="text-white font-jose font-semibold text-center ">
          Delete {selected?.source} <br />
          payment from {selected?.date && formatDateMMDDYYYY(selected.date)}?
        </h3>

        {incomeLoading ? (
          <Spinner />
        ) : (
          <BareButton
            label="Delete Selected Income"
            color="red"
            onClick={() => {
              onDelete();
              toggle();
            }}
            className="mt-8"
          />
        )}

        <ErrorMessages errors={errMsgs} />
      </>
    </Modal>
  );
};

export default DeleteIncome;
