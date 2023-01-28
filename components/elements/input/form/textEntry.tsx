import React, { FC } from "react";
import { CSSObject, TextInput, TextInputStylesNames } from "@mantine/core";

interface TextEntryProps {
  label?: string;
  labelColor?: string;
  value: string;
  name: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  className?: string;
  noLabel?: boolean;
  autoFocus?: boolean;
}

const TextEntry: FC<TextEntryProps> = ({
  label = "",
  labelColor = "#EEE",
  value,
  name,
  onChange,
  placeholder,
  type = "text",
  required = true,
  className = "mb-2",
  noLabel = false,
  autoFocus = false,
}) => {
  // Extra input styling for Mantine components
  const inputStyles: Partial<Record<TextInputStylesNames, CSSObject>> = {
    label: {
      color: labelColor,
      fontSize: "18px",
      fontFamily: "Josefin Sans",
      marginRight: "8px",
      textAlign: "right",
      fontWeight: 600,
    },
    input: { fontSize: "14px" },
    required: { display: "none" },
    root: {
      display: "grid",
      gridTemplateColumns: noLabel ? "1fr" : "2fr 4fr",
      alignItems: "end",
    },
  };

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
