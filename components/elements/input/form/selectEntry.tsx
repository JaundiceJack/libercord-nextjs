import { ChangeEvent, FC, ReactNode } from "react";
import { CSSObject, Select, SelectItem } from "@mantine/core";
import Spinner from "../../misc/spinner";
import { BaseSelectStylesNames } from "@mantine/core/lib/Select/types";
//import { capitalize } from "../../../../helpers/strings";

interface SelectEntryProps {
  label: string;
  labelColor?: string;
  value: string;
  name: string;
  loading?: boolean;
  required?: boolean;
  className?: string;
  options?: (string | SelectItem)[];
  onChange: (value: string) => void;
  createOption: (query: string) => string | SelectItem | null | undefined;
}

const SelectEntry: FC<SelectEntryProps> = ({
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
}) => {
  // Extra input styling for Mantine components
  const inputStyles: Partial<Record<BaseSelectStylesNames, CSSObject>> = {
    label: {
      color: labelColor,
      fontSize: "18px",
      fontFamily: "Josefin Sans",
      marginRight: "8px",
      textAlign: "right",
      fontWeight: 600,
    },
    input: { fontSize: 14 + "px" },
    required: { display: "none" },
    root: {
      display: "grid",
      gridTemplateColumns: "2fr 4fr",
      alignItems: "end",
    },
  };

  /*
  i observed the same transition flicker in mantine's own display page
  so i think the solution here is to just disable it and use value instead
  of searchvalue, makes it less pretty but it's what works
  and i can finally move past it
  */

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
      data={options}
      styles={inputStyles}
      className={className}
      required={required}
      value={value}
      onChange={onChange}
    />
  );
};

export default SelectEntry;
