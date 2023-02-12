import { FC } from "react";
import { HeaderProps } from "../types";
import ItemOptions from "./ItemOptions";
import WindowOptions from "./WindowOptions";
import TimeframeOptions from "./TimeframeOptions";
import DateOptions from "./DateOptions";
import WindowActions from "./WindowActions";
import BgCSS from "../../../../../styles/Background.module.css";

const Header: FC<HeaderProps> = ({
  dataType,
  isSelected,
  openAddModal,
  openEditModal,
  openDeleteModal,
  setWindow,
  currentWindow,
  openColumnModal,
  exportData,
}) => {
  return (
    <div
      className={`relative w-full px-2 py-1.5 flex md:flex-row flex-col 
      justify-between items-center rounded-t-lg ${BgCSS.header}`}
    >
      <div className="flex items-center md:order-1 order-3">
        <WindowOptions setWindow={setWindow} currentWindow={currentWindow} />
        <ItemOptions
          isSelected={isSelected}
          currentWindow={currentWindow}
          dataType={dataType}
          openAddModal={openAddModal}
          openEditModal={openEditModal}
          openDeleteModal={openDeleteModal}
        />
        <WindowActions
          currentWindow={currentWindow}
          openColumnModal={openColumnModal}
          exportData={exportData}
        />
      </div>
      <DateOptions />
      <TimeframeOptions />
    </div>
  );
};

export default Header;
