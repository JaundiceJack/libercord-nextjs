import React, { FC } from "react";
import { ImBlocked } from "react-icons/im";
import { IOButtonProps } from "./types";
import BtnCSS from "../../../../../styles/Button.module.css";

const IOButton: FC<IOButtonProps> = ({
  title,
  icon,
  color,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex items-center justify-center h-8 w-8 z-10 group 
      outline-none outline-0 ${BtnCSS.itemOptionButton} ${
        disabled
          ? `cursor-default ${BtnCSS["button-gray"]}`
          : `cursor-pointer ${BtnCSS[`button-${color}`]}`
      }`}
      disabled={disabled}
      title={title}
    >
      {disabled && (
        <ImBlocked
          className={`transform duration-300 absolute 
          opacity-0 group-hover:opacity-100`}
          size={15}
        />
      )}
      <div
        className={`flex items-center justify-center 
         transform duration-300 opacity-100 ${
           disabled && "group-hover:opacity-0"
         } group-hover:scale-105`}
      >
        {icon}
      </div>
    </button>
  );
};

export default IOButton;
