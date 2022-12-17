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

// i'm gonna make this one more specific to the income/expense/asset/debt pages
// and use a different one for summaries
// i want to get rid of the title in the middle
// to make more room for buttons/interaction
// i think using the nav button style for all buttons looks a bit goofy
// could i design a similar but more subtle button for page interactions?
// oh, for the toggle button could i make it like a coin that flips when hovered?
// then when clicked it keeps on that side instead of flipping back

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

  // i want to be able to turn columns on/off,
  // i'd like to open a modal when columns is clicked
  // in the modal i'll have checkboxes for each income key
  // the cbs will toggle columns fed to the scrollwindow

  return (
    <div
      className={`relative w-full sm:h-14 p-2 flex sm:flex-row flex-col 
      justify-center items-center rounded-t-lg bg-header`}
    >
      <div className="flex items-center sm:order-1 order-3">
        <HeaderButton
          name="list"
          onClick={setWindow}
          current={currentWindow}
          showArrow={true}
        />
        <HeaderButton
          name="graph"
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
          <h4 className="self-center text-blue-200 text-md font-semibold mt-1">
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
