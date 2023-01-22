import { FC } from "react";
import BasicButton from "../../input/button/basicButton";
import BrowseButton from "../../input/button/browseButton";
import ToggleButton from "../../input/button/toggleButton";
import { AiOutlinePieChart, AiOutlineUnorderedList } from "react-icons/ai";
import SelectEntry from "../../input/form/selectEntry";
import { useReduxDispatch, useReduxSelector } from "../../../../hooks/useRedux";
import {
  selectDate,
  incrementMonth,
  incrementYear,
  decrementMonth,
  decrementYear,
  setTimeframe,
} from "../../../../redux/dateSlice";
import { getMonth } from "date-fns";
import HeaderButton from "../../input/button/HeaderButton";
import { BiColumns } from "react-icons/bi";
import { TbFileExport } from "react-icons/tb";

export interface HeaderProps {
  setWindow: () => void;
  currentWindow: string;
  openColumnModal: () => void;
  exportData: () => void;
}

const Header: FC<HeaderProps> = ({
  setWindow,
  currentWindow,
  openColumnModal,
  exportData,
}) => {
  const dispatch = useReduxDispatch();
  const { date, dataTimeframe } = useReduxSelector(selectDate);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div
      className={`relative w-full sm:h-14 p-2 flex sm:flex-row flex-col 
      justify-center items-center rounded-t-lg bg-header`}
    >
      <div className="flex items-center sm:order-1 order-3">
        <HeaderButton
          name="graph"
          onClick={setWindow}
          current={currentWindow}
          showArrow={true}
        />
        <HeaderButton
          name="list"
          onClick={setWindow}
          current={currentWindow}
          showArrow={true}
        />

        {currentWindow === "list" && (
          <HeaderButton
            name="columns"
            icon={<BiColumns />}
            onClick={openColumnModal}
            current=""
          />
        )}
        <HeaderButton
          name="export"
          icon={<TbFileExport />}
          onClick={exportData}
          current=""
        />
      </div>

      {dataTimeframe !== "all" && (
        <div className={`mx-auto flex order-2 sm:mb-0 mb-1`}>
          <BrowseButton
            direction="prev"
            onClick={() =>
              dispatch(
                dataTimeframe === "year" ? decrementYear() : decrementMonth()
              )
            }
            title={""}
          />
          <h4 className="self-center text-blue-200 text-md font-semibold font-jose mt-1">
            {dataTimeframe === "year"
              ? date.getFullYear()
              : `${date.getFullYear()} - ${months[getMonth(date)]}`}
          </h4>
          <BrowseButton
            direction="next"
            onClick={() =>
              dispatch(
                dataTimeframe === "year" ? incrementYear() : incrementMonth()
              )
            }
            title={""}
          />
        </div>
      )}

      <div
        className={`flex items-center sm:order-3 order-1 sm:mb-0 ${
          dataTimeframe === "all" ? "mb-2 sm:ml-auto" : "mb-1"
        }`}
      >
        <HeaderButton
          name="year"
          onClick={() => dispatch(setTimeframe("year"))}
          current={dataTimeframe}
        />
        <HeaderButton
          name="month"
          onClick={() => dispatch(setTimeframe("month"))}
          current={dataTimeframe}
        />
        <HeaderButton
          name="all"
          onClick={() => dispatch(setTimeframe("all"))}
          current={dataTimeframe}
        />
      </div>
    </div>
  );
};

export default Header;
