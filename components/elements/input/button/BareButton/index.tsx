import React, { FC } from "react";
import { ImBlocked } from "react-icons/im";
import { BareButtonProps } from "./types";
import BtnCSS from "../../../../../styles/Button.module.css";

const BareButton: FC<BareButtonProps> = ({
  label,
  title,
  icon,
  color,
  type = "button",
  onClick,
  className,
  disabled = false,
  active = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`relative flex items-center justify-center
        h-10 w-full font-semibold focus:outline-none 
        ${BtnCSS.bareButton} 
        ${disabled
          ? `cursor-not-allowed ${BtnCSS["button-gray"]}`
          : `cursor-pointer ${BtnCSS[`button-${color}`]}`
        } 
        ${className}`}
      disabled={disabled}
      title={title}
    >
      {disabled ? <ImBlocked size={15} /> : icon ? icon : label}
    </button>
  );
};

export default BareButton;
