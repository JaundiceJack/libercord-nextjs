import React, { FC } from "react";
import { CSSObject, TextInput, TextInputStylesNames } from "@mantine/core";
import { mantineStyles } from "../mantineStyles";
import type { DateEntryProps } from "../types";

const DateEntry: FC<DateEntryProps> = ({
  label = "",
  labelColor = "#EEE",
  value,
  name,
  onChange,
  placeholder,
  required = true,
  className,
  autoFocus = false,
  inputWidth = "8rem",
  labelWidth = "max-content",
}) => {
  // Extra input styling for Mantine components
  const inputStyles = mantineStyles({
    labelColor,
    hasLabel: label !== "",
    inputWidth,
    labelWidth,
  });

  return (
    <TextInput
      label={label}
      name={name}
      value={value}
      type="date"
      placeholder={placeholder}
      radius="md"
      size="xs"
      styles={inputStyles}
      onChange={onChange}
      className={className}
      required={required}
      autoFocus={autoFocus}
    />
  );
};

export default DateEntry;
