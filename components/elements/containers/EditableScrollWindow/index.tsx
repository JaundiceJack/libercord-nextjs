import { CSSProperties, FC } from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { FaMinus } from "react-icons/fa";

export interface EditableScrollWindowColumn {
  name: string;
  label: string;
  setSort: () => void;
}

interface EditableScrollWindowProps {
  items: string[];
  column: EditableScrollWindowColumn;
  sortDirection: "asc" | "desc";
  editItem: (value: string) => void;
  deleteItem: (value: string) => void;
}

const EditableScrollWindow: FC<EditableScrollWindowProps> = ({
  items,
  column,
  sortDirection,
  editItem,
  deleteItem,
}) => {
  // Assign row classes for alternating colors and selected item highlighting
  const rowClasses = (index: number) => {
    const everyRow = `flex items-center justify-center py-1 px-2 
    truncate text-gray-800 capitalize select-none 
    font-mont  `;
    const oddRow = everyRow + `bg-neutral-400/20`;
    const evenRow = everyRow + `bg-zinc-300/75`;

    if (index % 2) return evenRow;
    else return oddRow;
  };

  // Create a format for displaying rows
  const Row = ({ index, style }: { index: number; style: CSSProperties }) => {
    const item = items[index];
    // TODO: the buttons will go in the div here
    return (
      <div className={rowClasses(index)} style={style}>
        <p>{item}</p>
        <div className="flex h-9 ml-auto">
          <button
            title="Edit"
            onClick={() => editItem(item)}
            style={{ background: "radial-gradient(at right, #223, #334)" }}
            className={`p-2.5 rounded-l-xl text-white 
            border-l border-b-2 border-slate-900 transform duration-150 
            hover:scale-103 row-button-shadow`}
          >
            <MdEdit color="#fb0" />
          </button>
          <div className="h-full w-0.5 bg-gray-900" />
          <button
            title="Remove"
            onClick={() => deleteItem(item)}
            style={{ background: "radial-gradient(at left, #223, #334)" }}
            className={`p-2.5 rounded-r-xl text-white 
            border-r border-b-2 border-slate-900 transform duration-150 
            hover:scale-103 row-button-shadow`}
          >
            <FaMinus color="#e22" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full h-full overflow-x-scroll sm:overflow-auto">
      {/* Column Labels */}
      <div className={`border-b border-gray-800 bg-header shadow-xl `}>
        <button
          onClick={column.setSort}
          className={`p-2 text-neutral-100 font-semibold flex items-center justify-center w-full`}
        >
          <p className="">{column.label}</p>
          {sortDirection === "asc" ? (
            <IoMdArrowDropup />
          ) : (
            <IoMdArrowDropdown />
          )}
        </button>
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
              itemSize={50}
            >
              {Row}
            </List>
          )}
        </AutoSizer>
      </div>
    </div>
  );
};

export default EditableScrollWindow;
