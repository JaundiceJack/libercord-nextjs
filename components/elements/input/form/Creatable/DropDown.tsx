import {
  CSSProperties,
  FC,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { capitalize } from "../../../../../helpers/strings";
import { SelectOption } from "./types";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { useWindowSize } from "../../../../../hooks/useWindowSize";

interface DropDownProps {
  setMouseInDropDown: (val: boolean) => void;
  showDropDown: boolean;
  value: string;
  setValue: (val: string) => void;
  sortedData: SelectOption[];
  createOption: (query: string) => void;
  isSearchableOnly?: boolean;
}

const DropDown: FC<DropDownProps> = ({
  setMouseInDropDown,
  showDropDown,
  value,
  setValue,
  sortedData,
  createOption,
  isSearchableOnly = false,
}) => {
  return (
    <div
      onMouseEnter={() => setMouseInDropDown(true)}
      onMouseLeave={() => setMouseInDropDown(false)}
      tabIndex={-1}
      style={{
        scrollbarWidth: "thin",
        height: `${
          !showDropDown
            ? "0"
            : sortedData.length > 10
            ? `450px`
            : 45 * sortedData.length + "px"
        }`,
      }}
      className={`absolute left-0 top-10 w-full z-50 
        overflow-y-scroll duration-200 ${
          showDropDown ? "border-b-4 border-blue-base rounded-b-lg" : ""
        }`}
    >
      <AutoSizer>
        {({ height, width }: { height: number; width: number }) => (
          <List
            className={``}
            height={height}
            width={width}
            itemCount={sortedData.length}
            itemSize={45}
          >
            {({ index, style }: { index: number; style: CSSProperties }) => (
              <div
                style={style}
                className={`p-1 cursor-pointer overflow-x-clip overflow-ellipsis hover:bg-gray-600 ${
                  sortedData[index].value === value.trim().toLowerCase()
                    ? "bg-gray-500"
                    : index % 2 === 0
                    ? "bg-gray-700"
                    : "bg-gray-800"
                }`}
              >
                {sortedData[index].label}
              </div>
              // <Row
              //   index={index}
              //   style={style}
              //   item={sortedData[index]}
              //   selected={selected}
              //   columns={columns}
              //   onItemClick={onItemClick}
              //   editable={editable}
              //   editItem={editItem}
              //   deleteItem={deleteItem}
              // />
            )}
          </List>
        )}
      </AutoSizer>
      {/*       
      {sortedData?.map((option, i) => (
        <div
          onClick={() => {
            setValue(capitalize(option.value));
          }}
          className={`p-1 cursor-pointer overflow-x-clip overflow-ellipsis hover:bg-gray-600 ${
            option.value === value.trim().toLowerCase()
              ? "bg-gray-500"
              : i % 2 === 0
              ? "bg-gray-700"
              : "bg-gray-800"
          }`}
          key={i}
        >
          {option.label}
        </div>
      ))}
      {value &&
        !isSearchableOnly &&
        !sortedData.find(
          (option) => option.value === value.trim().toLowerCase()
        ) && (
          <div
            onClick={() => createOption(value)}
            className={`p-1 cursor-pointer overflow-x-clip overflow-ellipsis hover:bg-gray-600 bg-gray-500`}
          >
            Add {value}
          </div>
        )} */}
    </div>
  );
};

export default DropDown;
