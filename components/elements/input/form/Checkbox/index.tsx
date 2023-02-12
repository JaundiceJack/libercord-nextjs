import { FC } from "react";
import { Checkbox, CSSObject, CheckboxStylesNames } from "@mantine/core";
import type { CheckboxProps } from "../types";

const CheckboxEntry: FC<CheckboxProps> = ({
  label = "",
  labelColor = "black",
  value,
  defaultChecked,
  onClick,
  className,
}) => {
  const cbstyles: Partial<Record<CheckboxStylesNames, CSSObject>> = {
    label: {
      fontFamily: "Josefin sans",
      color: labelColor,
      fontWeight: 600,
      fontSize: 16,
    },
  };

  return (
    <div className={`my-2 font-jose ${className}`}>
      <Checkbox
        value={value}
        styles={cbstyles}
        label={label}
        checked={defaultChecked}
        onChange={onClick}
      />
    </div>
  );
};

export default CheckboxEntry;
