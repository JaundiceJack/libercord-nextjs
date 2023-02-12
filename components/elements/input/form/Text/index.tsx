import React, { FC } from "react";
import { CSSObject, TextInput, TextInputStylesNames } from "@mantine/core";
import { mantineStyles } from "../mantineStyles";
import type { TextEntryProps } from "../types";

const TextEntry: FC<TextEntryProps> = ({
  label = "",
  labelColor = "#EEE",
  value,
  name,
  onChange,
  placeholder,
  type = "text",
  required = true,
  className,
  autoFocus = false,
  inputWidth = "10rem",
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
      type={type}
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

export default TextEntry;
