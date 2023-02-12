import { FC } from "react";
import { BiColumns } from "react-icons/bi";
import { TbFileExport } from "react-icons/tb";
import { WindowActionsProps } from "../types";
import ItemOptionButton from "../../../input/button/ItemOptionButton";
import { useReduxSelector } from "../../../../../hooks/useRedux";
import { selectIncome } from "../../../../../redux/incomeSlice";

const WindowActions: FC<WindowActionsProps> = ({
  currentWindow,
  openColumnModal,
  exportData,
}) => {
  const { incomes } = useReduxSelector(selectIncome);

  return (
    <div className="flex flex-row items-center mr-1">
      {incomes?.length > 0 && (
        <>
          {currentWindow === "list" && (
            <ItemOptionButton
              icon={<BiColumns />}
              onClick={openColumnModal}
              color="blue"
              label={`Toggle Columns`}
              className="ml-1"
            />
          )}

          <ItemOptionButton
            icon={<TbFileExport />}
            onClick={exportData}
            color="blue"
            label={`Export to .CSV`}
            className="ml-1"
          />
        </>
      )}
    </div>
  );
};

export default WindowActions;
