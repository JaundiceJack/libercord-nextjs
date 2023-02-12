import { CSSProperties, FC } from "react";
import { Types } from "mongoose";
import { useReduxDispatch } from "../../../../hooks/useRedux";
import { IncomeType } from "../../../../models/Income";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { FaMinus } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { formatDateMMDD } from "../../../../helpers/dates";
import { RowProps } from "./types";
import LiCSS from "../../../../styles/List.module.css";

const Row: FC<RowProps> = ({
  index,
  style,
  selected,
  item,
  columns,
  onItemClick,
  editable,
  editItem,
  deleteItem,
}) => {
  const dispatch = useReduxDispatch();

  // Assign row classes for alternating colors and selected item highlighting
  const rowClasses = (index: number, id: Types.ObjectId | undefined) => {
    const everyRow = `flex sm:flex-row items-center py-1 px-2 ${
      editable && "flex-col"
    } truncate cursor-pointer text-gray-800 capitalize select-none font-jose`;

    const oddRow = everyRow + `bg-neutral-400/20 hover:bg-slate-400/50`;
    const evenRow = everyRow + `bg-zinc-300/75 hover:bg-slate-400/50`;
    const selectedRow = everyRow + `border-l-4 border-yellow-400 bg-yellow-200`;

    if (selected && selected === id) return selectedRow;
    else {
      if (index % 2) return evenRow;
      else return oddRow;
    }
  };

  const specificCol = item.hasOwnProperty("source")
    ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      item.source
    : // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      item.location;

  return (
    <div
      onClick={() => item._id && dispatch(onItemClick(item._id))}
      title={item && item.name}
      className={rowClasses(index, item._id)}
      style={style}
    >
      <div
        className={`grid grid-cols-${columns.length} items-center gap-x-2 w-full`}
      >
        {columns.map((col, i) => {
          return (
            <p key={i} className={`overflow-hidden`}>
              {col.name === "date"
                ? formatDateMMDD(item.date)
                : col.name === "source" || col.name === "location"
                ? specificCol
                : col.name === "amount"
                ? "$" + item.amount.toFixed(2)
                : col.name === "category"
                ? item.category
                : ""}
            </p>
          );
        })}
      </div>

      {editable && (
        <div
          className={`grid sm:grid-cols-1 grid-cols-${columns.length} 
          items-center h-full w-full sm:w-24`}
        >
          <div
            className={`flex flex-row h-full max-h-9 col-start-${columns.length} sm:col-start-auto`}
          >
            <button
              title="Edit"
              onClick={() => editItem && editItem(item)}
              style={{ background: "radial-gradient(at right, #223, #334)" }}
              className={`p-2.5 rounded-l-xl text-white 
                    border-l border-b-2 border-slate-900 transform duration-150 
                    hover:scale-103 ${LiCSS.row}`}
            >
              <MdEdit color="#fb0" />
            </button>
            <div className="h-full w-0.5 bg-gray-900" />
            <button
              title="Remove"
              onClick={() => deleteItem && deleteItem(item)}
              style={{ background: "radial-gradient(at left, #223, #334)" }}
              className={`p-2.5 rounded-r-xl text-white 
                    border-r border-b-2 border-slate-900 transform duration-150 
                    hover:scale-103 ${LiCSS.row}`}
            >
              <FaMinus color="#e22" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Row;
