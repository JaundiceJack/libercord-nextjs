import { FC } from "react";
import { useReduxDispatch, useReduxSelector } from "../../hooks/useRedux";
import {
  toggleAddingIncome,
  toggleEditingIncome,
  toggleDeletingIncome,
  selectIncome,
} from "../../redux/incomeSlice";
import Tab from "../elements/input/button/tab";
import IncomeDelete from "./incomeDelete";
import IncomeGen from "./incomeGen";

const IncomeInput: FC = () => {
  const dispatch = useReduxDispatch();
  const { incomeId, incomeMode } = useReduxSelector(selectIncome);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <Tab
          label="Add New"
          side="left"
          active={incomeMode === "adding"}
          toggle={() => dispatch(toggleAddingIncome())}
        />
        <Tab
          label="Edit Selected"
          side="middle"
          active={incomeMode === "editing"}
          toggle={() => dispatch(toggleEditingIncome())}
          disabled={incomeId === null}
        />
        <Tab
          label="Remove Selected"
          side="right"
          active={incomeMode === "deleting"}
          toggle={() => dispatch(toggleDeletingIncome())}
          disabled={incomeId === null}
        />
      </div>

      <div className="h-px w-full bg-gray-600" />
      {incomeMode === "deleting" ? <IncomeDelete /> : <IncomeGen />}
    </div>
  );
};

export default IncomeInput;
