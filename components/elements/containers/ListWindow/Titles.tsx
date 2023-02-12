import { FC } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { TitlesProps } from "./types";
import BgCSS from "../../../../styles/Background.module.css";

const Titles: FC<TitlesProps> = ({
  columns,
  currentSort,
  sortDirection,
  editable,
}) => {
  return (
    <div
      className={`
        flex flex-row items-center px-2 
        ${BgCSS.header} shadow-xl text-blue-100
        border-b border-gray-800 text-left 
      `}
    >
      <div className={`grid grid-cols-${columns.length} w-full `}>
        {columns.map((col, i) => {
          return (
            <button key={i} onClick={col.setSort} className={`flex py-1`}>
              <p className={`font-jose font-bold`}>{col.label}</p>
              {currentSort === col.name &&
                (sortDirection === "asc" ? (
                  <IoMdArrowDropup />
                ) : (
                  <IoMdArrowDropdown />
                ))}
            </button>
          );
        })}
      </div>
      {editable && <div className="w-24 h-full sm:block hidden" />}
    </div>
  );
};

export default Titles;
