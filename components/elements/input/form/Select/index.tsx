import { FC } from "react";
import { Select } from "@mantine/core";
import Spinner from "../../../misc/spinner";
import { mantineStyles } from "../mantineStyles";
import type { SelectProps } from "../types";
import { CSSObject, SelectStylesNames } from "@mantine/core";

/*
  mantine bug:
  the transition flickers when using value instead of searchValue
*/

const SelectEntry: FC<SelectProps> = ({
  label,
  labelColor = "#EEE",
  value,
  name,
  loading = false,
  required = true,
  options = [],
  className,
  onChange,
  createOption,
  inputWidth = "10rem",
  labelWidth = "max-content",
}) => {
  // Extra input styling for Mantine components
  const dropdownStyle: Partial<Record<SelectStylesNames, CSSObject>> = {
    dropdown: {
      transform: "translate(0px, -6px)",
      borderRadius: "8px",
      borderTopLeftRadius: 0,
    },
  };

  const inputStyles = {
    ...mantineStyles({
      labelColor,
      hasLabel: label !== "",
      inputWidth,
      labelWidth,
    }),
    ...dropdownStyle,
  };

  const sortedData = options.sort((a, b) => {
    const first = typeof a === "string" ? a : a.label || "";
    const second = typeof b === "string" ? b : b.label || "";
    return first > second ? 1 : -1;
  });

  return loading ? (
    <div className="grid grid-cols-3 items-center">
      <p className="text-right text-gray-500 font-bold">{label}</p>
      <Spinner className="mb-2 col-span-2" />
    </div>
  ) : (
    <Select
      label={label}
      name={name}
      searchable
      placeholder={`Select or create a ${name}`}
      creatable
      getCreateLabel={(query: string) => `+ Create ${query}`}
      onCreate={createOption}
      radius="md"
      size="xs"
      data={sortedData}
      styles={inputStyles}
      className={className}
      required={required}
      value={value}
      onChange={onChange}
    />
  );
};

export default SelectEntry;
