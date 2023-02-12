import { FC } from "react";
import ItemOptionButton from "../../../input/button/ItemOptionButton";
import { ItemOptionProps } from "../types";
import { AiOutlineEdit } from "react-icons/ai";
import { TbFilePlus } from "react-icons/tb";

import { HiOutlineTrash } from "react-icons/hi";
import { capitalize } from "../../../../../helpers/strings";
import { useReduxSelector } from "../../../../../hooks/useRedux";
import { selectIncome } from "../../../../../redux/incomeSlice";

const ItemOptions: FC<ItemOptionProps> = ({
  isSelected,
  currentWindow,
  dataType,
  openAddModal,
  openEditModal,
  openDeleteModal,
}) => {
  const { incomes } = useReduxSelector(selectIncome);

  return (
    <div className={`flex flew-row items-center`}>
      <ItemOptionButton
        label={`Add a New ${capitalize(dataType)}`}
        icon={<TbFilePlus size="18px" />}
        color="green"
        onClick={openAddModal}
        className="ml-1"
      />
      {incomes?.length > 0 && currentWindow === "list" && (
        <ItemOptionButton
          label={
            isSelected
              ? `Edit Selected ${capitalize(dataType)}`
              : `Select ${dataType === "debt" ? "a" : "an"} ${capitalize(
                  dataType
                )} to Edit`
          }
          disabled={!isSelected}
          icon={<AiOutlineEdit size="18px" />}
          color="yellow"
          onClick={openEditModal}
          className="ml-1"
        />
      )}
      {incomes?.length > 0 && currentWindow === "list" && (
        <ItemOptionButton
          label={
            isSelected
              ? `Remove Selected ${capitalize(dataType)}`
              : `Select ${dataType === "debt" ? "a" : "an"} ${capitalize(
                  dataType
                )} to Remove`
          }
          disabled={!isSelected}
          icon={<HiOutlineTrash size="18px" />}
          color="red"
          onClick={openDeleteModal}
          className="ml-1"
        />
      )}
    </div>
  );
};

export default ItemOptions;
