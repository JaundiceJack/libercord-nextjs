import { FC } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";
import { useWindowSize } from "../../../../hooks/useWindowSize";
import Row from "./Row";
import Titles from "./Titles";
import { AutoSizerProps, ListWindowProps, PresentRowProps } from "./types";

const ListWindow: FC<ListWindowProps> = ({
  items,
  currentSort,
  sortDirection,
  selected,
  onItemClick,
  columns,
  editable,
  editItem,
  deleteItem,
}) => {
  const { width: screenWidth } = useWindowSize();
  return (
    <div className="flex flex-col w-full h-full">
      <Titles
        columns={columns}
        currentSort={currentSort}
        sortDirection={sortDirection}
        editable={editable}
      />
      <div className="h-full">
        <AutoSizer>
          {({ height, width }: AutoSizerProps) => (
            <List
              className={`
                h-full
                rounded-b-md 
                shadow-xl  
                bg-gray-100 
                border-r 
                border-l 
                border-gray-700 
              `}
              height={height}
              width={width}
              itemCount={items.length}
              itemSize={
                !editable || (screenWidth && screenWidth > 640) ? 45 : 75
              }
            >
              {({ index, style }: PresentRowProps) => (
                <Row
                  index={index}
                  style={style}
                  item={items[index]}
                  selected={selected}
                  columns={columns}
                  onItemClick={onItemClick}
                  editable={editable}
                  editItem={editItem}
                  deleteItem={deleteItem}
                />
              )}
            </List>
          )}
        </AutoSizer>
      </div>
    </div>
  );
};

export default ListWindow;
