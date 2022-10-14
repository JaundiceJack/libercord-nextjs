import { TextInput } from "@mantine/core";
import React, { FC } from "react";

interface TextEntryProps {
  label: string;
  labelColor?: string;
  value: string;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  className?: string;
}

const TextEntry: FC<TextEntryProps> = ({
  label,
  labelColor = "#EEE",
  value,
  name,
  onChange,
  type = "text",
  required = true,
  className,
}) => {
  // Extra input styling for Mantine components
  const inputStyles = {
    label: {
      color: labelColor,
      fontSize: 16 + "px",
      marginRight: 8 + "px",
      marginBottom: 0,
      lineHeight: 1.0,
      textAlign: "right",
      fontWeight: 600,
      fontFamily: "Josefin Sans",
    },
    required: { display: "none" },
    root: {
      display: "grid",
      gridTemplateColumns: "2fr 4fr",
      alignItems: "center",
    },
  };

  return (
    <TextInput
      label={label}
      name={name}
      value={value}
      type={type}
      radius="md"
      size="xs"
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      styles={inputStyles}
      onChange={onChange}
      className={className}
      required={required}
    />
  );
};

export default TextEntry;
