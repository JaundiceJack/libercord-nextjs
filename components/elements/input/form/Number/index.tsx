import React, { FC } from "react";
import { CSSObject, TextInput, TextInputStylesNames } from "@mantine/core";
import { mantineStyles } from "../mantineStyles";
import type { NumberEntryProps } from "../types";

const NumberEntry: FC<NumberEntryProps> = ({
  label = "",
  labelColor = "#EEE",
  value,
  name,
  onChange,
  placeholder,
  required = true,
  className,
  autoFocus = false,
  inputWidth = "5rem",
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

export default NumberEntry;
