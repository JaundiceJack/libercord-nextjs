import { FC } from "react";
import { Checkbox } from "@mantine/core";

interface CheckboxEntryProps {
  label?: string;
  defaultChecked: boolean;
  onClick: () => void;
  className?: string;
}

const CheckboxEntry: FC<CheckboxEntryProps> = ({
  label = "",
  defaultChecked,
  onClick,
  className,
}) => {
  return (
    <div className={`my-2 ${className}`}>
      <Checkbox label={label} checked={defaultChecked} onChange={onClick} />
    </div>
  );
};

export default CheckboxEntry;
