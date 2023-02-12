import React, { FC } from "react";
import IOButton from "./IOButton";
// import { ImBlocked } from 'react-icons/im' // Idea is to replace the disabled visual with this icon
import IOButtonHint from "./IOButtonHint";
import { ItemOptionButtonProps } from "./types";

const ItemOptionButton: FC<ItemOptionButtonProps> = ({
  label,
  title,
  icon,
  color,
  onClick,
  className,
  disabled = false,
}) => {
  return (
    <div className={`relative group flex w-full h-full ${className}`}>
      <IOButton
        title={title}
        icon={icon}
        color={color}
        onClick={onClick}
        disabled={disabled}
      />
      {label && <IOButtonHint label={label} />}
    </div>
  );
};

export default ItemOptionButton;
