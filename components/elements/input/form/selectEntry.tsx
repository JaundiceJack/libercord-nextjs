import React, { FC, useEffect } from "react";
import { Select } from "@mantine/core";
import Spinner from "../../misc/spinner";

type Option = {
  label: string;
  value: string;
};

interface SelectEntryProps {
  label: string;
  labelColor?: string;
  value: string | null;
  name: string;
  loading?: boolean;
  required?: boolean;
  className?: string;
  options?: Option[];
  onChange: (value: string | null) => void;
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
}) => {
  // Extra input styling for Mantine components
  const inputStyles = {
    label: {
      color: labelColor,
      fontSize: 16 + "px",
      marginRight: 8 + "px",
      marginBottom: 0,
      textAlign: "right",
      fontWeight: 600,
    },
    input: { fontSize: 14 + "px" },
    required: { display: "none" },
    root: {
      display: "grid",
      gridTemplateColumns: "2fr 4fr",
      alignItems: "center",
    },
  };

  const testing = true;

  return loading ? (
    <div className="grid grid-cols-3 items-center">
      <p className="text-right text-gray-500 font-bold">{label}</p>
      <Spinner className="mb-2 col-span-2" />
    </div>
  ) : (
    <Select
      label={label}
      name={name}
      value={value}
      load
      radius="md"
      size="xs"
      data={options}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      styles={inputStyles}
      className={className}
      required={required}
      onChange={onChange}
      transition="scale-y"
      transitionDuration={180}
      transitionTimingFunction="ease-in-out"
    />
  );
};

export default SelectEntry;
