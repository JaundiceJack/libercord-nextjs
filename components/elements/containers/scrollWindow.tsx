import { CSSProperties, FC, useEffect, useState } from "react";
// Import list/table library components
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
// Import functions
import { formatDateMMDD } from "../../../helpers/dates";
import { useReduxDispatch } from "../../../hooks/useRedux";
import { Types } from "mongoose";
import { IncomeType } from "../../../models/Income";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";

export interface ScrollWindowColumn {
  name: string;
  label: string;
  gridColSpan: "col-span-2" | "col-span-4" | "col-span-6";
  setSort: () => void;
}

interface ScrollWindowProps {
  items: IncomeType[];
  selectedId: Types.ObjectId | null;
  onItemClick: ActionCreatorWithPayload<Types.ObjectId, string>;
  columns: ScrollWindowColumn[];
  currentSort: string;
  sortDirection: "asc" | "desc";
}

const ScrollWindow: FC<ScrollWindowProps> = ({
  items,
  selectedId,
  onItemClick,
  columns,
  currentSort,
  sortDirection,
}) => {
  // Assign row classes for alternating colors and selected item highlighting
  const rowClasses = (index: number, id: Types.ObjectId | undefined) => {
    const everyRow = `grid grid-cols-12 items-center justify-center gap-x-6 py-1 px-2 
    truncate cursor-pointer text-gray-800 capitalize select-none 
    font-mont transform duration-150 scale-99.5 hover:scale-100 `;
    const oddRow = everyRow + `bg-neutral-400/20 hover:bg-slate-400/50`;
    const evenRow = everyRow + `bg-zinc-300/75 hover:bg-slate-400/50`;
    const selectedRow = everyRow + `border-l-4 border-yellow-400 bg-yellow-200`;

    if (selectedId && selectedId === id) return selectedRow;
    else {
      if (index % 2) return evenRow;
      else return oddRow;
    }
  };

  // Create a format for displaying rows
  const dispatch = useReduxDispatch();
  const Row = ({ index, style }: { index: number; style: CSSProperties }) => {
    const item = items[index];
    return (
      <div
        onClick={() => item._id && dispatch(onItemClick(item._id))}
        title={item && item.name}
        className={rowClasses(index, item._id)}
        style={style}
      >
        {columns.map((col, i) => {
          return (
            <p className={col.gridColSpan}>
              {col.name === "date"
                ? formatDateMMDD(item.date)
                : col.name === "source"
                ? item.source
                : col.name === "amount"
                ? "$" + item.amount.toFixed(2)
                : ""}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full h-full">
      {/* Column Labels */}
      <div
        className={`grid grid-cols-12 border-b border-gray-800 bg-header shadow-xl `}
      >
        {columns.map((col, i) => {
          return (
            <button
              onClick={col.setSort}
              className={`${col.gridColSpan} text-left pt-1 pl-1.5 text-blue-100 font-semibold flex`}
            >
              <p>{col.label}</p>
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
      {/* Data Table */}
      <div className="h-full">
        <AutoSizer>
          {({ height, width }: { height: number; width: number }) => (
            <List
              className={`rounded-b-md shadow-xl h-full bg-gray-100 
              border-r border-l border-gray-700 `}
              height={height}
              width={width}
              itemCount={items.length}
              itemSize={35}
            >
              {Row}
            </List>
          )}
        </AutoSizer>
      </div>
    </div>
  );
};

export default ScrollWindow;
